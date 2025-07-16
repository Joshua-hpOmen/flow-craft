import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHTMLTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get html from page",
    icon: (props: LucideProps) => <CodeIcon className="stroke-yellow-500" {...props}/>,
    isEntryPoint: false,
    inputs : [
        {
            name:  "Website page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }
    ],
    outputs: [
        {
            name: "HTML",
            type: TaskParamType.STRING
        },
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ]
}