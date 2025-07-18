"use client"
import { publishWorkFlow } from '@/actions/workflows/publish-workflow'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}
const PublishBtn = (props: Props) => {
  const {toObject} = useReactFlow();
  const generate = useExecutionPlan();
  const mutation = useMutation({
    mutationFn: publishWorkFlow,
    onSuccess: () => { toast.success("Workflow published", {id: "workflow-publishing"}) },
    onError: () => { toast.error("Something went wrong", {id: "workflow-publishing"}) }
  });

  return (
    <Button variant={"outline"} disabled={mutation.isPending} className='flex items-center gap-2' onClick={() => {
      const plan = generate();
      if(!plan) return;

      toast.loading("Publishing workflow...", {id: "workflow-publishing"})
      mutation.mutate({ id: props.workflowId, flowDefinition: JSON.stringify(toObject())})
    }}>
        <Upload size={16} className='stroke-green-700'/> Publish
    </Button>
  )
}

export default PublishBtn