"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import parser from "cron-parser"

type Inputs = {
    id: string, 
    cron: string
}
export const updateWorkflowCron = async (inputs: Inputs) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    try {
        const interval = parser.parse(inputs.cron)
        return await db.workflow.update({
            where: {id: inputs.id, userId},
            data: {
                cron: inputs.cron,
                nextRunAt: interval.next().toDate()
            }
        })
        
    } catch (error) {
        console.log("🟢invalid cron:", error)
        throw new Error("invalid cron expression")
    }
}