import { AppNode } from "@/types/app-node";
import { Environment, ExcecutionEnvironment } from "@/types/executor";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow";
import { revalidatePath } from "next/cache";
import "server-only";
import { ExecutionPhase, Workflow } from "../generated/prisma";
import { db } from "../prisma";
import { ExecuterRegistry } from "./executor/registry";
import { TaskRegistry } from "./task/registry";
import { TaskParamType } from "@/types/task";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";

const initializeWorkflowExecution = async (executionId:string, workflowId : string ) => {
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
            lastRunId: executionId
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

const finalizeWorkflowExecution = async  (executionId: string, workflowId: string, executionfailed: boolean, creditsConsumed: number) => {

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

}


const finalizePhase = async (phaseID: string, success: boolean, outputs: Record<string, string>) => {

    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;

    await db.executionPhase.update({
        where: {id: phaseID},
        data: {
            completedAt: new Date(),
            status: finalStatus,
            outputs: JSON.stringify(outputs)
        }
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createExecutionEnvironment = (node: AppNode, env: Environment) : ExcecutionEnvironment<any> => {
    return {
        getInput: (name: string) => env.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => {
            env.phases[node.id].outputs[name] = value 
        },

        getBrowser: () => env.broswer,
        setBrowser: (browser: Browser) => (env.broswer = browser),
        getPage: () => env.page,
        setPage: (page: Page) => env.page = page
    }
}

const executePhase = async (phase: ExecutionPhase, node: AppNode, env: Environment): Promise<boolean> => {
    const runFn = ExecuterRegistry[node.data.type]
    if(!runFn) return false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const execEnv: ExcecutionEnvironment<any> = createExecutionEnvironment(node, env)

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

const executeWorkflowPhase = async (phase: ExecutionPhase, env: Environment, edges: Edge[]) => {
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

    const creditsRequired = TaskRegistry[node.data.type].credits
    console.log(`Executing phase ${phase.name} with ${creditsRequired} credits required`)

    const success = await executePhase(phase, node, env)
    const outputs = env.phases[node.id].outputs

    await finalizePhase(phase.id, success, outputs);
    return { success }
}

const cleanUpEnv = async (env: Environment) => {
    if(env.broswer){
        await env.broswer.close().catch(err => console.error("cannot close browser, reason:", err))
    }
}

export const ExecuteWorkflow = async (executionId: string) => {
    const execution = await db.workflowExecution.findUnique({ where: {id: executionId }, include: {workflow: true, executionPhases: true} })
    if(!execution) throw new Error("Execution not found");

    const env: Environment = {phases: {}};
    const edges = JSON.parse(execution.workflow.definition).edges as Edge[]

    await initializeWorkflowExecution(executionId, execution.workflowId)
    await initializePhaseStatuses(execution)

    const creditsConsumed = 0;
    let executionFailed= false;
    for (const phase of execution.executionPhases){
        const phaseExecution = await executeWorkflowPhase(phase, env, edges)

        if(!phaseExecution.success){
            executionFailed = true;
            break;
        }
    }

    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed)


    await cleanUpEnv(env)

    revalidatePath("/workflow/runs")
}