import { ExtractPageFromElementTask } from "./extract-text-from-element";
import { LaunchBrowserTask } from "./launch-bowser";
import { PageToHTMLTask } from "./page-to-html";

export const TaskRegistry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHTMLTask,
    ETRACT_TEXT_FROM_ELEMENT: ExtractPageFromElementTask
}