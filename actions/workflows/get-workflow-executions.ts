"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export const getWorkflowExecutions = async (workflowId: string) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    return db.workflowExecution.findMany({
        where: {
            workflowId,
            userId
        },
        orderBy: {createdAt: "desc"}
    })
}