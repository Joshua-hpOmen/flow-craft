"use client"
import CustomDialogHeader from '@/components/global/custom-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { createWorkflowSchema } from '@/schema/workflows'
import { Layers2Icon, Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { createWorkFlow } from '@/actions/workflows/create-workflow'
import { toast } from 'sonner'

type Props = {
    triggerText?: string
} 

const CreateWorkflowDialog = (props : Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof createWorkflowSchema>>({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {}
    })

    const {mutate, isPending} = useMutation({ mutationFn: createWorkFlow, onSuccess: () => {

        toast.success("Workflow created", {id: "create-workflow"})

    }, onError: (e) => {
        
        toast.error("Failed to create workflow", {id: "create-workflow"})
        console.log(e)
    } })

    const handleOnSubmit = React.useCallback((values: z.infer<typeof createWorkflowSchema>) => {

        toast.loading("Creating workflow...", {id: "create-workflow"});
        mutate(values)

    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => { form.reset(); setOpen(open) }}>

            <DialogTrigger asChild>
                <Button>{props.triggerText ?? "Create Workflow"}</Button>
            </DialogTrigger>

            <DialogContent className='border-2 border-slate-200 rounded-md p-3'>
            
                <CustomDialogHeader icon={Layers2Icon} title="Create workflow" subtitle="Start building your workflows"/> 

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
                                        Choose a descriptive and unique name
                                    </FormDescription>

                                    <FormMessage/>
                                </FormItem>

                            )}/>

                            <FormField control={form.control} name="description" render={({field}) => (
                                
                                <FormItem>
                                    <FormLabel>
                                        Description <p className='text-xs text-muted-foreground'>(optional)</p>
                                    </FormLabel>

                                    <FormControl>
                                        <Textarea className='resize-none' {...field}/>                                        
                                    </FormControl>

                                    <FormDescription>
                                        Provide a brief description of what your wrokflow deos <br />
                                        This is optional but can help you remember the workflow&apos;s purpose
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

export default CreateWorkflowDialog