"use client"
 
import { getWorkfloExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases'
import { WorkflowExecutionStatus } from '@/types/workflow'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2, Menu, WorkflowIcon, X } from 'lucide-react'
import ExecutionLabel from './execution-label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DatestoDurationString } from '@/lib/helper/dates'
import { GetPhasesTotalCoset } from '@/lib/helper/phases'
import React from 'react'
import { GetWorkflowPhaseDetails } from '@/actions/workflows/get-workflow-phase-details'

type Props = {
    execution : Awaited<ReturnType<typeof getWorkfloExecutionWithPhases>>
}

function ExecutionViewer(props: Props) {
    const [selectedPhase, setSelectedPhase] = React.useState<string | null>(null)
    const [open, setOpen] = React.useState(true)
    const query = useQuery({
        queryKey: ["execution", props.execution?.id],
        initialData: props.execution,
        queryFn: () => getWorkfloExecutionWithPhases(props.execution!.id),
        refetchInterval: q => q.state.data?.status === WorkflowExecutionStatus.RUNNING ?  1000 : false,
    })

    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase],
        enabled: selectedPhase !== null,
        queryFn: () => GetWorkflowPhaseDetails(selectedPhase!)
    })
    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING    

    const duration = DatestoDurationString(query.data?.completedAt, query.data?.startedAt)
    const creditsConsumed =    GetPhasesTotalCoset(query.data?.executionPhases || [])

  return (
    <div className='w-full h-full flex'>
        {open ? <aside className='w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden transition-all ease-in-out'>
            
            <div className='text-muted-foreground w-full flex justify-end px-2 cursor-pointer'>
                <X size={16} onClick={() => setOpen(false)}/>
            </div>

            <div className="py-4 px-2">

                <ExecutionLabel icon={CircleDashedIcon} label={"Status"} value={query.data?.status} />
                <ExecutionLabel icon={CalendarIcon} label={"Started Aat"} value={
                    <span className='lowercase'>
                        {query.data?.startedAt ? formatDistanceToNow(new Date(query.data.startedAt)) : "-"} 
                    </span>}
                />
                <ExecutionLabel icon={ClockIcon} label={"Duration"} value={duration ? duration : <Loader2 className='animate-spin' size={20}/>} />
                <ExecutionLabel icon={CoinsIcon} label={"Credits consumed"} value={creditsConsumed} />
                
            </div>

            <Separator/>

            <div className='flex justify-center items-center py-2 px-4'>
                <div className='text-muted-foreground flex items-center gap-2'>
                    <WorkflowIcon size={20} className='stroke-muted-foreground/80'/>
                    <span className='font-semibold'>Phases</span>
                </div>
            </div>
            
            <Separator/>

            <div className='overflow-auto h-full px-2 py-4 flex flex-col gap-2'>
                {query.data?.executionPhases && query.data.executionPhases.map((phase, index) => (
                    <Button key={index} variant={selectedPhase === phase.id ? "secondary" : "ghost"} 
                        className='w-full justify-between' onClick={() => {
                            if(isRunning) return;
                            setSelectedPhase(phase.id)
                        }}>
                        
                        <div className='flex items-center gap-2'>
                            <Badge variant={"outline"}>{index+1}</Badge>
                            <p className='font-semibold'>{phase.name}</p>
                        </div>

                        <p className='text-xs text-muted-foreground'>
                            {phase.status}
                        </p>

                    </Button>
                ))}
            </div>

        </aside> : <div className='fixed top-2 left-2 p-2 backdrop-blur-xl rounded-md z-50'>
            <Menu onClick={() => setOpen(true)}/>
        </div>}

        <div>
            <pre>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
        </div>
    </div>
  )
}

export default ExecutionViewer