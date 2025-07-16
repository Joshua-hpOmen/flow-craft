import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import { ColorForHandle } from './common'

type Props = {
    output: TaskParam,
    nodeId: string
}

const NodeOutput = (props: Props) => {
  return (
    <div className='flex justify-end relative p-3 bg-secondary'>
        <p className='text-xs text-muted-foreground'>{props.output.name}</p>

        <Handle id={props.output.name} type='source' position={Position.Right}
            className={cn("!bg-muted-foreground !border-2 !border-background !-right-1 !w-2 !h-2", ColorForHandle[props.output.type])}/>
    </div>
  )
}

export default NodeOutput