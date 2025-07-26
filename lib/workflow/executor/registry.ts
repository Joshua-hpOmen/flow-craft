import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHTMLExecutor } from "./page-to-html-executor";
import { ExcecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { ExtractPageFromElementExecutor } from "./extract-text-from-element-executor";
import { FillInputExecutor } from "./field-input-executor";
import { ClickElementExecutor } from "./click-element-executor";
import { CheckForElementExecutor } from "./check-for-element-executor";
import { DeliverViaWebhookExecutor } from "./delivery-via-webhook-executor";
import { ExtractDataWithLLMExecutor } from "./extract-data-with-llm-executor";
import { ReadPropertiesFromJSONExecutor } from "./read-properties-from-json-executor";
import { AddPropertyToJSONExecutor } from "./add-property-to-json-executor";
import { NavigateURlExecutor } from "./navigate-url-executor";
import { ScrollToElementExecutor } from "./scroll-to-element-executor";

type ExecutorFn<T extends WorkflowTask> = (env: ExcecutionEnvironment<T>) => Promise<boolean>

type RegistoryType = {
    [K in TaskType] : ExecutorFn<WorkflowTask & { type : K }>
}

export const ExecuterRegistry: RegistoryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHTMLExecutor,
    EXTRACT_TEXT_FROM_ELEMENT:  ExtractPageFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,
    CHECK_FOR_ELEMENT: CheckForElementExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_LLM: ExtractDataWithLLMExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertiesFromJSONExecutor,
    ADD_PROPERTY_TO_JSON: AddPropertyToJSONExecutor,
    NAVIGATE_URL: NavigateURlExecutor,
    SCROLL_TO_ELEMENT: ScrollToElementExecutor
}