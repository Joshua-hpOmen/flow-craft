"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export const getWorkflowsForUser = async () => {

    const { userId } = await auth()

    if(!userId) throw new Error("unauthenticated")

    return db.workflow.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" }
    })
}