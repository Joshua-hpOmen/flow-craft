"use client"
import { deleteCredential } from '@/actions/credentials/delete-credential'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { XIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    credentialName: string, 
}

const DeleteCredentialDialog = (props: Props) => {
    const [open, setOpen] = React.useState(false)
    const [confirmText, setConfirmText] = React.useState<string>("");

    const deleteMutation = useMutation({mutationFn: deleteCredential, onSuccess: () => {
        toast.success("Deleted credential", {id: "delete-credential"});
        setConfirmText("")
    }, onError: () => {
        toast.error("Failed to delete workflow", {id: "delete-credential"})
    }})

    const handleDelete = () => {
        toast.loading("Deleting workflow...", {id: "delete-credential"})
        deleteMutation.mutate(props.credentialName)
    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>

        <AlertDialogTrigger>

            <Button size={"icon"} variant={"destructive"} className='cursor-pointer'>
                <XIcon size={18} /> 
            </Button>

        </AlertDialogTrigger>

        <AlertDialogContent>

            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                    
                    If you delete this credential, you will not be able to recover it.
                    <div className='flex flex-col py-4 gap-2'>
                        <p>If you are sure, enter <b>{props.credentialName}</b> to confirm:</p>
                        <Input value={confirmText} onChange={e => setConfirmText(e.target.value)} onKeyDown={e => {
                            if(e.key === "Enter") handleDelete()
                        }}/>
                    </div>

                </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

                <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                
                <AlertDialogAction disabled={confirmText !== props.credentialName || deleteMutation.isPending} className='bg-destructive text-white hover:bg-destructive/90' 
                    onClick={e => {e.stopPropagation(); handleDelete()}}>
                    Delete
                </AlertDialogAction>

            </AlertDialogFooter>

        </AlertDialogContent>

    </AlertDialog>
  )
}

export default DeleteCredentialDialog