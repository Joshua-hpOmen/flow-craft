"use server"

import { db } from "@/lib/prisma";
import { createWorkflowSchema } from "@/schema/workflows"
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import z from "zod"

export const createWorkFlow = async ( form: z.infer<typeof createWorkflowSchema> ) => {
    const {success, data} = createWorkflowSchema.safeParse(form);

    if(!success) throw new Error("invalid form data");

    const {userId} = await auth()

    if(!userId) throw new Error("unauthorised")

    const result =  await db.workflow.create({
        data: { userId, definition: "TODO", ...data, status: WorkflowStatus.DRAFT }
    })

    if(!result) throw new Error("failed to create workflow");

    redirect(`/workflow/editor/${result.id}`)
}