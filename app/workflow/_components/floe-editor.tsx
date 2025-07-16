"use client"
import { Workflow } from '@/lib/generated/prisma'
import { createFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import React, { useCallback } from 'react'
import NodeComponent from './nodes/node-component'
import { AppNode } from '@/types/app-node'
import DeletableEdge from './edges/deletable-edge'
import { TaskRegistry } from '@/lib/workflow/task/registry'

type Props = {
    workflow: Workflow
}

const nodeTypes = {
    FlowScrapeNode: NodeComponent,
}

const edgeTypes = {
    default: DeletableEdge
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = {padding: 2}

const FlowEditor = (props: Props) => {
    const [node, setNode, onNodesChange] = useNodesState<AppNode>([])
    const [edge, setEdge, onEdgeChange] = useEdgesState<Edge>([])
    const {setViewport, screenToFlowPosition, updateNodeData} = useReactFlow()

    React.useEffect(() => {
        try {
            const flow = JSON.parse(props.workflow.definition);
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

    const onDragOver = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
    }, [])

    const onDrop = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const taskType = e.dataTransfer.getData("application/reactflow");
        if(!taskType) return;

        const pos = screenToFlowPosition({
            x: e.clientX,
            y: e.clientY
        })

        const newNode = createFlowNode(taskType as TaskType, pos);
        setNode((prev) => prev.concat(newNode))
    }, [screenToFlowPosition, setNode])


    const onConnect = React.useCallback((connection: Connection) => {

        setEdge(prev => addEdge({...connection, animated: true}, prev))
        if(!connection.targetHandle) return;

        const nodeCheck = node.find(item => item.id === connection.target);
        if(!nodeCheck) return;

        const nodeInputs = nodeCheck.data.inputs;
        updateNodeData(nodeCheck.id, {
            inputs: {
                ...nodeInputs,
                [connection.targetHandle]: ""
            }
        })

    }, [setEdge, updateNodeData, node]) 

    const isValidConnection = useCallback((connection: Edge | Connection) => {
        if(connection.source === connection.target) return false

        const source = node.find(node => node.id === connection.source)
        const target = node.find(node => node.id === connection.target)
        if(!source || !target) return false;
        
        const sourceTask = TaskRegistry[source.data.type]
        const targetTask = TaskRegistry[target.data.type]

        const output = sourceTask.outputs.find(output => output.name === connection.sourceHandle)
        const input = targetTask.inputs.find(input => input.name === connection.targetHandle)
        if(output?.type !== input?.type) return false

        const hasCycle = (nodeForCycle: AppNode, visisted = new Set()) => {
            if(visisted.has(nodeForCycle.id)) return false;
            visisted.add(nodeForCycle.id);

            for(const outgoer of getOutgoers(nodeForCycle, node, edge)){
                if(outgoer.id === connection.source) return true;
                if(hasCycle(outgoer, visisted)) return true
            }

            return false
        };

        const detectedCycle : boolean = hasCycle(target);

        return !detectedCycle

    }, [node, edge])

  return (
    <main className='h-full w-full'>
        <ReactFlow nodes={node} edges={edge} onNodesChange={onNodesChange} onEdgesChange={onEdgeChange} onDrop={onDrop} 
            onConnect={onConnect} onDragOver={onDragOver} nodeTypes={nodeTypes} snapGrid={snapGrid} snapToGrid fitView 
            fitViewOptions={fitViewOptions} edgeTypes={edgeTypes} isValidConnection={isValidConnection}>
            <Controls position="top-left" style={{top: "60px"}} fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
        </ReactFlow>
    </main>
  )
}

export default FlowEditor