"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2Icon, ClipboardIcon, EyeOffIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z.object({
    email: z.email().min(1, {message: "Required"}),
    password: z.string().min(1, {message: "Required"})
})

const SignInForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur"
    })
    const {isLoaded, signIn, setActive} = useSignIn();
    const router = useRouter();
    const [clickedEmail, setClickEmail] = React.useState(false)
    const [clickedPass, setClickPass] = React.useState(false)

    const copyThing = (copyInst: string) => {
        window.navigator.clipboard.writeText(copyInst === "email" ? "craftsuitexampleacc123@gmail.com" : "passwordlike123");

        toast.success("Copied to clipboard", {id: "copy"});

        if(copyInst === "email"){
            setClickEmail(true);
            setTimeout(() => setClickEmail(false), 1000)
        }else if(copyInst === "password"){
            setClickPass(true);
            setTimeout(() => setClickPass(false), 1000)
        }
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!isLoaded) return;

        try {
            
            const signedIn = await signIn.create({
                identifier: values.email,
                password: values.password
            });

            if(signedIn.status === "complete") {
                await setActive({session: signIn.createdSessionId});

                toast.success("Welcome back!", {id: "sign-in"});
                router.push("/")
            }

        } catch (error) {
            console.log("🔴Error there was an error in the handleSubmit function", error)
            toast.error("🔴Failed to signIn", {id: "sign-in"})
        }
    }

  return (
      <div className="flex flex-col gap-8">

          <Form {...form}>

              <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>

                  <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Email:</FormLabel>
                              <FormControl>
                                  <Input type="email" {...field} placeholder='johndoe@gmail.com' />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Password:</FormLabel>
                              <FormControl>
                                  <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <Button type='submit'>Submit</Button>
                      
              </form>

          </Form>

          <div>

            <Card>
                <CardHeader>
                    <CardTitle>Testing account:</CardTitle>
                </CardHeader>

                <CardContent className='gap-10 flex flex-col'>
                    <div className='flex relative gap-5 items-center'>
                        <div>
                            <UserIcon/>
                        </div>
                        <div>
                            craftsuitexampleacc123@gmail.com
                        </div>

                        <div className='absolute right-3 top-0 p-2 bg-primary/30 rounded-full' onClick={() => copyThing("email")}>
                            {clickedEmail ? <CheckCircle2Icon/> : <ClipboardIcon/>}
                        </div>
                    </div>
                    
                    <div className='flex relative gap-5 items-center'>
                        <div>
                            <EyeOffIcon/>
                        </div>
                        <div>
                           passwordlike123 
                        </div>

                        <div className='absolute right-3 top-0 p-2 bg-primary/30 rounded-full' onClick={() => copyThing("password")}>
                            {clickedPass ? <CheckCircle2Icon/> : <ClipboardIcon/>}
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
      </div>
  )
}

export default SignInForm