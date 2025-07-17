"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowPhaseDetails = async (phaseId: string) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    return db.executionPhase.findUnique({ where: { id: phaseId, execution: { userId } } })
}