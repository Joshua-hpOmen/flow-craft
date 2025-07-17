"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { AppNode } from '@/types/app-node'
import { TaskType } from '@/types/task'
import { useReactFlow } from '@xyflow/react'
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type Props = {
    taskType: TaskType,
    nodeId: string
}

const NodeHeader = (props: Props) => {
    const task = TaskRegistry[props.taskType]
    const {deleteElements, getNode, addNodes} = useReactFlow()
  return (
    <div className='flex items-center gap-2 p-2'>
        <task.icon size={16}/>
        <div className='flex justify-between items-center w-full'>
            <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
            <div className="flex gap-1 items-center">
                {task.isEntryPoint && <Badge>Entry point</Badge>}
                <Badge className='gap-2 flex items-center text-xs'>
                    <CoinsIcon size={16}/> {task.credits}
                </Badge>
                {!task.isEntryPoint && <>
                    <Button variant={"ghost"} size={"icon"} onClick={(e) => { e.stopPropagation(); deleteElements({ nodes: [{id: props.nodeId}] }) }}>
                        <TrashIcon size={12}/>
                    </Button>
                    <Button variant={"ghost"} size={"icon"} onClick={(e) => {
                        e.stopPropagation()
                        const node = getNode(props.nodeId) as AppNode
                        const newX = node.position.x + 40
                        const newY = node.position.y + 40

                        const newNode = createFlowNode(node.data.type, {x: newX, y: newY});
                        addNodes([newNode])
                    }}>
                        <CopyIcon size={12}/>
                    </Button>
                </>}
                <Button variant={"ghost"} size={"icon"} className='drag-handle cursor-grab'>
                    <GripVerticalIcon size={20}/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default NodeHeader