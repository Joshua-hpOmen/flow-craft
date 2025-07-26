"use server"

import { PeriodToDateRange } from "@/lib/helper/dates";
import { db } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server"

export const getSelectedPeriodData  = async (selectedPeriod: Period) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");

    const dateRange = PeriodToDateRange(selectedPeriod)
    const executionsWithInRange = await db.workflowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status: {
                in: [WorkflowExecutionStatus.COMPLETED, WorkflowExecutionStatus.FAILED]
            }
        },

        select: {
            creditsConsumed: true,
            executionPhases: {
                where: {
                    creditsConsumed: {not: null},
                },
                select: { creditsConsumed : true }
            }
        }
    })

    const creditsConsumed = executionsWithInRange.reduce((accumVal, execution) => accumVal + execution.creditsConsumed, 0)
    const phaseExecutionsCreditsConsumed = executionsWithInRange.reduce((accumVal, execution) => accumVal + execution.executionPhases.length, 0)

    const stats = {
        workflowExecutions: executionsWithInRange.length,
        creditsConsumed: creditsConsumed ?? 0,
        phaseExecutions: phaseExecutionsCreditsConsumed ?? 0
    }


    return stats
}