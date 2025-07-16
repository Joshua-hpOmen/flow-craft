import { Workflow } from '@/lib/generated/prisma'
import React from 'react'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './floe-editor'
import Topbar from './nodes/topbar/topbar'
import TaskMenu from './task-menu'

type Props = {
    workflow: Workflow
}

const Editor = (props: Props) => {
  return (
    <ReactFlowProvider>
        <div className='flex flex-col h-full w-full overflow-hidden'>
            <Topbar workflowId={props.workflow.id} title='Worklfow editor' subtitle={props.workflow.name}/>
            <section className='flex h-full overflow-auto'>
              <TaskMenu/>
              <FlowEditor workflow={props.workflow}/>
            </section>
        </div>
    </ReactFlowProvider>
  )
}

export default Editor