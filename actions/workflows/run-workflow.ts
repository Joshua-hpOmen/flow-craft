"use server"

import { db } from "@/lib/prisma"
import { flowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { ExecutionPhaseStatus, WokrflowExecutionTrigger, WorkflowExecutionPlan, WorkflowExecutionStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"

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

    if(!form.flowDefinition) throw new Error("flow definition is not defined");

    const flow = JSON.parse(form.flowDefinition);
    const result = flowToExecutionPlan(flow.nodes, flow.edges);
    if(result.error) throw new Error("flow definition is not valid");
    if(!result.executionPlan) throw new Error("no execution plan generated");

    const executionPlan: WorkflowExecutionPlan  = result.executionPlan

    const execution = await db.workflowExecution.create({
        data: {
            workflowId: form.workflowId,
            userId,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WokrflowExecutionTrigger.MANUAL,
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
    
}