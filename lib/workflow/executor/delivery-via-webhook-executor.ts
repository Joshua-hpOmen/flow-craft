import { ExcecutionEnvironment } from "@/types/executor"
import { DeliverViaWebhookTask } from "../task/deliver_via_webhook"

export const DeliverViaWebhookExecutor = async (env: ExcecutionEnvironment<typeof DeliverViaWebhookTask>): Promise<boolean> => {
    try {

        const targertURL = env.getInput("Target URL");
        if(!targertURL){
            env.log.error("input=>targetURL not defined");
            return false
        }

        const body = env.getInput("Body");
        if(!body){
            env.log.error("input=>body not defined");
            return false
        }


        const response  = await fetch(targertURL, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(body)
        });

        if(response.status !== 200){
            env.log.error("status code " + response.status)
            return false
        }

        const responseBody = await response.json();
        env.log.info(JSON.stringify(responseBody))

        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}