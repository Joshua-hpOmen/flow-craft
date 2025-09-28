"use client"

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import NextTopLoader from "nextjs-toploader"
type Props = {
    children: React.ReactNode
}

const AppPorivders = (props: Props) => {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#8e51ff" showSpinner={false}/>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {props.children}
      </ThemeProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default AppPorivders