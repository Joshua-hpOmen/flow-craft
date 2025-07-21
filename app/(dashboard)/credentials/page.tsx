import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ShieldIcon } from 'lucide-react'
import React from 'react'
import UserCredentials from './_components/user-credentials'
import { Skeleton } from '@/components/ui/skeleton'
import CreateCredentialDialog from './_components/create-credential-dialog'


const page = () => {
  return (
    <div className='flex flex-1 flex-col h-full'>

        <div className='flex justify-between items-center'>

            <div className='flex flex-col'>
                <h1 className='text-3xl font-bold'>Credentials</h1>
                <p className='text-muted-foreground'>Manage your credentials</p>
            </div>
            <CreateCredentialDialog />

        </div>

        <div className='h-full py-6 space-y-8'>
            
            <Alert>
                <ShieldIcon className='h-4 w-4 stroke-primary'/>
                <AlertTitle className='text-primary'>Encryption</AlertTitle>
                <AlertDescription>All information is securley encrypted, ensuring your data remains safe</AlertDescription>
            </Alert>

            <React.Suspense fallback={<Skeleton className='h-[300px] w-full'/>}>
                <UserCredentials/>
            </React.Suspense>
        </div>

    </div>
  )
}

export default page