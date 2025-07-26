import { ExcecutionEnvironment } from "@/types/executor"
import { ScrollToElementTask } from "../task/scroll-element"

export const ScrollToElementExecutor = async (env: ExcecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> => {
    try {
        const selector = env.getInput("Selector")
        if(!selector){
            env.log.error("input=>selector not defined")
            return false
        }

        await env.getPage()!.evaluate(selector => {

            const selectedElement = document.querySelector(selector);
            if(!selectedElement) throw new Error("Element not found");

            const top = selectedElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({top})

        }, selector)

        env.log.info("")
        
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}