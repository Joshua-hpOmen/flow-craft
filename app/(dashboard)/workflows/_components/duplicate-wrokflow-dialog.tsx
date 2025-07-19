"use client"
import { duplicateWorkflow } from '@/actions/workflows/duplicateWorkflow'
import CustomDialogHeader from '@/components/global/custom-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { duplicateWorkflowSchema } from '@/schema/workflows'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from '@tanstack/react-query'
import { CopyIcon, Layers2Icon, Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"

type Props = {
    triggerText?: string,
    workflowId: string
} 

const DuplicateWorkflowDialog = (props : Props) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof duplicateWorkflowSchema>>({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        resolver: zodResolver(duplicateWorkflowSchema),
        defaultValues: {
            workflowId: props.workflowId
        }
    })

    const {mutate, isPending} = useMutation({ mutationFn: duplicateWorkflow, onSuccess: () => {

        toast.success("Workflow duplicated", {id: "duplicate-workflow"});
        setOpen(false)
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, onError: (e: any) => {
        
        if(e.digest.split("NEXT_REDIRECT").length > 1){
            toast.success("Workflow duplicated", {id: "duplicate-workflow"})
        }else{
            toast.error("Failed to duplicate workflow", {id: "duplicate-workflow"})
        }
        console.log(JSON.stringify(e, null, 4))
    } })

    const handleOnSubmit = React.useCallback((values: z.infer<typeof duplicateWorkflowSchema>) => {

        toast.loading("Duplicating workflow...", {id: "duplicate-workflow"});
        mutate(values)

    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => { form.reset(); setOpen(open) }}>

            <DialogTrigger asChild>

                <Button variant={"ghost"} size={"icon"} className={cn("ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100")}>
                    <CopyIcon className='w-4 h-4 text-muted-foreground cursor-pointer'/>
                </Button>

            </DialogTrigger>

            <DialogContent className='border-2 border-slate-200 rounded-md p-3'>
            
                <CustomDialogHeader icon={Layers2Icon} title="Duplicate workflow"/> 

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

export default DuplicateWorkflowDialog