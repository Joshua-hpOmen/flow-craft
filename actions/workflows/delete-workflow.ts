"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const deleteWorkflow = async (id: string) => {
    const { userId } = await auth()

    if(!userId) throw new Error("unauthorised")

    await db.workflow.delete({ where: { id, userId }})

    revalidatePath("/workflows")
}