import Logo from '@/components/global/logo'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-2'>
        <Logo/>
        {props.children}
    </div>
  )
}

export default layout