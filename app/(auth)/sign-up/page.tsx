import React from 'react'
import SignUpForm from './_components/sign-up-form'
import Logo from '@/components/global/logo'

const page = () => {
  return (
    <div className='px-5'>
      <div className='flex justify-between items-center'>
        <Logo/>
        <span className='font-bold text-2xl'>SignUp</span>
      </div>
      <SignUpForm />
    </div>
  )
}

export default page