import { getCredentialsForUser } from '@/actions/credentials/get-credentials-for-user';
import { Card } from '@/components/ui/card';
import { ShieldOffIcon } from 'lucide-react';
import CreateCredentialDialog from './create-credential-dialog';


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
    <div>UserCredentials</div>
  )
}

export default UserCredentials