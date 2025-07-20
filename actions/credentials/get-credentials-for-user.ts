"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export const  getCredentialsForUser = async () => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised")

    const response  = await db.credential.findMany({where: {userId}, orderBy: {name: "asc"}})
    return response
}