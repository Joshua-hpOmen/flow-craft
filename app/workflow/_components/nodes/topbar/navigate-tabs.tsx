"use client"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


type Props = {
    workflowId: string
}

const NavigateTabs = (props: Props) => {
    const pathName = usePathname();
    const activeValue = pathName.split("/")[2]
  return (
    <Tabs value={activeValue} className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>

            <Link href={`/workflow/editor/${props.workflowId}`}>
                <TabsTrigger value='editor' className='w-full'>
                    Editor
                </TabsTrigger>
            </Link>

            <Link href={`/workflow/runs/${props.workflowId}`}>
                <TabsTrigger value='runs' className='w-full'>
                    Runs
                </TabsTrigger>
            </Link>

        </TabsList>
    </Tabs>
  )
}

export default NavigateTabs