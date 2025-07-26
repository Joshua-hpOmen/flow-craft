"use client"
import { getCreditsUsageInPeriod } from '@/actions/analytics/get-credits-usage-in-period'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { ChartColumnStackedIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

type Props = {
    data: Awaited<ReturnType<typeof getCreditsUsageInPeriod>>,
    title: string,
    description: string
}

const chartConfig = {
    success : {
        label: "Successfull Phase Credits",
        color: "green"
    },
    failed : {
        label: "Failed Phases Credits",
        color: "var(--chart-1)"
    },
}


const CreditsUsageChart = (props: Props) => {
  return (
    <Card>
        <CardHeader>

            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                <ChartColumnStackedIcon className='w-6 h-6 text-primary'/>
                {props.title}
            </CardTitle>

            <CardDescription>
                {props.description}
            </CardDescription>

        </CardHeader>

        <CardContent>

            <ChartContainer className='max-h-[200px] w-full' config={chartConfig}>

                <BarChart data={props.data} height={20} accessibilityLayer margin={{top:20}}>
                    
                    <CartesianGrid  vertical={false}/>
                    <XAxis 
                        dataKey={"date"}
                        tickLine={false}    
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={val => {
                            const date = new Date(val);
                            return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric"
                            })
                        }}
                    />
                    <ChartLegend content={<ChartLegendContent payload={undefined} />}/>
                    <ChartTooltip content={<ChartTooltipContent className='w-[250px]'/>}/>

                    <Bar 
                        dataKey={"success"}
                        fillOpacity={0.6}
                        radius={[0,0,4,4]}
                        fill='var(--color-success)'
                        stroke='var(--color-success)'
                        stackId={"success"}
                    />
                    <Bar 
                        radius={[4,4,0,0]}
                        dataKey={"failed"}
                        fillOpacity={0.6}
                        fill='var(--color-failed)'
                        stroke='var(--color-failed)'
                        stackId={"success"}
                    />

                </BarChart>

            </ChartContainer>

        </CardContent>


    </Card>
  )
}

export default CreditsUsageChart