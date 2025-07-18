import { ExecutionPhaseStatus } from '@/types/workflow'
import { CircleCheckIcon, CircleDashedIcon, CircleXIcon, Loader2Icon } from 'lucide-react'

type Props = {
    status: ExecutionPhaseStatus 
}

const PhaseStatusBadge = (props: Props) => {
    switch (props.status) {
        case ExecutionPhaseStatus.PENDING:
            return <CircleDashedIcon size={20} className='stroke-muted-foreground'/>
        case ExecutionPhaseStatus.RUNNING:
            return <Loader2Icon size={20} className='animate-spin stroke-yellow-500'/>
        case ExecutionPhaseStatus.FAILED:
            return <CircleXIcon size={20} className='stroke-destructive'/>
        case ExecutionPhaseStatus.COMPLETED:
            return <CircleCheckIcon size={20} className='stroke-green-500'/>
        default:
            return <div className="rounded-full">{props.status}</div>
    }

}

export default PhaseStatusBadge