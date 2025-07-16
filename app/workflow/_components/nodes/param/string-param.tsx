"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TaskParam } from '@/types/task'
import React  from 'react'

type Props = {
    param: TaskParam,
    value: string,
    updateNodeParamValue: (newValue: string) => void,
    disabled: boolean
}

const StringParam = (props: Props) => {
    const [internalVal, setInternalVal] = React.useState(props.value)
    const id = React.useId();

    React.useEffect(() => {
        setInternalVal(props.value)
    }, [props.value])

    let Component : React.FC<any> = Input;
    if(props.param.variant === "textarea"){ Component = Textarea}
  return (
    <div  className='space-y-1 p-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>
            {props.param.name}
            {props.param.required && <p className='text-red-800'>*</p>}
        </Label>
        <Component id={id} className='bg-white' disabled={props.disabled} value={internalVal} onChange={e => setInternalVal(e.target.value)}
            onBlur={() => props.updateNodeParamValue(internalVal)} placeholder='Enter value here'/>

        {props.param.helperText && <p className='text-muted-foreground px-2 text-xs'>{props.param.helperText}</p>}
    </div>
  )
}

export default StringParam