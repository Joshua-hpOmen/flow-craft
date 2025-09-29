import SignInForm from './_components/sign-in-form'
import Logo from '@/components/global/logo'

const page = () => {
  return (
    <div className='flex flex-col px-5 gap-4'>
      <div className='flex justify-between items-center'>
        <Logo />
        <span className='text-2xl font-bold'>SignIn</span>
      </div>

      <SignInForm />
    </div>
  )
}

export default page