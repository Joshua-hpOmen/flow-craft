import { db } from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, WokrflowExecutionTrigger, WorkflowExecutionPlan, WorkflowExecutionStatus } from "@/types/workflow";
import parser from "cron-parser";
import { timingSafeEqual } from "crypto";

const isValidSecret = (seceret: string) => {
    const API_SECRET = process.env.API_SECRET;
    if(!API_SECRET) return false

    try {
        return timingSafeEqual(Buffer.from(seceret), Buffer.from(API_SECRET));
    } catch {
        return false
    }
}


export const GET =  async (req: Request) => {
    const authHeader = req.headers.get("authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")) return Response.json({error: "Unauthorised"}, {status: 401})

    const seceret = authHeader.split(" ")[1]
    if(!isValidSecret(seceret)) return Response.json({error: "Unauthorised"}, {status: 401})
    
    const {searchParams} = new URL(req.url)
    const workflowId = searchParams.get("workflowId") as string;
    if(!workflowId) return Response.json({error: "Bad request"}, {status: 400})

    const workflow = await db.workflow.findUnique({
        where: {id: workflowId}
    })

    if(!workflow) return Response.json({error: "Bad request"}, {status: 400})

    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlan;
    if(!executionPlan) return Response.json({error: "Bad request"}, {status: 400})

    try {
        const cron = parser.parse(workflow.cron!)
        const nextRun = cron.next().toDate()

        const execution = await db.workflowExecution.create({
            data: {
                workflowId,
                userId: workflow.userId,
                definition: workflow.definition,
                status: WorkflowExecutionStatus.PENDING,
                startedAt: new Date(),
                trigger: WokrflowExecutionTrigger.CRON,executionPhases: {
                create: executionPlan.flatMap(phase => { return (
                    phase.nodes.flatMap(node => {
                        return {
                            userId: workflow.userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label
                        }
                    })
                )})
            }
            }
        })
    
        await ExecuteWorkflow(execution.id, nextRun)
        return new Response(null,  {status: 200})
    } catch  {
        return Response.json({error:"internal server error"}, {status: 500})
    }

}

