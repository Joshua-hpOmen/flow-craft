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
import { ReadPropertiesFromJSONTask } from "./read-properties-from-json";
import { AddPropertyToJSONTask } from "./add-property-to-json";
import { NavigateURLTask } from "./navigate-url";
import { ScrollToElementTask } from "./scroll-element";

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
    EXTRACT_DATA_WITH_LLM: ExtractDataWithLLMTask,
    READ_PROPERTY_FROM_JSON: ReadPropertiesFromJSONTask,
    ADD_PROPERTY_TO_JSON: AddPropertyToJSONTask,
    NAVIGATE_URL: NavigateURLTask,
    SCROLL_TO_ELEMENT: ScrollToElementTask
};