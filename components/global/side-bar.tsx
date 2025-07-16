"use client"
import { Coins, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react'
import React from 'react'
import Logo from './logo'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'


const routes = [
    {
        href: "",
        label: "Home",
        icon: HomeIcon
    },
    {
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon
    },
    {
        href: "credentials",
        label: "Credentials",
        icon: ShieldCheckIcon
    },
    {
        href: "billing",
        label: "Billing",
        icon: Coins
    },
]

const SideBar = () => {
    const pathName = usePathname();
    const activeRoute= routes.find(route => route.href.length > 0 && pathName.includes(route.href)) || routes[0]
  return (
    <div className='hidden md:!block relative w-[280px] min-h-screen overflow-hidden hover:overflow-y-auto bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate'>
        <div className='w-full flex items-center justify-center'>
            <div className='py-5 w-[90%]'>
                <Logo/>
                <Separator/>
            </div>
        </div>

        {/* WIP */}
        <div className="p-2">TODO CREDITS</div>


        <div className="flex flex-col p-2">
            {routes.map((route, index) => (
                <Link className={buttonVariants({variant: activeRoute.href === route.href ? "sideBarActiveItem": "sideBarItem"})} key={index} href={route.href}>
                    <route.icon size={20}/>
                    {route.label}
                </Link>
            ))}
        </div>
    </div>
  )
}

export const MobileSideBar = () => {
    const pathName = usePathname();
    const activeRoute= routes.find(route => route.href.length > 0 && pathName.includes(route.href)) || routes[0]
    const [isOpen, setOpen] = React.useState(false)
    
    return <div className="block border-separate bg-background md:hidden">
        <div className="container flex items-center justify-between px-8">
            <Sheet open={isOpen} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MenuIcon/>
                    </Button>
                </SheetTrigger>

                <SheetContent className='w-screen space-y-4 p-4' side="left">
                    <Logo/>
                    <div className="flex flex-col gap-1">
                        {routes.map((route, index) => (
                            <Link className={buttonVariants({variant: activeRoute.href === route.href ? "sideBarActiveItem": "sideBarItem"})} key={index} href={route.href}>
                                <route.icon size={20}/>
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </div>
}

export default SideBar