import { ExcecutionEnvironment } from "@/types/executor"
import { PageToHTMLTask } from "../task/page-to-html"

export const PageToHTMLExecutor = async (env: ExcecutionEnvironment<typeof PageToHTMLTask>): Promise<boolean> => {
    try {
        const html = await env.getPage()!.content();
        env.setOutput("HTML", html)

        return true
    } catch (error) {
        console.error(error);
        return false
    }
}