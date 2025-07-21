import { getCredentialsForUser } from '@/actions/credentials/get-credentials-for-user';
import { Card } from '@/components/ui/card';
import { LockKeyholeIcon, ShieldOffIcon } from 'lucide-react';
import CreateCredentialDialog from './create-credential-dialog';
import { formatDistanceToNow } from 'date-fns';
import DeleteCredentialDialog from './delete-credential-dialog';


const UserCredentials = async () => {
    const credentials = await getCredentialsForUser();
    if(!credentials) return <div>
        Something went wrong.
    </div>

    if(credentials.length === 0) return (
        <Card className='w-full px-4'>

            <div className='flex flex-col gap-4 items-center justify-center'>

                <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                    <ShieldOffIcon  size={40} className='stroke-primary'/>
                </div>

                <div className='flex flex-col gap-1 text-center'>
                    <p className='text-bold'>No credentials created yet</p>
                    <p className='text-sm text-muted-foreground'>Click the button bellow to create your first credential</p>
                </div>

                <CreateCredentialDialog triggerText='Create your first credential'/>

            </div>

        </Card>
    )
  return (
    <div className='flex gap-2 flex-col'>
        {
            credentials.map(credential => {

                const createdAt = formatDistanceToNow(credential.createdAt, {addSuffix: true})

                return <Card key={credential.id} className='flex flex-row w-full p-4 justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <div className='rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center'>
                            <LockKeyholeIcon className='stroke-primary' size={18}/>
                        </div>
                        <div>
                            <p className='font-bold'>{credential.name}</p>
                            <p className='text-xs text-muted-foreground'>{createdAt}</p>
                        </div>
                    </div>

                    <DeleteCredentialDialog  credentialName={credential.name} />
                </Card>
            })
        }
    </div>
  )
}

export default UserCredentials