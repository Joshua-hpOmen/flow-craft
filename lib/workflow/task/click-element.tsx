import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, MousePointerClickIcon } from "lucide-react";

export const ClickElementTask = {
    type: TaskType.CLICK_ELEMENT,
    label: "Click element",
    icon: (props: LucideProps) => <MousePointerClickIcon className="stroke-green-500" {...props}/>,
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
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE
        },
    ] as const,
    credits: 1
} satisfies WorkflowTask