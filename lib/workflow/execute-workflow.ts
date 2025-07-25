import { AppNode } from "@/types/app-node";
import { Environment, ExcecutionEnvironment } from "@/types/executor";
import { LogCollector } from "@/types/log";
import { TaskParamType } from "@/types/task";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { Browser, Page } from "puppeteer";
import "server-only";
import { ExecutionPhase, Workflow } from "../generated/prisma";
import { createLogCollector } from "../log";
import { db } from "../prisma";
import { ExecuterRegistry } from "./executor/registry";
import { TaskRegistry } from "./task/registry";
import { waitFor } from "../helper/wait-for";

const initializeWorkflowExecution = async (executionId:string, workflowId : string, nextRunAt?: Date ) => {
    await db.workflowExecution.update({
        where: {id: executionId},
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING
        }
    })

    await db.workflow.update({
        where: {id: workflowId},
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId,
            ...(nextRunAt && {nextRunAt})
        }
    })
}

const initializePhaseStatuses = async (execution: { workflow: Workflow, executionPhases: ExecutionPhase[] }) => {

    await db.executionPhase.updateMany({
        where: {
            id: {
                in: execution.executionPhases.map(phase => phase.id)
            }
        },
        data: {
            status: ExecutionPhaseStatus.PENDING
        }
    })
}

const finalizeWorkflowExecution = async  (executionId: string, workflowId: string, 
    executionfailed: boolean, creditsConsumed: number) => {

    const finalStatus = executionfailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED

    await db.workflowExecution.update({
        where: { id: executionId },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed,
        }
    })

    await db.workflow.update({
        where:{ id: workflowId, lastRunId: executionId },
        data: {
            lastRunStatus: finalStatus
        }
    }).catch(() => {
        //
    })

    await waitFor(3000)

}


const finalizePhase = async (phaseID: string, success: boolean, outputs: Record<string, string>,
    logCollector: LogCollector, creditsConsumed: number) => {

    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;

    await db.executionPhase.update({
        where: {id: phaseID},
        data: {
            completedAt: new Date(),
            status: finalStatus,
            outputs: JSON.stringify(outputs),
            creditsConsumed,
            executionLog: {
                createMany: {
                    data: logCollector.getAll().map(log => ({message: log.message, logLevel: log.level, timestamp: log.timestamp}))
                }
            }
        }
    })

    
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createExecutionEnvironment = (node: AppNode, env: Environment, logCollector: LogCollector) : ExcecutionEnvironment<any> => {
    return {
        getInput: (name: string) => env.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => {
            env.phases[node.id].outputs[name] = value 
        },

        getBrowser: () => env.broswer,
        setBrowser: (browser: Browser) => (env.broswer = browser),
        getPage: () => env.page,
        setPage: (page: Page) => env.page = page,

        log: logCollector
    }
}

const executePhase = async (phase: ExecutionPhase, node: AppNode, env: Environment, logCollector: LogCollector): Promise<boolean> => {
    const runFn = ExecuterRegistry[node.data.type]
    if(!runFn){
        logCollector.error("executor not found for: "+ node.data.type)
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const execEnv: ExcecutionEnvironment<any> = createExecutionEnvironment(node, env, logCollector)

    return await runFn(execEnv)
}

const setupEnvironmentForPhase = (node: AppNode, env: Environment, edges: Edge[]) => {
    env.phases[node.id] = { inputs: {}, outputs: {}};
    const inputsDefinition = TaskRegistry[node.data.type].inputs 

    const edgesForNode = edges.filter( edge => edge.target === node.id )

    for(const input of inputsDefinition){
        if(input.type === TaskParamType.BROWSER_INSTANCE) continue;

        const inputValue = node.data.inputs[input.name]
        if(inputValue){
            env.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        const connectedEdges = edgesForNode.find(edge => edge.targetHandle === input.name)
        if(!connectedEdges){
            console.error("Missing edge for input", input.name, "node id:", node.id);
            continue;
        }

        const outputVal = env.phases[connectedEdges.source].outputs[connectedEdges.sourceHandle!]

        env.phases[node.id].inputs[input.name] = outputVal
    }

}

const decrementCredits = async (userId: string, amount: number, logCollector: LogCollector) => {
    try {
        await db.userBalance.update({
            where: {userId, credits: { gte : amount}},
            data: {credits: { decrement: amount }}

        });
        return true
    } catch (error) {
        console.error(error)
        logCollector.error("Insufficient balance")
        return false
    }
}

const executeWorkflowPhase = async (phase: ExecutionPhase, env: Environment, edges: Edge[]) => {
    const logCollector = createLogCollector()
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;
    setupEnvironmentForPhase(node, env, edges)
    await db.executionPhase.update({
        where: {id: phase.id},
        data: {
            startedAt,
            status: ExecutionPhaseStatus.RUNNING,
            inputs: JSON.stringify(env.phases[node.id].inputs)
        }
    })

    const creditsRequired = TaskRegistry[node.data.type].credits;
    let success = await decrementCredits(phase.userId, creditsRequired, logCollector); 
    const creditsConsumed = success ? creditsRequired : 0; 
    if(success){
        success = await executePhase(phase, node, env, logCollector)
    }
    const outputs = env.phases[node.id].outputs

    await finalizePhase(phase.id, success, outputs, logCollector, creditsConsumed);
    return { success, creditsConsumed }
}

const cleanUpEnv = async (env: Environment) => {
    if(env.broswer){
        await env.broswer.close().catch(err => console.error("cannot close browser, reason:", err))
    }
}

export const ExecuteWorkflow = async (executionId: string, nextRunAt?: Date) => {
    const execution = await db.workflowExecution.findUnique({ where: {id: executionId }, include: {workflow: true, executionPhases: true} })
    if(!execution) throw new Error("Execution not found");

    const env: Environment = {phases: {}};
    const edges = JSON.parse(execution.definition).edges as Edge[]

    await initializeWorkflowExecution(executionId, execution.workflowId, nextRunAt)
    await initializePhaseStatuses(execution)

    
    let creditsConsumed = 0;
    let executionFailed= false;
    for (const phase of execution.executionPhases){
        const phaseExecution = await executeWorkflowPhase(phase, env, edges)

        creditsConsumed+= phaseExecution.creditsConsumed
        if(!phaseExecution.success){
            executionFailed = true;
            break;
        }
    }

    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed)
    await cleanUpEnv(env)
 
}