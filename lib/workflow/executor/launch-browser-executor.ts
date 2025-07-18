import { ExcecutionEnvironment } from "@/types/executor"
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "../task/launch-bowser"

export const LaunchBrowserExecutor = async (env: ExcecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> => {
    try {
        const websiteUrl = env.getInput("Website Url")
        const browser = await puppeteer.launch({
            headless: true //for testing purposes
        })

        env.log.info("Browser statrted successfully")
        env.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);

        if(!page) {env.log.error("Not valid page");return false}
        env.setPage(page)
        env.log.info(`Opened page at: ${websiteUrl}`)

        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}