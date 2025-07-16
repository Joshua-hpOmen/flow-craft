"use client"
import { updateWorkflow } from '@/actions/workflows/update-workflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}

const Savebtn = (props: Props) => {
    const { toObject } = useReactFlow()

    const saveMutation = useMutation({
        mutationFn: async ({id, definition}: {id: string, definition: string}) => {
            return await updateWorkflow({id, definition})
        },
        onSuccess: () => {
            toast.success("Flow saved", {id: "save-workflow"})
        },
        onError: () => {
            toast.error("Something went wrong", {id:  "save-workflow"})
        }
    })
  return (
    <Button className="flex items-center gap-2" variant="outline" onClick={() => {
        const workflowDeinition = JSON.stringify(toObject())
        toast.loading("Saving...", {id: "save-workflow"})
        saveMutation.mutate({ id: props.workflowId, definition: workflowDeinition })
    }}>
        <CheckIcon size={16} className='stroke-primary'/>Save
    </Button>
  )
}

export default Savebtn