import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import React from 'react'
import Editor from '../../_components/editor'

type Props = {
    params: Promise<{workflowId: string}>
}

const page = async (props: Props) => {
    const params = await props.params
    const {userId} = await auth();
    if(!userId) return <div>unauthorised</div>

    const workflow = await db.workflow.findUnique({ where: { id : params.workflowId , userId }})
    if(!workflow) return notFound()

  return (
    <Editor workflow={workflow}/>
  )
}

export default page