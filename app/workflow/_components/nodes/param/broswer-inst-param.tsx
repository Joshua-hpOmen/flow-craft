"use client"
import { TaskParam } from '@/types/task'

type Props = {
    param: TaskParam,
    updateNodeParamValue: (value: string) => void
}

const BrowserInstParam = (props: Props) => {
  return (
    <p className='text-xs'>{props.param.name}</p>
  )
}

export default BrowserInstParam