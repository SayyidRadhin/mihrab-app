import Image from 'next/image'
import React from 'react'

function CardSection() {
  return (
    <section id='courses' className='py-8 max-w-5xl w-full mt-0 flex-col mx-auto max-lg:px-[10%] text-black'>
        <h2 className='text-center text-3xl text-[#262364] font-semibold '>Explore Our Courses</h2>
        <p className='text-center text-slate-600 text-sm mx-auto pt-2 pb-7 max-w-[37ch]'>You have virtual madrasa in 3 languages Including vibrent and required subjects,So <span className='font-semi-bold text-[#262364]'> why do you wait?</span> </p>
        <div className='flex-col gap-7 sm:flex-row flex'>
          <div className='card shadow-md rounded-lg border border-slate-100    '>
            <div className='overflow-hidden rounded-tr-lg rounded-tl-lg'>
          <Image
          src="/madrasa-eng.png"
          alt=""
          width={200}
          height={200}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg hover:scale-110 transition"
           />
           </div>
           <div className='px-7 py-9 '>
            <h6 className='font-bold text-[#262364]'>Madrasa English</h6>
            <p className='text-sm text-slate-600 pt-4'>This will encourage your concept in islam and make you and your child a success devote. </p>
            <button className='bg-[#262364] hover:bg-[#504c9d] transition rounded border-none text-white py-2 px-4 mx-auto mt-2 text-sm' > join now</button>

           </div>
          </div>
          <div className='card shadow-md rounded-lg border border-slate-100'>
            <div className='overflow-hidden rounded-tr-lg rounded-tl-lg'>
          <Image
          src="/madrasa-urdu.png"
          alt=""
          width={200}
          height={200}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg hover:scale-110 transition"
           />
           </div>
           <div className='px-7 py-9'>
            <h6 className='font-bold text-[#262364]'>Madrasa Urdu</h6>
            <p className='text-sm text-slate-600 pt-2'>This will encourage your concept in islam and make you and your child a success devote. </p>
            <button className='bg-[#262364] hover:bg-[#504c9d] transition rounded border-none text-white py-2 px-4 mx-auto mt-2 text-sm' > join now</button>
           </div>
          </div>
          <div className='card shadow-md rounded-lg border border-slate-100'>
            <div className='overflow-hidden rounded-tr-lg rounded-tl-lg'>
          <Image
          src="/madrasa-mal.png"
          alt=""
          width={200}
          height={200}
          layout="responsive"
          loading="lazy"
          className="rounded-tr-lg rounded-tl-lg hover:scale-110 transition"
           />
           </div>
           <div className='px-7 py-9'>
            <h6 className='font-bold text-[#262364]'>Madrasa Malayalam</h6>
            <p className='text-sm text-slate-600 pt-2'>This will encourage your concept in islam and make you and your child a success devote. </p>
            <button className='bg-[#262364] hover:bg-[#504c9d] transition rounded border-none text-white py-2 px-4 mx-auto mt-2 text-sm' > join now</button>
           </div>
          </div>
        </div>
    </section>
  )
}

export default CardSection