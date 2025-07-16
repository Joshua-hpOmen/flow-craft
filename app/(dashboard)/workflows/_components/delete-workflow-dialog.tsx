"use client"
import { deleteWorkflow } from '@/actions/workflows/delete-workflow'
import { AlertDialog,  AlertDialogAction,  AlertDialogCancel,  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    workflowname: string, 
    workflowId: string
}

const DeleteWorkflowDialog = (props: Props) => {
    const [confirmText, setConfirmText] = React.useState<string>("");

    const deleteMutation = useMutation({mutationFn: deleteWorkflow, onSuccess: () => {
        toast.success("Deleted workflow", {id: "delete-workflow"});
        setConfirmText("")
    }, onError: () => {
        toast.error("Failed to delete workflow", {id: "delete-workflow"})
    }})

    const handleDelete = () => {
        toast.loading("Deleting workflow...", {id: "delete-workflow"})
        deleteMutation.mutate(props.workflowId)
    }

  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>

        <AlertDialogContent>

            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                    
                    If you delete this workflow, you will not be able to recover it.
                    <div className='flex flex-col py-4 gap-2'>
                        <p>If you are sure, enter <b>{props.workflowname}</b> to confirm:</p>
                        <Input value={confirmText} onChange={e => setConfirmText(e.target.value)} onKeyDown={e => {
                            if(e.key === "Enter") handleDelete()
                        }}/>
                    </div>

                </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

                <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                
                <AlertDialogAction disabled={confirmText !== props.workflowname || deleteMutation.isPending} className='bg-destructive text-white hover:bg-destructive/90' 
                    onClick={e => {e.stopPropagation(); handleDelete()}}>
                    Delete
                </AlertDialogAction>

            </AlertDialogFooter>

        </AlertDialogContent>

    </AlertDialog>
  )
}

export default DeleteWorkflowDialog