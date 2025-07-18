import { ExcecutionEnvironment } from "@/types/executor"
import { PageToHTMLTask } from "../task/page-to-html"

export const PageToHTMLExecutor = async (env: ExcecutionEnvironment<typeof PageToHTMLTask>): Promise<boolean> => {
    try {
        const html = await env.getPage()!.content();
        env.setOutput("HTML", html)

        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error.message);
        return false
    }
}