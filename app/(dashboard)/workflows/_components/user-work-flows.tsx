import { getWorkflowsForUser } from '@/actions/workflows/get-wrokflows-for-users'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Inbox } from 'lucide-react';
import React from 'react'
import CreateWorkflowDialog from './create-wrokflow-dialog';
import WorkflowCard from './workflow-card';

const UserWorkflows = async () => {

    const workflows =  await getWorkflowsForUser();

    if(!workflows) {
        return (
        <Alert variant={"destructive"}>
            <AlertCircle className='w-4 h-4'/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
        </Alert>
    )}

    if(workflows.length === 0) {
        return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">

                <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                    <Inbox size={40} className='stroke-primary'/>
                </div>

                <div className="flex flex-col gap-1 text-center">
                    <p className='font-bold'>No workflow created yet</p>
                    <p className='text-sm text-muted-foreground'>Click the button below to create a workflow</p>
                </div>

                <CreateWorkflowDialog triggerText='Create your first workflow'/>
                
            </div>
        )
    }

  return (
    <div className='grid grid-cols-1 gap-4'>
        {workflows.map(workflow => <WorkflowCard key={workflow.id} workflow={workflow}/>)}
    </div>
  )
}

export default UserWorkflows