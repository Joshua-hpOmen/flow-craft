"use server"
import { db } from "@/lib/prisma";
import { duplicateWorkflowSchema } from "@/schema/workflows"
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import {z} from "zod"

export const duplicateWorkflow = async (values: z.infer<typeof duplicateWorkflowSchema>) => {
    const {success, data} = duplicateWorkflowSchema.safeParse(values);
    if(!success) throw new Error('invalid form data')

    const {userId} = await  auth();
    if(!userId) throw new Error("unauthorised");

    const sourceWorkflow = await db.workflow.findUnique({
        where: {
            id: data!.workflowId,
            userId
        }
    })

    if(!sourceWorkflow)throw new Error("workflow not found")

    const result = await db.workflow.create({
        data: {
            userId, 
            name: data!.name,
            description: data!.description,
            status: WorkflowStatus.DRAFT,
            definition: sourceWorkflow.definition
        }
    })

    if(!result) throw new Error("Failed to duplicate workflow")

    revalidatePath("/workflows")

}