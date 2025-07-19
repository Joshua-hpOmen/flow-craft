import { ExcecutionEnvironment } from "@/types/executor"
import { CheckForElementTask } from "../task/check-for-element"

export const CheckForElementExecutor = async (env: ExcecutionEnvironment<typeof CheckForElementTask>): Promise<boolean> => {
    try {
        const selector = env.getInput("Selector")
        if(!selector){
            env.log.error("input=>selector not defined")
            return false
        }

        const visibilty = env.getInput("Visibility")
        if(!visibilty){
            env.log.error("input=>visibility not defined")
            return false
        }

        await env.getPage()!.waitForSelector(selector, {
            visible: visibilty === "visible",
            hidden: visibilty === "hidden",
            timeout: 30000
        })

        env.log.info("Element " + selector + " became " + visibilty)
        
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}