import React from 'react'
import UserWorkflowSkeleton from './_components/user-workflows-skeleton'
import UserWorkflows from './_components/user-work-flows'
import CreateWorkflowDialog from './_components/create-wrokflow-dialog'

const page = () => {
  return (
    <div className='flex-1 flex flex-col h-full mt-2'>

        <header className='flex justify-between items-center'>

            <div className='flex flex-col'>
                <h1 className='text-3xl font-bold'>Workflows</h1>
                <p className='text-muted-foreground'>Manage your workflows</p>
            </div>
            
            <CreateWorkflowDialog/>

        </header>

        <div className='h-full py-6'>
            
            <React.Suspense fallback={<UserWorkflowSkeleton/>}>
                <UserWorkflows/>
            </React.Suspense>

        </div>

    </div>
  )
}

export default page