"use server"

import { db } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server"

export const updateWorkflow = async ({id ,definition } : {id: string, definition: string}) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised")

    const response = await db.workflow.findUnique({ where: {id} })
    if(!response) throw new Error("workflow not found")
    if(response.status !== WorkflowStatus.DRAFT) throw new Error("workflow is not in draft")

    await db.workflow.update({
        where: {id},
        data: {definition}
    })

}