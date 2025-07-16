import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className='text-primary font-bold text-6xl'>404</h1>
            <h2 className='text-2xl font-semibold mb-3'>Page not found</h2>
            <p className='text-muted-foreground max-w-md mb-4'>
                Don&apos;t worry, even the best data sometimes gets lost in the internet
            </p>
            <Link href='/' className={buttonVariants()}>
                <ArrowLeft/>
                Back to dashboard
            </Link>

            <p className="text-sm text-muted-foreground mt-4">
                If you truly believe this is an error, please contact our support team.
            </p>
        </div>
    </div>
  )
}

export default NotFound