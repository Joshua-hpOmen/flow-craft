"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export const getAvailableCredits = async () => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    const balance = await db.userBalance.findUnique({ where: { userId }})
    if(!balance) return undefined
    return balance.credits
}