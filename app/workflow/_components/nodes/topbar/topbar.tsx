"use client"
import TooltipWrapper from '@/components/global/tool-tip-wrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Savebtn from './savebtn'
import ExecuteBtn from './execute-btn'
import NavigateTabs from './navigate-tabs'
import PublishBtn from './publish-btn'
import UnpublishBtn from './unpublish'

type Props = {
    title: string,
    subtitle?: string,
    workflowId: string,
    hideBtns?: boolean,
    isPublished?: boolean
}

const Topbar = (props: Props) => {
    const router = useRouter()

  return (
    <header className='flex p-2 border-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10 gap-4'>
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

        <NavigateTabs workflowId={props.workflowId}/>

        <div className='flex gap-1 flex-1 justify-end'>
            {
                !props.hideBtns && <>
                    <ExecuteBtn workflowId={props.workflowId}/>
                    {!props.isPublished ?
                        <>
                            <Savebtn workflowId={props.workflowId}/>
                            <PublishBtn workflowId={props.workflowId}/>
                        </> : <UnpublishBtn workflowId={props.workflowId}  />
                    }
                </>
            }
        </div>
    </header>
  )
}

export default Topbar