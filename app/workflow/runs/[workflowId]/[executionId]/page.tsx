import Topbar from '@/app/workflow/_components/nodes/topbar/topbar'
import React from 'react'
import ExecutionViewerWrapper from './_components/execution-viewer-wrapper'
import { Loader2Icon } from 'lucide-react'

type Props = {
    params : Promise<{workflowId: string, executionId: string}>
}

const page = async (props: Props) => {
    const params = await props.params
  return (
    <div className='flex flex-col h-screen overflow-hidden w-full'>
        <Topbar title="Workflow run details" subtitle={`Run ID: ${params.executionId}`} workflowId={params.workflowId} hideBtns/>
        <section className='flex h-full overflow-auto'>

            <React.Suspense fallback={
                <div className='flex items-center justify-center w-full'>
                    <Loader2Icon className='h-10 w-10 animate-spin stroke-primary'/>
                </div>
            }>
                <ExecutionViewerWrapper executionId={params.executionId}/>
            </React.Suspense>

        </section>
    </div>
  )
}

export default page