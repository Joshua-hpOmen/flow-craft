import { TaskType } from "@/types/task";
import { ExtractPageFromElementTask } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-bowser";
import { PageToHTMLTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow";

type Registry = {
    [K in TaskType] : WorkflowTask & {type: K}
}

export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHTMLTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractPageFromElementTask
};