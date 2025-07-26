"use server"

import { db } from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { auth } from "@clerk/nextjs/server"

export const getPeriods = async () => {
    const {userId}= await auth();
    if(!userId) throw new Error("unauthorised");

    const years = await db.workflowExecution.aggregate({
        where: {userId},
        _min: {startedAt: true}
    });

    const currentYear = new Date().getFullYear()
    const minYear = years._min.startedAt ? years._min.startedAt.getFullYear() : currentYear

    const periods : Period[] = [];

    for (let year=minYear; year<=currentYear; year++){
        for(let month=0; month<= 11; month++){
            periods.push({year, month})
        }
    }

    return periods
}