import { NodeProps } from "@xyflow/react";
import React from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { AppNodeData } from "@/types/app-node";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs from "./node-inputs";
import NodeInput from "./node-input";
import NodeOutputs from "./node-outputs";
import NodeOutput from "./node-output";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";
const NodeComponent = React.memo((props: NodeProps) => {

    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type]

    return <NodeCard nodeId={props.id} isSelected={props.selected}>
        {DEV_MODE && <Badge>DEV: {props.id}</Badge>}
        <NodeHeader taskType={nodeData.type} nodeId={props.id}/>
        <NodeInputs>
            {task.inputs.map((input, index) => <NodeInput nodeId={props.id} input={input} key={index}/>)}
        </NodeInputs>
        <NodeOutputs>
            {task.outputs.map((output, index) => <NodeOutput nodeId={props.id} output={output} key={index}/>)}
        </NodeOutputs>
    </NodeCard>
}) 

export  default NodeComponent;
NodeComponent.displayName = "NodeComponent"