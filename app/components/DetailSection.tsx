import Image from 'next/image'
import React from 'react'

export default function DetailSection() {
  return (
    <section className='py-28 max-w-5xl grid items-center  w-full mt-0 flex-col mx-auto max-lg:px-[10%]'>
       <div className='text-black h-full flex sm:flex-row justify-center  flex-col max-sm:mt-10 max-sm:gap-8 gap-8 w-full max-h-[80%] sm:h-[80%] items-center '>
          
          <div className="w-full flex sm:justify-end justify-center">
          <Image
          src="/quran-3.png"
          alt=""
          width={200}
          height={200}
          layout="responsive"
          loading="lazy"
          className=""
        />
          </div>
          <div className="flex  flex-col    w-full items-center sm:items-start max-sm:text-center">
            
           <h2 className='text-3xl text-[#262364] font-semibold '>Learn In smart Way</h2>
           <p className=' text-slate-600 text-sm pt-2  max-w-[37ch]'>You have virtual madrasa in 3 languages Including vibrent and required subjects,So <span className='font-semi-bold text-[#262364]'> why do you wait?</span> </p>

         </div>
        </div>
    </section>
  )
}
