import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import { CoinsIcon } from 'lucide-react'
import React from 'react'

type Props = {
    taskType: TaskType
}

const TaskMenuBtn = (props: Props) => {
    const taskInst = TaskRegistry[props.taskType]

    const ondragstart = (e: React.DragEvent, type: TaskType) => {
        e.dataTransfer.setData("application/reactflow", type)
        e.dataTransfer.effectAllowed = "move";
    }

  return (
    <Button draggable onDragStart={e => ondragstart(e, props.taskType)} variant={"secondary"} className='flex justify-between items-center gap-2 border w-full'>
        <div className='flex gap-2'>
            <taskInst.icon size={20}/>{taskInst.label}
        </div>
        <Badge variant={"outline"} className='gap-2 flex items-center'>
            <CoinsIcon size={16}/>
            {taskInst.credits}
        </Badge>
    </Button>
  )
}

export default TaskMenuBtn