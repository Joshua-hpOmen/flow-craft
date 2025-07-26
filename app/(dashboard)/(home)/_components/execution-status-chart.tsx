"use client"
import { getWorkflowExecutionStats } from '@/actions/analytics/get-workflow-execution-status';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Layers2Icon } from 'lucide-react';
import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

type Props = {
    data: Awaited<ReturnType<typeof getWorkflowExecutionStats>>
}

const chartConfig = {
    success : {
        label: "Success",
        color: "green"
    },
    failed : {
        label: "Failed",
        color: "var(--chart-1)"
    },
}

const ExecutionStatusChart = (props: Props) => {
  return (
    <Card>
        <CardHeader>

            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                <Layers2Icon className='w-6 h-6 text-primary'/>
                Workflow execution status
            </CardTitle>

            <CardDescription>
                Daily number of successfull and failed workflow executions
            </CardDescription>

        </CardHeader>

        <CardContent>

            <ChartContainer className='max-h-[200px] w-full' config={chartConfig}>

                <AreaChart data={props.data} height={20} accessibilityLayer margin={{top:20}}>
                    
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

                    <Area 
                        dataKey={"success"}
                        type={"natural"}
                        fillOpacity={0.4}
                        fill='var(--color-success)'
                        stroke='var(--color-success)'
                        stackId={"success"}
                    />
                    <Area 
                        dataKey={"failed"}
                        type={"natural"}
                        fillOpacity={0.4}
                        fill='var(--color-failed)'
                        stroke='var(--color-failed)'
                        stackId={"success"}
                    />

                </AreaChart>

            </ChartContainer>

        </CardContent>


    </Card>
  )
}

export default ExecutionStatusChart