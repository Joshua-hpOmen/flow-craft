"use server"
import { db } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export const unpublishWorkFlow = async  (id: string) => {
    const {userId} = await auth() ;
    if(!userId) throw new Error("unauthorised")

    const worklfow = await db.workflow.findUnique({
        where: {id, userId}
    })

    if(!worklfow) throw new Error("workflow not found");
    if(worklfow.status !== WorkflowStatus.PUBLISHED) throw new Error("workflow is not published")

    await db.workflow.update({
        where: {id, userId},
        data: {
            status: WorkflowStatus.DRAFT,
            executionPlan: null,
            creditsCost: 0
        }
    })

    revalidatePath(`/workflow/editor/${id}`)
}