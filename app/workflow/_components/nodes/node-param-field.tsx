import { TaskParam, TaskParamType } from '@/types/task'
import StringParam from './param/string-param'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/app-node'
import React from 'react'

type Props = {
    param: TaskParam,
    nodeId: string
}

const NodeParamField = (props: Props) => {
    const {updateNodeData, getNode} = useReactFlow()
    const node : AppNode = getNode(props.nodeId) as AppNode;
    const value : string = node.data.inputs?.[props.param.name]
    
    const updateNodeParamValue = React.useCallback((newValue: string) => {
        updateNodeData(props.nodeId, {
            inputs: {
                ...node.data.inputs,
                [props.param.name] : newValue
            }
        })
    }, [updateNodeData, props.param.name, node.data.inputs, props.nodeId]);

    switch (props.param.type) {
        case TaskParamType.STRING:
            return <StringParam param={props.param} value={value} updateNodeParamValue={updateNodeParamValue}/>        
        default:
            <div className="w-full">
                <p className="text-xs text-muted-foreground">Not implemented</p>
            </div>
    }

}

export default NodeParamField