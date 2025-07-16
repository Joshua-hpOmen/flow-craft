import { Node } from "@xyflow/react";
import { TaskType } from "./task";


export interface AppNodeData {
    type: TaskType;
    input: Record<string, string>
    [key: string]: unknown;
}

export interface AppNode extends Node {
    data: AppNodeData;
}