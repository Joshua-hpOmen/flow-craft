import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHTMLExecutor } from "./page-to-html-executor";
import { ExcecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { ExtractPageFromElementExecutor } from "./extract-text-from-element-executor";

type ExecutorFn<T extends WorkflowTask> = (env: ExcecutionEnvironment<T>) => Promise<boolean>

type RegistoryType = {
    [K in TaskType] : ExecutorFn<WorkflowTask & { type : K }>
}

export const ExecuterRegistry: RegistoryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHTMLExecutor,
    EXTRACT_TEXT_FROM_ELEMENT:  ExtractPageFromElementExecutor
}