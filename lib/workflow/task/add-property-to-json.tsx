import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { DatabaseIcon, LucideProps } from "lucide-react";

export const AddPropertyToJSONTask = {
    type: TaskType.ADD_PROPERTY_TO_JSON,
    label: "Add property to JSON",
    icon: (props: LucideProps) => <DatabaseIcon className="stroke-green-500" {...props}/>,
    isEntryPoint: false,
    inputs : [
        {
            name:  "JSON",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name:  "Property name",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name:  "Property value",
            type: TaskParamType.STRING,
            required: true
        },
    ] as const,
    outputs: [
        {
            name: "Update JSON",
            type: TaskParamType.STRING
        },
    ] as const,
    credits: 1
} satisfies WorkflowTask