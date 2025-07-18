import { CoinsIcon, CornerDownRight, MoveRightIcon } from 'lucide-react'
import React from 'react'
import SchedularDialog from './schedular-dialog'
import TooltipWrapper from '@/components/global/tool-tip-wrapper'
import { Badge } from '@/components/ui/badge'

type Props = {
    isDraft: boolean,
    creditsCost: number,
    workflowId: string
}

const ScheduleSection = (props: Props) => {
    if(props.isDraft) return null
  return (
    <div className='flex items-center gap-2'>
        <CornerDownRight className='h-4 w-4 text-muted-foreground'/><SchedularDialog workflowId={props.workflowId}/>
        <MoveRightIcon className='h-4 w-4 text-muted-foreground'/>

        <TooltipWrapper content="Credi consumption for full run">

            <div className="flex items-center gap-3">

                <Badge variant={"outline"} className='space-x-2 text-muted-foreground rounded-sm'>
                    <CoinsIcon className='h-4 w-4'/>
                    <span className="text-sm">{props.creditsCost}</span>
                </Badge>

            </div>

        </TooltipWrapper>

    </div>
  )
}

export default ScheduleSection