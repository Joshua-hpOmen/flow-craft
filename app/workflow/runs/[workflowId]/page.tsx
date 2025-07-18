import React from 'react'
import Topbar from '../../_components/nodes/topbar/topbar';
import ExecutionsTable from './_components/executions-table';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    params: Promise<{workflowId: string}>
}

const page = async (props: Props) => {
    const params = await props.params;

  return (
    <div className='w-full h-full overflow-auto'>
        <Topbar title="All runs" subtitle='List of all your workflow runs' workflowId={params.workflowId} hideBtns/>

        <React.Suspense fallback={<div className='space-y-2 px-10 mt-2'>
            {
                [1, 2, 3, 4].map(i => <Skeleton key={i} className='h-32 w-full'/>)
            }
        </div>}>
            <ExecutionsTable workflowId={params.workflowId}/>
        </React.Suspense>
    </div>
  )
}

export default page