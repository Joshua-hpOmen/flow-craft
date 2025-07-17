import useFlowValidation from '@/components/hooks/use-flow-validation'
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import React from 'react'

type Props = {
    nodeId: string,
    children: React.ReactNode,
    isSelected: boolean
}

const NodeCard = (props: Props) => {
    const {getNode, setCenter} = useReactFlow();
    const {invalidInputs} = useFlowValidation();

    const hasInvalidInputs = invalidInputs.some(node => node.nodeId === props.nodeId)

  return (
    <div className={cn('rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs  flex flex-col gap-1', props.isSelected && "border-primary", hasInvalidInputs && "border-red-700 border-2")} onDoubleClick={() => {
        const node = getNode(props.nodeId)
        if(!node) return
        const {position, measured} = node;
        if(!position || !measured) return

        const {width, height} = measured;

        const x = position.x + width! /2;
        const y = position.y + height!/2

        if(x === undefined || y === undefined) return

        setCenter(x, y, {
            zoom: 1, 
            duration: 500
        })
    }}>{props.children}</div>
  )
}

export default NodeCard