import { getSelectedPeriodData } from '@/actions/analytics/get-selected-period-data'
import { Period } from '@/types/analytics'
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react'
import { StatsCard } from './stats-card'

type Props = {
    selectedPeriod: Period
}

const StatsCards = async (props: Props) => {

    const dataForPeriod = await getSelectedPeriodData(props.selectedPeriod);

  return (
    <div className='grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]'>
        <StatsCard title="Workflow execution" value={dataForPeriod.workflowExecutions} icon={CirclePlayIcon}/>
        <StatsCard title="Phase executions" value={dataForPeriod.phaseExecutions} icon={WaypointsIcon}/>
        <StatsCard title="Credits Consumber" value={dataForPeriod.creditsConsumed} icon={CoinsIcon}/>
    </div>
  )
}

export default StatsCards