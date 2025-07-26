"use server"

import { PeriodToDateRange } from "@/lib/helper/dates";
import { db } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { ExecutionPhaseStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";

export const getCreditsUsageInPeriod =  async (period: Period) => {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorised");
    
    const dateRange = PeriodToDateRange(period);
    const executionPhasesWithInRange = await db.executionPhase.findMany({
        where: {
            userId,
            startedAt: {
                lte: dateRange.endDate,
                gte: dateRange.startDate
            },
            status: {
                in : [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED]
            }
        }
    })

    const dateFormat = "yyyy-MM-dd"

    const stats = eachDayOfInterval({start: dateRange.startDate, end: dateRange.endDate})
        .map(date => format(date, dateFormat))
        .reduce((accumVal, date) => {

            accumVal[date] = {
                success: 0,
                failed: 0
            };
            return accumVal

        }, {} as Record<string, {
            success: number,
            failed: number
        }>);

    executionPhasesWithInRange.forEach(exec => {
        const date = format(exec.startedAt!, dateFormat)
        if(exec.status === ExecutionPhaseStatus.COMPLETED){ stats[date].success += exec.creditsConsumed! } 
        if(exec.status === ExecutionPhaseStatus.FAILED){ stats[date].failed += exec.creditsConsumed! } 
    })
    
    const results = Object.entries(stats).map(([date, info]) => ({date, ...info}))

    return results
} 