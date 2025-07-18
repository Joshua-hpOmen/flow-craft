"use client"
import { Tabs, TabsList } from '@/components/ui/tabs'
import Link from 'next/link'
import React from 'react'


type Props = {
    workflowId: string
}

const NavigateTabs = (props: Props) => {
  return (
    <Tabs className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
            <Link href={`/workflow/editor/${props.workflowId}`}>Editor</Link>
            <Link href={`/workflow/runs/${props.workflowId}`}>Runs</Link>
        </TabsList>
    </Tabs>
  )
}

export default NavigateTabs