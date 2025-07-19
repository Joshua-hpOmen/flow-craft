import { ExcecutionEnvironment } from "@/types/executor"
import { ClickElementTask } from "../task/click-element"

export const ClickElementExecutor = async (env: ExcecutionEnvironment<typeof ClickElementTask>): Promise<boolean> => {
    try {
        const selector = env.getInput("Selector")
        if(!selector){
            env.log.error("input=>selector not defined")
            return false
        }

        await env.getPage()!.click(selector)
        
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}