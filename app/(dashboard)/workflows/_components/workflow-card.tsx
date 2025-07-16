"use client"
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { WorkflowStatus } from '@/types/workflow'
import { Workflow } from '@prisma/client'
import { FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import WorkFlowActions from './workflow-actions'

type Props = {
    workflow: Workflow
}

const statusColours = {
    [WorkflowStatus.DRAFT] : "bg-red-200 text-red-600",
    [WorkflowStatus.PUBLISHED]: "bg-green-500"
}

const WorkflowCard = (props: Props) => {
  return (
    <Card className='border border-separate shadow-sm rounded-lg overlfow-hidden hover:shadow-md dark:shadow-primary/30'>

        <CardContent className='p-4 flex items-center justify-between h-[100px]'>
            <div className='flex items-center justify-end gap-2'>

                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusColours[props.workflow.status as WorkflowStatus])}>
                    {props.workflow.status === WorkflowStatus.DRAFT ? <FileTextIcon className='h-5 w-5'/> : <PlayIcon className='h-5 w-5 text-white'/>}
                </div>

                <div className=''>
                    <h3 className='text-base font-bold text-muted-foreground flex items-center'>
                        <Link href={`/workflow/editor/${props.workflow.id}`} className='flex items-center hover:underline'>{props.workflow.name}</Link>
                        {props.workflow.status === WorkflowStatus.DRAFT && <span className='ml-2 px-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full'>Draft</span>}
                    </h3>
                </div>

            </div>

            <div className="flex items-center space-x-2">
                <Link href={`/workflow/editor/${props.workflow.id}`} className={cn(buttonVariants({variant: "outline", size: "sm"}), "flex items-center gap-2")}>
                    <ShuffleIcon size={16}/> Edit
                </Link>

                <WorkFlowActions workflowname={props.workflow.name} workflowId={props.workflow.id} />
            </div>
        </CardContent>

    </Card>
  )
}

export default WorkflowCard