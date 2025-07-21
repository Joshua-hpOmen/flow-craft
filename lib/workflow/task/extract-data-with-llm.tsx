import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainIcon, LucideProps } from "lucide-react";

export const ExtractDataWithLLMTask = {
    type: TaskType.EXTRACT_DATA_WITH_LLM,
    label: "Extract data with an LLM",
    icon: (props: LucideProps) => <BrainIcon className="stroke-yellow-500" {...props}/>,
    isEntryPoint: false,
    inputs : [
        {
            name:  "Content",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name:  "Credentials",
            type: TaskParamType.CREDENTIAL,
            required: true,
        },
        {
            name:  "Prompt",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea"
        },
    ] as const,
    outputs: [
        {
            name: "Extracted data",
            type: TaskParamType.STRING
        },
    ] as const,
    credits: 4
} satisfies WorkflowTask