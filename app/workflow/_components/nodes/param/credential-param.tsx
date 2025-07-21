import { getCredentialsForUser } from '@/actions/credentials/get-credentials-for-user'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TaskParam } from '@/types/task'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {
    param: TaskParam,
    updateNodeParamValue : (newVal : string) => void,
    value: string
}

const CredentialParam = (props: Props) => {
    const id = React.useId();
    const query = useQuery({
        queryKey: ["credentials-for-user"],
        queryFn:  getCredentialsForUser,
        refetchInterval: 10 * 1000
    })

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
                    <SelectLabel>Credentials</SelectLabel>
                    {query.data?.map(cred => (
                        <SelectItem key={cred.id} value={cred.id}>{cred.name}</SelectItem>
                    ))}
                </SelectGroup>

            </SelectContent>

        </Select>
    </div>
  )
}

export default CredentialParam