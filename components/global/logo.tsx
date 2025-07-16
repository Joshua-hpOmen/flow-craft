import { cn } from '@/lib/utils'
import { SquareDashedMousePointer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    fontSize ?: string,
    iconSize ?: number 
}

const Logo = ({fontSize = "text-2xl", iconSize = 25}: Props) => {
  return (
        <Link href="/" className={cn("text-2xl font-extrabold flex items-center gap-2 py-2", fontSize)}>
            <div className='rounded-xl bg-gradient-to-r from-violet-300 to-violet-700 p-2'><SquareDashedMousePointer size={iconSize} className='stroke-white'/></div>
            <div className='flex gap-0'>
                <span className='bg-gradient-to-r bg-clip-text text-transparent text-2xl from-violet-500 to-violet-800'>Flow</span>
                <span className="text-2xl text-stone-950 dark:text-white">Scrape</span>
            </div>
        </Link>
    )
}

export default Logo