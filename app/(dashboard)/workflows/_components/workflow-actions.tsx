"use client"
import TooltipWrapper from '@/components/global/tool-tip-wrapper'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import DeleteWorkflowDialog from './delete-workflow-dialog'

type Props = {
    workflowname: string,
    workflowId: string
}

const WorkFlowActions = (props: Props) => {
    const [showDeletedDialog, setShowDeleteDialog] = React.useState(false)

  return (
    <>
        <DeleteWorkflowDialog  open={showDeletedDialog} setOpen={setShowDeleteDialog} workflowname={props.workflowname} workflowId={props.workflowId}/>
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                
                <Button variant={"outline"} size={"sm"}>

                    <TooltipWrapper content={"More action"}>
                        <div className="flex items-center justify-center w-full h-full">
                            <MoreVerticalIcon size={18}/>
                        </div>
                    </TooltipWrapper>

                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                
                <DropdownMenuSeparator/>

                <DropdownMenuItem className='text-destructive flex items-center gap-2' onSelect={() => setShowDeleteDialog(prev => !prev)}>
                    <TrashIcon size={16}/> Delete
                </DropdownMenuItem>

            </DropdownMenuContent>
            

        </DropdownMenu>
    </>
  )
}

export default WorkFlowActions