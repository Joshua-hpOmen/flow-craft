"use server"

import { db } from "@/lib/prisma"
import { flowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { calculateWorkflowCost } from "@/lib/workflow/helpers"
import { WorkflowStatus } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

type Inputs = {
    id: string,
    flowDefinition: string
}

export const publishWorkFlow = async (inputs : Inputs) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    const workflow = await db.workflow.findUnique({where: {
        id: inputs.id,
        userId
    }})

    if(!workflow) throw new Error("workflow not found");
    if(workflow.status !== WorkflowStatus.DRAFT) throw new Error("workflow is not a draft");

    const flow = JSON.parse(inputs.flowDefinition);
    const result = flowToExecutionPlan(flow.nodes, flow.edges);

    console.log("🟢THis is the flow",flow)

    if(result.error){ console.log("This is the invalid nodes", result.error );throw new Error("flow def not valid");}
    if(!result.executionPlan) throw new Error("no execution plan generated");

    const creditsCost = calculateWorkflowCost(flow.nodes);
    await db.workflow.update({
        where: {
            id: inputs.id,
            userId
        },
        data: {
            definition: inputs.flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            creditsCost,
            status: WorkflowStatus.PUBLISHED
        }
    })

    revalidatePath(`/workflow/editor/${inputs.id}`)
}