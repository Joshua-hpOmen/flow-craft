import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import React from 'react'
import NodeParamField from './node-param-field'
import { ColorForHandle } from './common'

type Props = {
    input: TaskParam, 
    nodeId: string
}

const NodeInput = (props: Props) => {

  const edges = useEdges();
  const isConnected = edges.some(edge => edge.target === props.nodeId && edge.targetHandle === props.input.name)

  return (
    <div className='flex justify-start relative p-3 bg-secondary w-full'>
        <NodeParamField  param={props.input} nodeId={props.nodeId} disabled={isConnected}/>
        {!props.input.hideHandle &&
          <Handle id={props.input.name} type='target' position={Position.Left} className={cn("!bg-muted-foreground !border-2 !border-background !-left-1 !w-2 !h-2", ColorForHandle[props.input.type])} isConnectable={!isConnected}/>
        }
    </div>
  )
}

export default NodeInput