import ReactCountupWrapper from "@/components/global/react-countup-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

type StatsCardProps = {
    title: string, 
    value: number,
    icon: LucideIcon
}

export const StatsCard = (props: StatsCardProps) => {
    return <Card className="relative overflow-hidden h-full">

        <CardHeader className="flex pb-2">
            <CardTitle className="font-bold">{props.title}</CardTitle>
            <props.icon size={120} className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10"/>
        </CardHeader>

        <CardContent className="pt-0">

            <div className="text-2xl font-bold text-primary">
                <ReactCountupWrapper value={props.value}/>
            </div>

        </CardContent>
        
    </Card>
}