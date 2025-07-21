import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, TextSearchIcon } from "lucide-react";

export const ReadPropertiesFromJSONTask = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    label: "Read property from JSON",
    icon: (props: LucideProps) => <TextSearchIcon className="stroke-green-500" {...props}/>,
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
    ] as const,
    outputs: [
        {
            name: "Property Value",
            type: TaskParamType.STRING
        },
    ] as const,
    credits: 1
} satisfies WorkflowTask