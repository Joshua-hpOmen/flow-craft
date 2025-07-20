"use client"
import { createCredential } from '@/actions/credentials/create-credential'
import CustomDialogHeader from '@/components/global/custom-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createCredentialSchema } from '@/schema/credentials'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from '@tanstack/react-query'
import { Loader2, ShieldEllipsis } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"

type Props = {
    triggerText?: string
} 

const CreateCredentialDialog = (props : Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof createCredentialSchema>>({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        resolver: zodResolver(createCredentialSchema),
        defaultValues: {}
    })

    const {mutate, isPending} = useMutation({ mutationFn: createCredential, onSuccess: () => {

        toast.success("Credential created", {id: "create-credential"})
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, onError: (e: any) => {
        
        if(e.digest.split("NEXT_REDIRECT").length > 1){
            toast.success("Credential created", {id: "create-credential"})
        }else{
            toast.error("Failed to create credential", {id: "create-credential"})
        }
        console.log(JSON.stringify(e, null, 4))
    } })

    const handleOnSubmit = React.useCallback((values: z.infer<typeof createCredentialSchema>) => {

        toast.loading("Creating credential...", {id: "create-credential"});
        mutate(values)

    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => { form.reset(); setOpen(open) }}>

            <DialogTrigger asChild>
                <Button>{props.triggerText ?? "Create"}</Button>
            </DialogTrigger>

            <DialogContent className='border-2 border-slate-200 rounded-md p-3'>
            
                <CustomDialogHeader icon={ShieldEllipsis} title="Create workflow"/> 

                <div className="p-6">

                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(handleOnSubmit)} className='space-y-8 w-full'>

                            <FormField control={form.control} name="name" render={({field}) => (
                                
                                <FormItem>
                                    <FormLabel>
                                        Name <p className='text-xs text-primary'>(required)</p>
                                    </FormLabel>

                                    <FormControl>
                                        <Input {...field}/>                                        
                                    </FormControl>

                                    <FormDescription>
                                        Enter a unique and descriptive name for the credential <br />
                                        This name will be used to idenetify the credential
                                    </FormDescription>

                                    <FormMessage/>
                                </FormItem>

                            )}/>

                            <FormField control={form.control} name="value" render={({field}) => (
                                
                                <FormItem>
                                    <FormLabel>
                                        Value <p className='text-xs text-primary'>(required)</p>
                                    </FormLabel>

                                    <FormControl>
                                        <Textarea className='resize-none' {...field}/>                                        
                                    </FormControl>

                                    <FormDescription>
                                        Enter the value associated to this credential <br />
                                        This value will be securley created and stored
                                    </FormDescription>

                                    <FormMessage/>
                                </FormItem>

                            )}/>

                            <Button type="submit" disabled={isPending}>
                                {!isPending ? "Proceed" : <Loader2 className='animate-spin'/>}
                            </Button>

                        </form>

                    </Form>

                </div>

            </DialogContent>

        </Dialog>
    )
}

export default CreateCredentialDialog
