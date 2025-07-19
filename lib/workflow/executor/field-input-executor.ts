import { ExcecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/fill-input";

export const FillInputExecutor = async (env: ExcecutionEnvironment<typeof FillInputTask>): Promise<boolean> => {
    try {

        const selector = env.getInput("Selector");
        if(!selector) {
            env.log.error("input->selector not defined");
            return false
        }

        const value = env.getInput("Value");
        if(!value) {
            env.log.error("input->value not defined");
            return false
        }

        await env.getPage()!.type(selector, value)
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error.message);
        return false
    }
}