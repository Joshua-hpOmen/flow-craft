import { ExcecutionEnvironment } from "@/types/executor"
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "../task/launch-bowser"

export const LaunchBrowserExecutor = async (env: ExcecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> => {
    try {
        const websiteUrl = env.getInput("Website Url")
        const browser = await puppeteer.launch({
            headless: true //for testing purposes
        })
        env.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);

        env.setPage(page)
        return true
    } catch (error) {
        console.error(error);
        return false
    }
}