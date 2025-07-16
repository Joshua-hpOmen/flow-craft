import Logo from '@/components/global/logo'
import { ModeToggle } from '@/components/global/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className='flex flex-col w-full h-screen'>
        {props.children}
        <Separator/>

        <footer className='flex items-center justify-between p-2'>
            <Logo iconSize={16} fontSize='text-xl'/>
            <ModeToggle/>
        </footer>
    </div>
  )
}

export default layout