import { AppNode } from "@/types/app-node"
import { TaskType } from "@/types/task"

export const createFlowNode = (nodeType: TaskType, postion?: {x:number, y:number}) : AppNode => {
    return {
        id: crypto.randomUUID(),
        type: "FlowScrapeNode",
        dragHandle: ".drag-handle",
        data: {
            type: nodeType,
            input: {}
        },
        position: postion ?? {x : 0, y: 0}
    }
}