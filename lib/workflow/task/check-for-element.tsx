import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { EyeIcon, LucideProps } from "lucide-react";

export const CheckForElementTask = {
    type: TaskType.CHECK_FOR_ELEMENT,
    label: "Check for element",
    icon: (props: LucideProps) => <EyeIcon className="stroke-amber-500" {...props}/>,
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
            name:  "Visibility",
            type: TaskParamType.SELECT,
            required: true,
            options: [
                {label: "Visible", value: "visible"},
                {label: "Hidden", value: "hidden"}
            ],
            hideHandle: true
        },
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE
        },
    ] as const,
    credits: 1
} satisfies WorkflowTask