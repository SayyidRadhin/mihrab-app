import Image from 'next/image'
import React from 'react'

function CardSectionInfo() {
  return (
    <section id='courses' className='py-24 w-full  rounded-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black'>
      <div className='max-w-5xl w-full  flex-col mx-auto '>
        <div className=' mb-14 flex flex-col items-center gap-4 max-sm:gap-6 sm:flex-row sm:justify-between '>
<h2 className=' text-4xl sm:text-5xl  text-primary max-sm:text-center uppercase font-bold sm:max-w-[10ch]  '>
    We've been&nbsp;there. we&nbsp;know what it takes.
    </h2>
     <div className='max-w-[35ch] text-sm text-slate-600 max-sm:text-ellipsis max-sm:text-center'>
        <p>Unlike traditional search firms, we’ve been part of building innovative companies – like – from the ground up, giving us a deep understanding of what it takes to build effective, thriving teams.</p>
     </div>

        </div>
        
        <div className='flex-col gap-7 sm:flex-row flex mt-4 gap-2'>
          <div className='card  rounded-3xl border border-slate-300 bg-secondary   px-4 py-6 flex flex-col items-center  '>
            <h6 className='font-bold text-[#262364]'>01</h6>

            <h1 className='font-bold text-center text-[#262364] text-3xl'>Online Classes</h1>

          <Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition mt-4"
           />
            <p className='text-sm text-slate-600 pt-4 text-center'>This will encourage your concept in islam and make you and your child a success devote. </p>
            <button className='border border-slate-300 transition rounded-full border-none text-white py-2 px-4 mx-auto mt-2 text-sm' > join now</button>

          </div>
         <div className='card shadow-md rounded-3xl bg-secondary   px-4 py-6 flex flex-col items-center  '>
            <h6 className='font-bold text-[#262364]'>01</h6>

            <h1 className='font-bold text-center text-[#262364] text-3xl'>Online Classes</h1>

          <Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition mt-4"
           />
            <p className='text-sm text-slate-600 pt-4 text-center'>This will encourage your concept in islam and make you and your child a success devote. </p>
            <button className='border border-slate-300 transition rounded-full border-none text-white py-2 px-4 mx-auto mt-2 text-sm' > join now</button>

          </div>
         <div className='card shadow-md rounded-3xl bg-secondary   px-4 py-6 flex flex-col items-center  '>
            <h6 className='font-bold text-[#262364]'>01</h6>

            <h1 className='font-bold text-center text-[#262364] text-3xl'>Online Classes</h1>

          <Image
          src="/laptop.png"
          alt=""
          width={15}
          height={15}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition mt-4"
           />
            <p className='text-sm text-slate-600 pt-4 text-center'>This will encourage your concept in islam and make you and your child a success devote. </p>
            <button className='border border-slate-300 transition rounded-full border-none text-white py-2 px-4 mx-auto mt-2 text-sm' > join now</button>

          </div>
          </div>
        </div>
    </section>
  )
}

export default CardSectionInfo