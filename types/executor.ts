import { Browser, Page } from "puppeteer"
import { WorkflowTask } from "./workflow"
import { LogCollector } from "./log"

export type Environment = {

    broswer?: Browser
    page?: Page

    phases: Record<string, {
        inputs: Record<string, string>,
        outputs: Record<string, string>,
    }>

}

export type ExcecutionEnvironment<T extends WorkflowTask> = {
    getInput: (name: T["inputs"][number]["name"]) => string,
    setOutput: (name: T["outputs"][number]["name"], value: string) => void

    getBrowser: () => (Browser | undefined ),
    setBrowser: (broswer: Browser) => void,
    getPage: () => Page | undefined,
    setPage: (page: Page) => void,

    log: LogCollector
}