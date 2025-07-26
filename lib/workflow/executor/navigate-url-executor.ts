import { ExcecutionEnvironment } from "@/types/executor"
import { NavigateURLTask } from "../task/navigate-url"

export const NavigateURlExecutor = async (env: ExcecutionEnvironment<typeof NavigateURLTask>): Promise<boolean> => {
    try {
        const url = env.getInput("URL")
        if(!url){
            env.log.error("input=>URL not defined")
            return false
        }

        await env.getPage()!.goto(url)
        env.log.info("Visited url: " + url)
        
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}