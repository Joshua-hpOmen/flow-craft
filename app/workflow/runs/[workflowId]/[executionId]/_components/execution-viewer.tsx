"use client"
 
import { getWorkfloExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases'
import { GetWorkflowPhaseDetails } from '@/actions/workflows/get-workflow-phase-details'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DatestoDurationString } from '@/lib/helper/dates'
import { GetPhasesTotalCoset } from '@/lib/helper/phases'
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2, Menu, WorkflowIcon, X } from 'lucide-react'
import React from 'react'
import ExecutionLabel from './execution-label'
import ParammeterViewer from './parammeter-viewer'
import LogViewer from './log-viewer'
import PhaseStatusBadge from './phase-status-badge'
import ReactCountupWrapper from '@/components/global/react-countup-wrapper'

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
        queryKey: ["phaseDetails", selectedPhase, query.data?.status],
        enabled: selectedPhase !== null,
        queryFn: () => GetWorkflowPhaseDetails(selectedPhase!)
    })
    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;
    
    React.useEffect(() => {
        const findRunningPhase = () => {
            if(!isRunning && !selectedPhase){
                if(!query.data?.executionPhases) return
                const phaseToSelect = query.data.executionPhases.find(phase => 
                    phase.status as ExecutionPhaseStatus  === "FAILED")

                setSelectedPhase(phaseToSelect ? 
                    phaseToSelect.id : query.data.executionPhases[query.data.executionPhases.length - 1].id)
                return
            }

            const currentRunningPhase = query.data?.executionPhases.find(phase => 
                phase.status as ExecutionPhaseStatus === "RUNNING")

            if(!currentRunningPhase) return

            setSelectedPhase(currentRunningPhase.id)
        }

        findRunningPhase()
    }, [query, isRunning, selectedPhase])

    const duration = DatestoDurationString(query.data?.completedAt, query.data?.startedAt)
    const creditsConsumed =    GetPhasesTotalCoset(query.data?.executionPhases || [])

  return (
    <div className='w-full h-full flex'>
        {open ? <aside className='w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden transition-all ease-in-out'>
            
            <div className='text-muted-foreground w-full flex justify-end px-2 cursor-pointer'>
                <X size={16} onClick={() => setOpen(false)}/>
            </div>

            <div className="py-4 px-2">

                <ExecutionLabel icon={CircleDashedIcon} label={"Status"} value={<div className='font-semibold capitalize flex gap-2 items-center'>
                    <PhaseStatusBadge status={query.data?.status as ExecutionPhaseStatus} />
                    <span>{query.data?.status}</span>
                </div>} />
                <ExecutionLabel icon={CalendarIcon} label={"Started Aat"} value={
                    <span className='lowercase'>
                        {query.data?.startedAt ? formatDistanceToNow(new Date(query.data.startedAt)) : "-"} 
                    </span>}
                />
                <ExecutionLabel icon={ClockIcon} label={"Duration"} value={duration ? duration : <Loader2 className='animate-spin' size={20}/>} />
                <ExecutionLabel icon={CoinsIcon} label={"Credits consumed"} value={<ReactCountupWrapper value={creditsConsumed}/>} />
                
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

                        <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus}/>

                    </Button>
                ))}
            </div>

        </aside> : <div className='fixed top-2 left-2 p-2 backdrop-blur-xl rounded-md z-50'>
            <Menu onClick={() => setOpen(true)}/>
        </div>}

        <div className='flex w-full h-full px-4'>
            {isRunning && <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                <p className="font-bold">Run is in progress, please wait</p>
            </div>}

            {!isRunning && !selectedPhase && (
                <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                    <div className='flex flex-col gap-1 text-center'>
                        <p className="font-bold ">No phase selected</p>
                        <p className='text-sm text-muted-foreground'>Select a phase to view details</p>
                    </div>
                </div>
            )}

            {!isRunning && selectedPhase && phaseDetails.data && (
                <div className='flex flex-col py-4 container gap-4 overflow-auto'>

                    <div className="flex gap-2 items-center">

                        <Badge variant={"outline"} className='space-x-4'>

                            <div className='flex gap-1 items-center'>
                                <CoinsIcon size={18} className='stroke-muted-foreground'/> 
                                <span>Credits</span>
                            </div>

                            <span>{phaseDetails.data.creditsConsumed}</span>

                        </Badge>

                        <Badge variant={"outline"} className='space-x-4'>

                            <div className='flex gap-1 items-center'>
                                <ClockIcon size={18} className='stroke-muted-foreground'/> 
                                <span>Duration</span>
                            </div>

                            <span>{DatestoDurationString(phaseDetails.data.completedAt, phaseDetails.data.startedAt) || "-"}</span>

                        </Badge>

                    </div>

                    <ParammeterViewer title="Inputs" subtitle="Inputs used for this phase" paramJSON={phaseDetails.data.inputs}/>

                    <ParammeterViewer title="Outputs" subtitle="Outputs generated by this phase" paramJSON={phaseDetails.data.outputs}/>

                    <LogViewer logs={phaseDetails.data.executionLog} />
                </div>
            )}

        </div>
    </div>
  )
}

export default ExecutionViewer