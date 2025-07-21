import { TaskType } from "@/types/task";
import { ExtractPageFromElementTask } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-bowser";
import { PageToHTMLTask } from "./page-to-html";
import { WorkflowTask } from "@/types/workflow";
import { FillInputTask } from "./fill-input";
import { ClickElementTask } from "./click-element";
import { CheckForElementTask } from "./check-for-element";
import { DeliverViaWebhookTask } from "./deliver_via_webhook";
import { ExtractDataWithLLMTask } from "./extract-data-with-llm";

type Registry = {
    [K in TaskType] : WorkflowTask & {type: K}
}

export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHTMLTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractPageFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    CHECK_FOR_ELEMENT: CheckForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
    EXTRACT_DATA_WITH_LLM: ExtractDataWithLLMTask
};