import { Workflow } from '@/lib/generated/prisma'
import React from 'react'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './floe-editor'

type Props = {
    workflow: Workflow
}

const Editor = (props: Props) => {
  return (
    <ReactFlowProvider>
        <div className='flex flex-col h-full w-full overflow-hidden'>
            <section className='flex h-full overflow-auto'><FlowEditor workflow={props.workflow}/></section>
        </div>
    </ReactFlowProvider>
  )
}

export default Editor