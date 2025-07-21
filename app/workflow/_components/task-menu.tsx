"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { TaskType } from '@/types/task'
import React from 'react'
import TaskMenuBtn from './task-menu-btn'
import { Menu, X } from 'lucide-react'

const TaskMenu = () => {
    const [open, setOpen] = React.useState(true)
  return (
    open ? <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto transition-all'>
        <div className='text-muted-foreground w-full flex justify-end'>
            <X size={16} onClick={() => setOpen(false)}/>
        </div>

        <Accordion type="multiple" className='w-full' defaultValue={["extraction", "interactions", "timing", "results"]}>

            <AccordionItem value="extraction">

                <AccordionTrigger className='font-bold'>Data extraction</AccordionTrigger>

                <AccordionContent className='flex flex-col gap-2'>
                    <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML}/>
                    <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT}/>
                    <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_LLM}/>
                </AccordionContent>

            </AccordionItem>

            <AccordionItem value="interactions">

                <AccordionTrigger className='font-bold'>User interactions</AccordionTrigger>

                <AccordionContent className='flex flex-col gap-2'>
                    <TaskMenuBtn taskType={TaskType.FILL_INPUT}/>
                    <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT}/>
                </AccordionContent>

            </AccordionItem>


            <AccordionItem value="timing">

                <AccordionTrigger className='font-bold'>TIming controls</AccordionTrigger>

                <AccordionContent className='flex flex-col gap-2'>
                    <TaskMenuBtn taskType={TaskType.CHECK_FOR_ELEMENT}/>
                </AccordionContent>

            </AccordionItem>

            <AccordionItem value="results">

                <AccordionTrigger className='font-bold'>Result Delivery</AccordionTrigger>

                <AccordionContent className='flex flex-col gap-2'>
                    <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK}/>
                </AccordionContent>

            </AccordionItem>




        </Accordion>
    </aside> : <div className='fixed top-2 left-2 p-2 backdrop-blur-xl rounded-md z-50'>
        <Menu onClick={() => setOpen(true)}/>
    </div>
  )
}

export default TaskMenu