import { getCreditsUsageInPeriod } from '@/actions/analytics/get-credits-usage-in-period'
import { Period } from '@/types/analytics'
import React from 'react'
import CreditsUsageChart from './credits-usage-charts'

type Props = {
    selectedPeriod: Period
}

const CreditsUsageInPeriod = async (props: Props) => {
    const data = await getCreditsUsageInPeriod(props.selectedPeriod)
  return (
    <CreditsUsageChart data={data} title="Daily credits spent" description="Daily credit consumed in selected period"/>
  )
}

export default CreditsUsageInPeriod