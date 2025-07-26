import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const StatsCardSkeleton = () => {
  return (
    <div className='grid gap-3 lg:gap-8 lg:grid-cols-3'>
        {
            [1,2,3,4].map(i => {
                return <Skeleton key={i} className='w-full min-h-[120px]'/>
            })
        }
    </div>
  )
}

export default StatsCardSkeleton