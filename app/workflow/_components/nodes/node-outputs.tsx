"use client"
import React from 'react'

type Props = {
    children: React.ReactNode
}

const NodeOutputs = (props: Props) => {
  return (
    <div className='flex flex-col gap-1 divide-y'>{props.children}</div>
  )
}

export default NodeOutputs