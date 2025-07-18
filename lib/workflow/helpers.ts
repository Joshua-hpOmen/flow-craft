import { AppNode } from "@/types/app-node";
import { TaskType } from "@/types/task";
import { TaskRegistry } from "./task/registry";

export const calculateWorkflowCost = (node: AppNode[]) => {
    return node.reduce((accumVal, node) => {
        return accumVal + (TaskRegistry[node.data.type as TaskType].credits)
    }, 0)
}