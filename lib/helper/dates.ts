import { Period } from "@/types/analytics";
import { endOfMonth, intervalToDuration, startOfMonth } from "date-fns";

export const DatestoDurationString = (completedAt: Date | null | undefined, startedAt: Date | null | undefined) => {
    if(!completedAt || !startedAt)  return;

    const timeElasped = completedAt.getTime() - startedAt.getTime()

    //Interval to duration doesnt account for ms
    if(timeElasped < 1000){
        return `${timeElasped}ms`
    }

    const duration = intervalToDuration({
        start: 0, 
        end: timeElasped
    });

    return `${duration.minutes || 0}m ${duration.seconds || 0}s`
}

export const PeriodToDateRange =  (period: Period) => {
    const startDate = startOfMonth(new Date(period.year, period.month))
    const endDate = endOfMonth(new Date(period.year, period.month));
    return {startDate, endDate}
}