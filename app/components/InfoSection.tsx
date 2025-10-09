import Image from 'next/image'
import React from 'react'

function CardSectionInfo() {
  return (
    <section id='courses' className='py-28 w-full  rounded-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black'>
      <div className='max-w-5xl w-full  flex-col mx-auto '>
        <div className=' mb-14 flex flex-col items-center gap-4 max-sm:gap-6 sm:flex-row sm:justify-between '>
<h2 className=' text-4xl sm:text-5xl  text-primary max-sm:text-center uppercase font-bold sm:max-w-[10ch]  '>
    We've been&nbsp;there. we&nbsp;know what it takes.
    </h2>
     <div className='max-w-[35ch] text-sm text-slate-600 max-sm:text-ellipsis max-sm:text-center'>
        <p>Unlike traditional search firms, we’ve been part of building innovative companies – like – from the ground up, giving us a deep understanding of what it takes to build effective, thriving teams.</p>
     </div>

        </div>
        
        <div className='flex-col gap-7 flex-wrap sm:flex-row flex mt-6 gap-2'>
          <div className='card flex-1 rounded-3xl  border border-slate-300 bg-secondary   px-4 py-8 flex flex-col items-center  '>
<Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition "
           />
            <h1 className='font-bold text-center mt-4 text-[#262364] text-3xl'>Trial Classes</h1>

            <p className='text-sm text-slate-600 pt-4 max-w-[25ch] text-center px-3'>This will encourage your concept in islam and make you and your child a success devote. </p>

          </div>
         <div className='card  rounded-3xl flex-1 border border-slate-300 bg-secondary   px-4 py-8 flex flex-col items-center  '>
<Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition "
           />
            <h1 className='font-bold text-center mt-4 text-[#262364] text-3xl'>Trial Classes</h1>

            <p className='text-sm text-slate-600 pt-4 max-w-[25ch] text-center px-3'>This will encourage your concept in islam and make you and your child a success devote. </p>

          </div>
         <div className='card  rounded-3xl flex-1 border border-slate-300 bg-secondary   px-4 py-8 flex flex-col items-center  '>
<Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition "
           />
            <h1 className='font-bold text-center mt-4 text-[#262364] text-3xl'>Trial Classes</h1>

        
            <p className='text-sm text-slate-600 pt-4 max-w-[25ch] text-center px-3'>This will encourage your concept in islam and make you and your child a success devote. </p>

          </div>
           <div className='card  rounded-3xl flex-1 border border-slate-300 bg-secondary   px-4 py-8 flex flex-col items-center  '>
<Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition "
           />
            <h1 className='font-bold text-center mt-4 text-[#262364] text-3xl'>Trial Classes</h1>

         
            <p className='text-sm text-slate-600 pt-4 max-w-[25ch] text-center px-3'>This will encourage your concept in islam and make you and your child a success devote. </p>

          </div>
          </div>
        </div>
    </section>
  )
}

export default CardSectionInfo