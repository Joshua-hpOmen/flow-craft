"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Breadcrumb, BreadcrumbLink, BreadcrumbList } from '../ui/breadcrumb'
import { MobileSideBar } from './side-bar'


const BreadcurmbHeader = () => {
    const pathName = usePathname();
    const paths = pathName === "/" ? [""] : pathName.split("/")
  return (
    <div className='flex items-center gap-2'>
        <MobileSideBar/>
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbLink href={`/${path}`}>
                            {(path === "" ? "home" : `> ${path}`)}
                        </BreadcrumbLink>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
  )
}

export default BreadcurmbHeader