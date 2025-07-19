import ExecutionStatusIndicator from '@/app/workflow/runs/[workflowId]/_components/execution-status-indicator'
import { Workflow } from '@/lib/generated/prisma'
import { WorkflowExecutionStatus, WorkflowStatus } from '@/types/workflow'
import { format, formatDistanceToNow } from 'date-fns'
import { ChevronRightIcon, ClockIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {formatInTimeZone} from "date-fns-tz"
import { cn } from '@/lib/utils'
type Props = {
    workflow: Workflow
}

const labelColors: Record<WorkflowExecutionStatus, string> = {
    PENDING : "text-slate-400",
    RUNNING : "text-yellow-400",
    FAILED : "text-red-400",
    COMPLETED : "text-emerald-400"
}

const LastRunDetails = (props: Props) => {
    const isdraft = props.workflow.status === WorkflowStatus.DRAFT
    if(isdraft) return;
    const {lastRunAt, lastRunStatus, lastRunId, nextRunAt} = props.workflow;
    const formatedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, {addSuffix: true})
    const nextSchedule = nextRunAt && format(nextRunAt, "dd MMM yy - HH:mm")
    const nextScheduleUTC = nextSchedule && formatInTimeZone(nextRunAt, "UTC", "HH:mm")

    
  return (
    <div className='bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground'>
        <div className='flex items-center text-sm gap-2'>
             {lastRunAt ? <Link href={`/workflow/runs/${props.workflow.id}/${lastRunId}`} className='flex items-center gap-2 group'>
                <span>Last run:</span>
                <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus}/>
                <span className={cn('lowercase', labelColors[props.workflow.lastRunStatus as WorkflowExecutionStatus])}>{lastRunStatus}</span>
                <span>{formatedStartedAt}</span>
                <ChevronRightIcon size={14} className='group-hover:translate-x-0 transition -translate-x-[2px]'/>
            </Link> : <p>No runs yet</p>}
        </div>

        {nextRunAt && <div className=' flex items-center text-sm gap-2'>
            <ClockIcon size={12}/>
            <span>Next run at:</span>
            <span>{nextSchedule}</span>
            <span className='text-xs'>({nextScheduleUTC} UTC)</span>
        </div>}
    </div>
  )
}

export default LastRunDetails