import { waitFor } from "@/lib/helper/wait-for"
import { ExcecutionEnvironment } from "@/types/executor"
import puppeteer from "puppeteer"
import { ExtractPageFromElementTask } from "../task/extract-text-from-element"
import * as cheerio from "cheerio"

export const ExtractPageFromElementExecutor = async (env: ExcecutionEnvironment<typeof ExtractPageFromElementTask>): Promise<boolean> => {
    try {
        const selector = env.getInput("Selector");
        if(!selector) return false;
        const html = env.getInput("HTML")
        if(!html) return false;

        const $ = cheerio.load(html)
        const element = $(selector);
        if(!element) {
            console.error("Element not found");
            return false
        }

        const extractedText = $.text(element);
        if(!extractedText){
            console.error("element has no text");
            return false
        }

        env.setOutput("Extracted text", extractedText)

        const browser = await puppeteer.launch({
            headless: false //for testing purposes
        })

        await waitFor(3000)
        await browser.close()
        return true
    } catch (error) {
        console.error(error);
        return false
    }
}