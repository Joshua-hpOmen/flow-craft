"use server"

import { db } from "@/lib/prisma";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { createWorkflowSchema } from "@/schema/workflows";
import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";
import z from "zod";

export const createWorkFlow = async ( form: z.infer<typeof createWorkflowSchema> ) => {
    const {success, data} = createWorkflowSchema.safeParse(form);

    if(!success) throw new Error("invalid form data");
    const {userId} = await auth()

    const initialFlow : {nodes: AppNode[]; edges: Edge[]} = {
        nodes: [createFlowNode(TaskType.LAUNCH_BROWSER)],
        edges: []
    }


    if(!userId) throw new Error("unauthorised")

    const result =  await db.workflow.create({
        data: { userId, definition: JSON.stringify(initialFlow), ...data, status: WorkflowStatus.DRAFT }
    })

    if(!result) throw new Error("failed to create workflow");
    redirect(`/workflow/editor/${result.id}`)
}