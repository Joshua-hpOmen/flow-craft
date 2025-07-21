import { ExcecutionEnvironment } from "@/types/executor"
import { ReadPropertiesFromJSONTask } from "../task/read-properties-from-json"

export const ReadPropertiesFromJSONExecutor = async (env: ExcecutionEnvironment<typeof ReadPropertiesFromJSONTask>): Promise<boolean> => {
    try {
        const json = env.getInput("JSON")
        if(!json){
            env.log.error("input=>json not defined")
            return false
        }

        const propertyName = env.getInput("Property name")
        if(!propertyName){
            env.log.error("input=>propertyName not defined")
            return false
        }

        const jsonData = JSON.parse(json)
        const outputVal = jsonData[propertyName]
        if(!outputVal){
            env.log.error("Property doesnt exist on the provided JSON")
            return false
        }

        env.setOutput("Property Value", outputVal)        
        
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}