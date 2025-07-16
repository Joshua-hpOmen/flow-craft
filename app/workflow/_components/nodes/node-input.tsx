import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import NodeParamField from './node-param-field'

type Props = {
    input: TaskParam, 
    nodeId: string
}

const NodeInput = (props: Props) => {
  return (
    <div className='flex justify-start relative p-3 bg-secondary w-full'>
        <NodeParamField  param={props.input} nodeId={props.nodeId}/>
        {!props.input.hideHandle &&
            <Handle id={props.input.name} type='target' position={Position.Left} className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-3 !h-3")}/>
        }
    </div>
  )
}

export default NodeInput