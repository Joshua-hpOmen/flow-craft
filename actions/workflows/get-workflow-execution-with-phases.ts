"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export const getWorkfloExecutionWithPhases = async (executionId: string) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised") ;

    return db.workflowExecution.findUnique({
        where: {id: executionId, userId},
        include: {
            executionPhases: {
                orderBy: { number: "asc" }
            }
        }
    })
}