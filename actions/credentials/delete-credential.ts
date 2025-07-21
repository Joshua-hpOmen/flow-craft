"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export const deleteCredential = async (name: string) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    await db.credential.delete({ where: {
        userId_name: {
            userId, name
        }
    }})

    revalidatePath("/credentials")

}