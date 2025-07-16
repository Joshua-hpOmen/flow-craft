import BreadcurmbHeader from '@/components/global/breadcrumb-header'
import SideBar from '@/components/global/side-bar'
import { ModeToggle } from '@/components/global/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
      <div className='flex h-screen'>
          <SideBar/>
          <div className='flex flex-col flex-1 px-4'>
              <header className='w-full py-4 flex justify-between items-center'>
                <BreadcurmbHeader/>

                <section className='flex gap-2'>
                  <UserButton/>
                  <ModeToggle/>
                </section>
              </header>
              <Separator/>
              <div>
                  {props.children}
              </div>
          </div>
      </div>
  )
}

export default layout