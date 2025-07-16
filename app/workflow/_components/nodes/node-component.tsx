import { NodeProps } from "@xyflow/react";
import React from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/app-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs from "./node-inputs";
import NodeInput from "./node-input";

const NodeComponent = React.memo((props: NodeProps) => {

    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type]

    return <NodeCard nodeId={props.id} isSelected={props.selected}>
        <NodeHeader taskType={nodeData.type}/>
        <NodeInputs>
            {task.inputs.map((input, index) => <NodeInput input={input} key={index}/>)}
        </NodeInputs>
    </NodeCard>
}) 

export  default NodeComponent;
NodeComponent.displayName = "NodeComponent"