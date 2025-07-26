import React, { Suspense } from 'react'
import PeriodSelectorWrapper from './_components/period-selector-wrapper'
import { Period } from '@/types/analytics'
import { Skeleton } from '@/components/ui/skeleton'
import StatsCards from './_components/stats-cards'
import StatsCardSkeleton from './_components/stats-card-skeleton'
import StatsExecutionStatus from './_components/stats-execution-status'
import CreditsUsageInPeriod from './_components/credits-usage-in-period'

type Props = {
  searchParams: Promise<{month?: string, year?: string}>
}

const page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const currrentDate = new Date();

  const period : Period = {
    month: parseInt(searchParams.month ?? currrentDate.getMonth().toString()),
    year: parseInt(searchParams.year ?? currrentDate.getFullYear().toString()),
  } 
  return (
    <div className='flex flex-1 flex-col h-full py-4 overflow-hidden'>

      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Home</h1>
        <Suspense fallback={<Skeleton className='w-[180px] h-[40px]'/>}>
          <PeriodSelectorWrapper selectedPeriod={period}/>
        </Suspense>
      </div>

      <div className='min-h-full py-6 flex flex-col gap-4'>
        <Suspense fallback={<StatsCardSkeleton/>}>
          <StatsCards selectedPeriod={period}/>
        </Suspense>
        <Suspense fallback={<Skeleton className='w-full'/>}>
          <StatsExecutionStatus selectedPeriod={period}/>
        </Suspense>
        <Suspense fallback={<Skeleton className='w-full'/>}>
          <CreditsUsageInPeriod selectedPeriod={period}/>
        </Suspense>
      </div>

    </div>
  )
}

export default page