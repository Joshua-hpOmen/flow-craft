"use client"

import { runWorkflow } from '@/actions/workflows/run-workflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}

const RunBtn = (props: Props) => {
    const mutation = useMutation({
        mutationFn: runWorkflow,
        onSuccess: () => {
            toast.success("Workflow started", {id:"workflow-running"})
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (e: any) => {
            if(e.digest.split("NEXT_REDIRECT").length > 1){
                toast.success("Workflow started", {id:"workflow-running"})
            }else{
                toast.error("Something went wrong", {id:"workflow-running"})
            }
        }
    })
  return (
    <Button className='flex items-center gap-2' variant={"outline"} size={"sm"} disabled={mutation.isPending} onClick={() => {
        toast.loading("Scheduling run...", {id: "workflow-running"})
        mutation.mutate({workflowId: props.workflowId})
    }}>
        <PlayIcon size={16}/> Run
    </Button>
  )
}

export default RunBtn