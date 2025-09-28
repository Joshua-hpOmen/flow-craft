"use client"
import React from 'react'
import {useSignUp} from "@clerk/nextjs"
import {  z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1, {message: "Required"}),
    email: z.email().min(1, {message: "Required"}),
    confirmEmail: z.string().min(1, {message: "Required"}),
    password: z.string().min(1, {message: "Required"}),
    confirmPassword: z.string().min(1, {message: "Required"})
}).refine(schema => schema.email === schema.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"]
}).refine(schema => schema.password === schema.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
})

const otpForm = z.object({otp: z.string().length(6, {message: "Invalid OTP"})})

const SignUpForm = () => {

    const {isLoaded, signUp, setActive} = useSignUp();
    const [step, setStep] = React.useState(1);
    const router = useRouter()

    const form = useForm({
      mode: "onBlur",
      resolver: zodResolver(formSchema)
    })

    const formOTP = useForm({
      mode: "onBlur",
      resolver: zodResolver(otpForm)
    })

    const generateOTP = async (values: z.infer<typeof formSchema>) => {
      if(!isLoaded) return;
      
      try {
        
        signUp.create({
          emailAddress: values.email,
          password: values.password
        })
  
        await signUp.prepareEmailAddressVerification({strategy: "email_code"});
        setStep(2)

      } catch (error) {
        console.log("🔴Error in the handleSubmit function", error)
        toast.error("Failed to signUp", {id: "sign-up"})
      }

    }

    const handleSubmit = async (values: z.infer<typeof otpForm>) => {
      if(!isLoaded)return;

      try {
        
        const completeSignUp = await signUp.attemptEmailAddressVerification({code: values.otp});

        if(completeSignUp.status !== "complete") {
          toast.error("Something went wrong", {id: "sign-up"});
          setTimeout(() => {
            window.location.reload();
          }, 500)
        }

        if(!signUp.createdUserId) return;

        await setActive({session: completeSignUp.createdSessionId})

        router.push("/")

      } catch (error) {
        console.log("🔴Error in the handleSubmit", error)
        toast.error("Failed to signUp", {id: "sign-up"});
      }
    }

  
  if (step === 1) {
    return <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(generateOTP)} className='flex flex-col gap-5'>

          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe@user.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Email:</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe@user.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passowrd:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button className='' type='submit'>Submit</Button>
        </form>
      </Form>

      <div id="clerk-captcha"></div>

    </div>
  } else if (step === 2) {
    return <Form {...formOTP}>

      <form onSubmit={formOTP.handleSubmit(handleSubmit)} className='my-8 flex flex-col gap-5'>

        <FormField 
          control={formOTP.control}
          name="otp"
          render={({field}) => (
            <FormItem>
                
              <FormLabel className='text-center text-xl'>OTP:</FormLabel>

              <FormControl>

                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

              </FormControl>

              <FormMessage/>
            </FormItem>
            
          )}
        />

        <Button type='submit'>Submit</Button>        

      </form>

    </Form>
  }
}

export default SignUpForm