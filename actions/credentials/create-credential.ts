"use server"
import { symmetricEncrypt } from "@/lib/helper/encryption"
import { db } from "@/lib/prisma"
import { createCredentialSchema } from "@/schema/credentials"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import {z} from "zod"

export const createCredential = async (values : z.infer<typeof createCredentialSchema>) => {
    const {success, data} = createCredentialSchema.safeParse(values)
    if(!success) throw new Error("invalid form")

    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    const encryptedVal = symmetricEncrypt(values.value);
    const response = await db.credential.create({
        data: {
            userId,
            name: data.name,
            value: encryptedVal
        }
    })

    if(!response) throw new Error("failed to create credential")

    revalidatePath("/credentials")
}

