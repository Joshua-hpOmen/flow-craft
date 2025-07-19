import { z } from "zod"

export const createWorkflowSchema = z.object({
    name: z.string().max(50).min(1, {message: "Required"}),
    description: z.string().max(80).optional()
})

export const duplicateWorkflowSchema = createWorkflowSchema.extend({
    workflowId: z.string().min(1)
})