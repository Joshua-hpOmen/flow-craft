"use client"
import { unpublishWorkFlow } from '@/actions/workflows/unpublish-workflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { DownloadIcon } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}
const UnpublishBtn = (props: Props) => {
  const mutation = useMutation({
    mutationFn: unpublishWorkFlow,
    onSuccess: () => { toast.success("Workflow unpublished", {id: "workflow-publishing"}) },
    onError: () => { toast.error("Something went wrong", {id: "workflow-publishing"}) }
  });

  return (
    <Button variant={"outline"} disabled={mutation.isPending} className='flex items-center gap-2' onClick={() => {
      

      toast.loading("Unpublishing workflow...", {id: "workflow-publishing"})
      mutation.mutate(props.workflowId)
    }}>
        <DownloadIcon size={16} className='stroke-orange-500'/> Unpublish
    </Button>
  )
}

export default UnpublishBtn