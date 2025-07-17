import { getWorkfloExecutionWithPhases } from "@/actions/workflows/get-workflow-execution-with-phases"
import ExecutionViewer from "./execution-viewer"

type Props = {
    executionId: string
}

const ExecutionViewerWrapper = async (props: Props) => {
    const workflowExecution = await getWorkfloExecutionWithPhases(props.executionId)
    if(!workflowExecution) return <div>Not found</div>
  return (
    <ExecutionViewer execution={workflowExecution}/>
  )
}

export default ExecutionViewerWrapper