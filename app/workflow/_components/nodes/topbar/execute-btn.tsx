"use client"
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import React from 'react'

type Props = {
    workflowId: string
}

const ExecuteBtn = (props: Props) => {
  const generate = useExecutionPlan();

  return (
    <Button variant={"outline"} className='flex items-center gap-2' onClick={() => {
      const plan = generate();
      console.log(plan)
    }}>
        <PlayIcon size={16} className='stroke-green-700'/> Execute
    </Button>
  )
}

export default ExecuteBtn