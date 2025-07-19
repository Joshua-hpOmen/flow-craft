import { getAppURL } from "@/lib/helper/app-url";
import { db } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export const GET = async (req: Request) => {

    const now = new Date();
    const workflows = await db.workflow.findMany({
        select: {id: true},
        where : {
            status: WorkflowStatus.PUBLISHED,
            cron: {not: null},
            nextRunAt: {lte: now}
        }
    })

    console.log("🟢TO run workflows to run", workflows.length);

    for(const workflow of workflows) {
        triggerWorkflow(workflow.id)
    }

    return Response.json({workflowsToRun: workflows.length}, {status: 200})
}

const triggerWorkflow = (workflowId: string) => {
    const triggerApiURL = getAppURL(`api/workflows/execute?workflowId=${workflowId}`);

    fetch(triggerApiURL, {
        headers: {
            Authorization: `Bearer ${process.env.API_SECRET!}`, 
        },
        cache: "no-store",
    }).catch(error => console.error("Error triggering workflow with id", workflowId, ":error->", error.message))
} 