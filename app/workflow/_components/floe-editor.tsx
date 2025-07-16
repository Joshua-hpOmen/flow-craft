"use client"
import { Workflow } from '@/lib/generated/prisma'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import React from 'react'
import "@xyflow/react/dist/style.css"
import { createFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'
import NodeComponent from './nodes/node-component'

type Props = {
    workflow: Workflow
}

const nodeTypes = {
    FlowScrapeNode: NodeComponent,
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = {padding: 2}
const FlowEditor = (props: Props) => {
    const [node, setNode, onNodesChange] = useNodesState([createFlowNode(TaskType.LAUNCH_BROWSER)])
    const [edge, setEdge, onEdgeChange] = useEdgesState([])

  return (
    <main className='h-full w-full'>
        <ReactFlow nodes={node} edges={edge} onNodesChange={onNodesChange} onEdgesChange={onEdgeChange}
            nodeTypes={nodeTypes} snapGrid={snapGrid} snapToGrid fitView fitViewOptions={fitViewOptions}>

            <Controls position="top-left" fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
        </ReactFlow>
    </main>
  )
}

export default FlowEditor