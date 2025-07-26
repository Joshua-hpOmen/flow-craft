import { getPeriods } from '@/actions/analytics/get-periods';
import React from 'react'
import PeriodSelector from './period-selector';
import { Period } from '@/types/analytics';

type Props = {
    selectedPeriod: Period
}

const PeriodSelectorWrapper = async (props: Props) => {
    const periods = await getPeriods();
  return (
    <div>
        <PeriodSelector selectedPeriod={props.selectedPeriod} periods={periods}/>
    </div>
  )
}

export default PeriodSelectorWrapper