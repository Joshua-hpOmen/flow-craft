import { LucideProps } from "lucide-react"
import { TaskParam, TaskType } from "./task"
import { AppNode } from "./app-node"

export enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED"
}

export type WorkflowTask = {
    label: string, 
    icon: React.FC<LucideProps>,
    isEntryPoint?: boolean,
    type: TaskType,
    inputs: TaskParam[],
    outputs: TaskParam[],
    credits: number
}

export type WorkflowExecutionPlanPhase = {
    phase: number,
    nodes: AppNode[]
}

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[]