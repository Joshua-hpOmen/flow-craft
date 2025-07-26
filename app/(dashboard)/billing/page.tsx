import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ConstructionIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='fixed inset-0 flex flex-col bg-background items-center justify-center gap-10'>
        <header className='flex gap-2 items-center'>
            <ConstructionIcon size={36} className='stroke-primary/55'/>
            <h1 className='text-5xl font-bold'>Page is under Contruction</h1>
        </header>

        <main className='flex flex-col gap-2 items-center'>
            <p className='text-muted-foreground'>This page is currently being built by our talented developer</p>
            <div>
                <Link className={cn('flex gap-1', buttonVariants())} href={'/'}>
                    <ChevronLeft/>
                    Back home
                </Link>
            </div>
        </main>
    </div>
  )
}

export default page