import { ExcecutionEnvironment } from "@/types/executor"
import * as cheerio from "cheerio"
import { ExtractPageFromElementTask } from "../task/extract-text-from-element"

export const ExtractPageFromElementExecutor = async (env: ExcecutionEnvironment<typeof ExtractPageFromElementTask>): Promise<boolean> => {
    try {
        const selector = env.getInput("Selector");
        if(!selector) {
            env.log.error("Selector not defined");
            return false;
        }
        const html = env.getInput("HTML")
        if(!html){
            env.log.error("HTML not defined");
            return false;
        }

        const $ = cheerio.load(html)
        const element = $(selector);
        if(!element) {
            env.log.error("Element not defined");
            return false
        }

        const extractedText = $.text(element);
        if(!extractedText){
            env.log.error("HTML has no text");
            return false
        }

        env.setOutput("Extracted text", extractedText)
        return true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        env.log.error(error.message);
        return false
    }
}