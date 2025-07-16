import React from 'react'

type Props = {
    children: React.ReactNode
}

const NodeInputs = (props: Props) => {
  return (
    <div className='flex flex-col divide-y gap-2'>
        {props.children}
    </div>
  )
}

export default NodeInputs