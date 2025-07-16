"use client"
import TooltipWrapper from '@/components/global/tool-tip-wrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Savebtn from './savebtn'

type Props = {
    title: string,
    subtitle?: string,
    workflowId: string
}

const Topbar = (props: Props) => {
    const router = useRouter()

  return (
    <header className='flex p-2 border-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
        <div className="flex gap-1 flex-1">

            <TooltipWrapper content="Back">
                <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                    <ChevronLeftIcon size={20}/>
                </Button>
            </TooltipWrapper>

            <div>
                <p className='font-bold text-ellipsis truncate'>{props.title}</p>
                {props.subtitle && <p className='text-xs text-muted-foreground truncate text-ellipsis'>{props.subtitle}</p>}
            </div>

        </div>
        <div className='flex gap-1 flex-1 justify-end'><Savebtn workflowId={props.workflowId}/></div>
    </header>
  )
}

export default Topbar