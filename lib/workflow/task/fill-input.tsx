import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Edit3Icon, LucideProps } from "lucide-react";

export const FillInputTask = {
    type: TaskType.FILL_INPUT,
    label: "Fill input",
    icon: (props: LucideProps) => <Edit3Icon className="stroke-green-500" {...props}/>,
    isEntryPoint: false,
    inputs : [
        {
            name:  "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name:  "Selector",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name:  "Value",
            type: TaskParamType.STRING,
            required: true,
        },

    ]as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ]as const,
    credits: 1
} satisfies WorkflowTask