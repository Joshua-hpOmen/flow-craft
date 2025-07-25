import { ExcecutionEnvironment } from "@/types/executor"
import { AddPropertyToJSONTask } from "../task/add-property-to-json"

export const AddPropertyToJSONExecutor = async (env: ExcecutionEnvironment<typeof AddPropertyToJSONTask>): Promise<boolean> => {
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

        const propertyValue = env.getInput("Property value")
        if(!propertyValue){
            env.log.error("input=>propertyValue not defined")
            return false
        }

        const jsonData = JSON.parse(json)
        jsonData[propertyName] = propertyValue;

        env.setOutput("Update JSON", jsonData)

        
        return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        env.log.error(error);
        return false
    }
}