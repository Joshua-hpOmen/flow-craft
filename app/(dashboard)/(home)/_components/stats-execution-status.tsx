import { getWorkflowExecutionStats } from '@/actions/analytics/get-workflow-execution-status'
import { Period } from '@/types/analytics'
import React from 'react'
import ExecutionStatusChart from './execution-status-chart'

type Props = {
    selectedPeriod: Period
}

const StatsExecutionStatus = async (props: Props) => {
    const data = await getWorkflowExecutionStats(props.selectedPeriod)
  return (
    <ExecutionStatusChart data={data}/>
  )
}

export default StatsExecutionStatus