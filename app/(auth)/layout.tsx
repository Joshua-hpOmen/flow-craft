import Image from 'next/image'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className="w-screen h-screen grid grid-cols-2">

      <div>

        <div>{props.children}</div>

      </div>

      <div className='bg-primary/10 overflow-hidden pl-8 flex flex-col gap-5 pt-5'>

       <div className='flex flex-col gap-3 pr-2'> 
        <h2 className='text-3xl font-bold'>Flow-Craft</h2>
        <p className='text-sm text-muted-foreground'>Effortlessly extract data from any website with our intuitive drag-and-drop web scraping platform 🫵. Powered by advanced AI, our tool guides you through scraping tasks, turning complex data collection into a simple, efficient process. Whether you’re gathering information for research, analytics, or business insights, our platform makes web scraping smarter, faster, and more accessible than ever😎.</p>
       </div>
        

        <div className='w-full overflow-hidden relative'>
          <Image src={'/flow-craft-image.png'}  alt='Image of application' style={{width: "2040px", height: "1072px", objectFit: "none", objectPosition: "1px"}} width={10000} height={10000} />
        </div>
         
      </div>

    </div> 
  )
}

export default layout