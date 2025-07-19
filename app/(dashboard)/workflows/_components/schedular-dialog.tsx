"use client"
import { updateWorkflowCron } from '@/actions/workflows/update-workflow-cron'
import CustomDialogHeader from '@/components/global/custom-dialog-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import cronstrue from "cronstrue"
import { isValid } from 'date-fns'
import { removeWorkflowSchedule } from '@/actions/workflows/remove-workflow-schedule'
import { Separator } from '@/components/ui/separator'

type Props = {
  workflowId: string,
  cron: string | null
}

const SchedularDialog = (props: Props) => {
  const [cron, setCron] = React.useState(props.cron || "")
  const [validCron, setValidCron]= React.useState(false);
  const [readableCron, setReadableCron] = React.useState("");
  const [mounted, setMounted] = React.useState(false)

  const mutation = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success("Schedule updated successfully", {id: "set-cron"})
    },
    onError: () => {
      toast.error("Something went wrong", {id: "set-cron"})
    }
  })

  const deleteScheduleMutation = useMutation({
    mutationFn: removeWorkflowSchedule,
    onSuccess: () => {
      toast.success("Schedule removed successfully", {id: "delete-cron"})
    },
    onError: () => {
      toast.error("Something went wrong", {id: "delete-cron"})
    }
  })

  React.useEffect(() => {
    const validateCron = () => {

      try {
        
        const humanCronStr = cronstrue.toString(cron);
        setValidCron(true);
        setReadableCron(humanCronStr)

      } catch {
        setValidCron(false)
      }

    }

    validateCron()
  }, [cron])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return

  return (
    <Dialog>

      <DialogTrigger asChild>

        <Button variant={"link"} size={"sm"} className={cn("text-sm p-0 h-auto text-green-600", !validCron && "text-orange-500")}>

          {validCron ? <div className='flex gap-2 items-center'>
                <ClockIcon/>{readableCron}
            </div> : <div className='flex items-center gap-1'>
              <TriangleAlertIcon className='h-3 w-3'/> Set schedule
          </div>}

        </Button>

      </DialogTrigger>

      <DialogContent>

        <CustomDialogHeader title='Schedule workflow execution' icon={CalendarIcon}/>

        <div className='p-6 space-y-4'>

          <p className="text-muted-foreground text-sm">Speciy a cron expression to schedule a periodic workflow execution. All times are in UTC</p>
          <Input placeholder='e.g. * * * * *' value={cron} onChange={(e) => setCron(e.target.value)}/>
          <div className={cn("bg-accent rounded-md p-4 border text-sm border-primary text-primary", !validCron && "border-destructive text-destructive")}>{validCron ? readableCron : "Not a valid cron expression"}</div>

          {validCron && <DialogClose>
              <div className=''>

                <Button className='w-full text-destructive border border-destructive hover:text-destructive' variant={'outline'} 
                  disabled={deleteScheduleMutation.isPending || mutation.isPending} onClick={() => {
                    toast.loading("Removing toast..", {id: "delete-cron"});
                    deleteScheduleMutation.mutate(props.workflowId)
                    setCron("")
                  }}>
                  Remove current schedule
                </Button>

              </div>

              <Separator className='my-4'/>

          </DialogClose>}

        </div>

        <DialogFooter>

          <DialogClose >

            <Button className='w-full' variant={"secondary"}>
              Cancel
            </Button>

          </DialogClose>

          <DialogClose >
            
            <Button className='w-full' onClick={() => {
                toast.loading("Saving..", {id: "set-cron"})
                mutation.mutate({id: props.workflowId,cron})
              }} disabled={mutation.isPending || !isValid}>
              Save
            </Button>

          </DialogClose>

        </DialogFooter>

      </DialogContent>


    </Dialog>
  )
}

export default SchedularDialog