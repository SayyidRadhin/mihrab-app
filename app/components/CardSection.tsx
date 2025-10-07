import Image from 'next/image'
import React from 'react'

function CardSection() {
  return (
    <section id='courses' className='py-8 w-full bg-primary rounded-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black'>
      <div className='max-w-5xl w-full mt-0 flex-col mx-auto mt-4'>
        <h2 className='text-center text-4xl text-secondary font-semibold '>Explore Our Courses</h2>
                <h2 className='text-center text-4xl text-secondary font-semibold '>With fast</h2>

        <div className='flex-col gap-7 sm:flex-row flex mt-4 gap-2'>
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

export default CardSection