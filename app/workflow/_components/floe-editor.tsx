"use client"
import { Workflow } from '@/lib/generated/prisma'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import React from 'react'
import NodeComponent from './nodes/node-component'
import Topbar from './nodes/topbar/topbar'
import { createFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'

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
    const {setViewport} = useReactFlow()

    React.useEffect(() => {
        try {
            const flow = JSON.parse(props.workflow.definition);
            console.log(flow)
            if(!flow) return
            setNode(flow.nodes || []);
            setEdge(flow.edges || []);
    
            if(!flow.viewport) return;
            const { x=0 , y=0, zoom=1 } = flow.viewport
            setViewport({x, y, zoom})
            
        } catch (error) {
            console.log(error)            
        }

    }, [props.workflow.definition, setEdge, setNode, setViewport])

  return (
    <main className='h-full w-full'>
        <ReactFlow nodes={node} edges={edge} onNodesChange={onNodesChange} onEdgesChange={onEdgeChange}
            nodeTypes={nodeTypes} snapGrid={snapGrid} snapToGrid fitView fitViewOptions={fitViewOptions}>
                
            <Topbar workflowId={props.workflow.id} title='Worklfow editor' subtitle={props.workflow.name}/>
            <Controls position="top-left" fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>

        </ReactFlow>
    </main>
  )
}

export default FlowEditor