import { getWorkflowExecutions } from '@/actions/workflows/get-workflow-executions'
import { InboxIcon } from 'lucide-react'

type Props = {
    workflowId: string
}

const ExecutionsTable = async (props: Props) => {
    const executions = await getWorkflowExecutions(props.workflowId)
    if(!executions) return <div>No data</div>

    if(executions.length === 0){
        return(
            <div className="container w-full py-6">
            
                <div className='w-full'>

                    <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center mx-auto'>
                        <InboxIcon size={40} className='stroke-primary'/>
                    </div>

                    <br />

                    <div className='text-center'>
                        <p className="font-bold">No runs have been triggered yet for this workflow</p>
                        <p className="text-sm text-muted-foreground">You can trigger a new run in the editor page</p>
                    </div>

                </div>

            </div>
        )
    }

  return (
    <div>ExecutionsTable</div>
  )
}

export default ExecutionsTable