"use client"
import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function Page() {
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    })

    if(!mounted) return
  return <SignUp />
}