"use client"
import { getWorkflowExecutions } from '@/actions/workflows/get-workflow-executions'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DatestoDurationString } from '@/lib/helper/dates'
import { useQuery } from '@tanstack/react-query'
import ExecutionStatusIndicator from './execution-status-indicator'
import { WorkflowExecutionStatus } from '@/types/workflow'
import { CoinsIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

type InitialData = Awaited<ReturnType<typeof getWorkflowExecutions>>

type Props = {
    workflowId: string,
    initialData: InitialData
}

const ExecutionsTable = (props: Props) => {
    const router = useRouter();
    const query = useQuery({
        queryKey: ["executions", props.workflowId],
        initialData: props.initialData,
        queryFn: () => getWorkflowExecutions(props.workflowId),
        refetchInterval: 5 * 1000
    })
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
        <Table className='h-full'>

            <TableHeader className='bg-muted'>

                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Consumed</TableHead>
                    <TableHead className='text-right text-xs text-muted-foreground'>Started at (desc)</TableHead>
                </TableRow>

            </TableHeader>

            <TableBody className='gap-2 h-full overflow-auto'>

                {query.data.map(exec => {

                    const duration = DatestoDurationString(exec.completedAt, exec.startedAt);
                    const formatedStartedAt = exec.startedAt && formatDistanceToNow(exec.startedAt, { addSuffix: true })

                    return(
                        <TableRow key={exec.id} className='cursor-pointer' onClick={() => {
                            router.push(`/workflow/runs/${exec.workflowId}/${exec.id}`)
                        }}>
                            <TableCell>

                                <div className='flex flex-col'>

                                    <span className="font-semibold">{exec.id}</span>
                                    <div className="text-muted-foreground text-xs ">

                                        <span>Triggered via </span>
                                        <Badge variant={"outline"}>{exec.trigger}</Badge>

                                    </div>

                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-col'>
                                    <div className='flex gap-2 items-center'>
                                        <ExecutionStatusIndicator status={exec.status as WorkflowExecutionStatus}/>
                                        <span className='font-semibold capitalize'>{exec.status}</span>
                                    </div>

                                    <div className='text-muted-foreground text-xs mx-5'>
                                        {duration}
                                    </div>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-col'>
                                    <div className='flex gap-2 items-center'>
                                        <CoinsIcon size={16} className='text-primary'/>
                                        <span className='font-semibold capitalize'>{exec.creditsConsumed}</span>
                                    </div>

                                    <div className='text-muted-foreground text-xs mx-5'>
                                        Credits
                                    </div>
                                </div>

                            </TableCell>

                            <TableCell className='text-right text-muted-foreground'>
                                {formatedStartedAt}
                            </TableCell>

                        </TableRow>
                    )

                })}

            </TableBody>

        </Table>
    </div>
  )
}

export default ExecutionsTable