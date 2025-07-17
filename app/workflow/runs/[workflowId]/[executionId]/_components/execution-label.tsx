import { LucideIcon } from 'lucide-react'
import React from 'react'

type Props = {
    icon: LucideIcon,
    label: React.ReactNode
    value: React.ReactNode
}

const ExecutionLabel = (props: Props) => {
  return (
    <div className='flex justify-between items-center py-2 px-4 text-sm'>

        <div className="text-muted-foreground flex items-center gap-2">
            <props.icon size={20} className='stroke-muted-foreground/80'/>
            <span>{props.label}</span>
        </div>

        <div className="font-semibold capitalize flex gap-2 items-center">
            {props.value}
        </div>

    </div>
  )
}

export default ExecutionLabel