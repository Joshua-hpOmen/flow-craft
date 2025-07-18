"use server"

import { db } from "@/lib/prisma"
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow"
import { flowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { ExecutionPhaseStatus, WokrflowExecutionTrigger, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

type Form = {
    workflowId: string,
    flowDefinition?: string
}

export const runWorkflow = async (form: Form) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");
    if(!form.workflowId) throw new Error("workflowId is required");

    const workflow = await db.workflow.findUnique({where : {id: form.workflowId, userId}});
    if(!workflow) throw new Error("workflow was not found");
    let executionPlan : WorkflowExecutionPlan;
    let workflowDefinition = form.flowDefinition

    if(workflow.status === WorkflowStatus.PUBLISHED){
        if(!workflow.executionPlan) throw new Error("workflow execution-plan is not defined");
        executionPlan = JSON.parse(workflow.executionPlan)
        workflowDefinition = workflow.definition
    }else{

        if(!form.flowDefinition) throw new Error("flow definition is not defined");
    
        const flow = JSON.parse(form.flowDefinition);
        const result = flowToExecutionPlan(flow.nodes, flow.edges);
        if(result.error) throw new Error("flow definition is not valid");
        if(!result.executionPlan) throw new Error("no execution plan generated");

        executionPlan = result.executionPlan
    }    

    const execution = await db.workflowExecution.create({
        data: {
            workflowId: form.workflowId,
            userId,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WokrflowExecutionTrigger.MANUAL,
            definition: workflowDefinition,
            executionPhases: {
                create: executionPlan.flatMap(phase => { return (
                    phase.nodes.flatMap(node => {
                        return {
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label
                        }
                    })
                )})
            }
        },

        select: {
            id: true,
            executionPhases: true
        }
    })

    if(!execution) throw new Error("Workflow not created")
    ExecuteWorkflow(execution.id)
    redirect(`/workflow/runs/${form.workflowId}/${execution.id}`)
}