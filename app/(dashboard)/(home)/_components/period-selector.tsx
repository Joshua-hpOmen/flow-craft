"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Period } from '@/types/analytics'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    periods: Period[],
    selectedPeriod: Period
}

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

const PeriodSelector = (props: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()

  return (
    <Select value={`${props.selectedPeriod.month}-${props.selectedPeriod.year}`} onValueChange={value => {
        const [month, year] = value.split("-");
        const params = new URLSearchParams(searchParams);
        params.set("month", month)
        params.set("year", year)
        router.push(`?${params.toString()}`)
    }}>

        <SelectTrigger className='w-[180px]'>
            <SelectValue/>
        </SelectTrigger>

        <SelectContent>
            {props.periods.map((period, index) => (
                <SelectItem key={index} value={`${period.month}-${period.year}`}>
                    {`${MONTHS[period.month]}  ${period.year}`}
                </SelectItem>
            ))}
        </SelectContent>

    </Select>
  )
}

export default PeriodSelector