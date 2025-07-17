import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractPageFromElementTask = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Extract text from element",
    icon: (props: LucideProps) => <TextIcon className="stroke-yellow-500" {...props}/>,
    isEntryPoint: false,
    inputs : [
        {
            name:  "HTML",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea"
        },
        {
            name:  "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Extracted text",
            type: TaskParamType.STRING
        },
    ] as const,
    credits: 2
} satisfies WorkflowTask