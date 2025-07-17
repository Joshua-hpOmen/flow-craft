"use client"
import { runWorkflow } from '@/actions/workflows/run-workflow'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}

const ExecuteBtn = (props: Props) => {
  const {toObject} = useReactFlow()
  const generate = useExecutionPlan();
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => { toast.success("Execution started", {id: "workflow-execution"}) },
    onError: () => { toast.error("Something went wrong", {id: "workflow-execution"}) }
  });

  return (
    <Button variant={"outline"} disabled={mutation.isPending} className='flex items-center gap-2' onClick={() => {
      const plan = generate();
      if(!plan) return;
      mutation.mutate({ workflowId: props.workflowId, flowDefinition: JSON.stringify(toObject())})
    }}>
        <PlayIcon size={16} className='stroke-green-700'/> Execute
    </Button>
  )
}

export default ExecuteBtn