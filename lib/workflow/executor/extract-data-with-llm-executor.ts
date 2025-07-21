import { ExcecutionEnvironment } from "@/types/executor"
import { ExtractDataWithLLMTask } from "../task/extract-data-with-llm"
import { db } from "@/lib/prisma"
import { symmetricDecrypt } from "@/lib/helper/encryption"
import { getGroqChatCompletion } from "@/lib/gork instance/grok-instance"

export const ExtractDataWithLLMExecutor = async (env: ExcecutionEnvironment<typeof ExtractDataWithLLMTask>): Promise<boolean> => {
    try {
        const credentials = env.getInput("Credentials")
        if(!credentials){
            env.log.error("input=>credentials not defined")
            return false
        }
        
        const prompt = env.getInput("Prompt")
        if(!prompt){
            env.log.error("input=>prompt not defined")
            return false
        }

        const content = env.getInput("Content")
        if(!content){
            env.log.error("input=>content not defined")
            return false
        }

        const credential = await db.credential.findUnique({where: {id: credentials}});
        if(!credential){
            env.log.error("credential not found")
            return false
        }

        const plainCredential = symmetricDecrypt(credential.value)
        if(!plainCredential){
            env.log.error("couldnt decrypt or find credential")
            return false
        }

        const response = await getGroqChatCompletion(content, prompt)
        if(!response) {
            env.log.error("Something went wrong. Prompt failed")
            return false
        }
        env.log.info(`Prompt tokens: ${response[1]}`)
        env.log.info(`Completion tokens: ${response[2]}`)

        const  result = response[0] as string
        env.setOutput("Extracted data", result)

        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}