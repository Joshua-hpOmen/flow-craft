import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TaskParam } from '@/types/task'
import React from 'react'

type Props = {
    param: TaskParam,
    updateNodeParamValue : (newVal : string) => void,
    value: string
}

type OptType = {
    label: string,
    value: string
}

const SelectParam = (props: Props) => {
    const id = React.useId();

  return (
    <div className='flex flex-col gap-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>
            {props.param.name}
            {props.param.required && <p className='text-red-800'>*</p>}
        </Label>

        <Select onValueChange={value => props.updateNodeParamValue(value)} defaultValue={props.value}>

            <SelectTrigger className='w-full bg-background'>
                <SelectValue placeholder="Select an option"/>
            </SelectTrigger>

            <SelectContent className='w-full'>

                <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    {
                        props.param.options.map((opt : OptType) => (
                            <SelectItem key={opt.label} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        )) 
                    }
                </SelectGroup>

            </SelectContent>

        </Select>
    </div>
  )
}

export default SelectParam