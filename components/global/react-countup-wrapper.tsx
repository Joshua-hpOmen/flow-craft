import React from 'react'
import CountUp from "react-countup";

type Props = {
    value: number
}

const ReactCountupWrapper = (props: Props) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true),[])

    if(!mounted) return "-";

  return <CountUp end={props.value} duration={0.5} decimals={0} />

}

export default ReactCountupWrapper