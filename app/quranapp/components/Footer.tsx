import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function FooterQuran() {
  return (
    <section className='py-24 sm:py-10 w-full px-8 bg-primaryAccent rounded-t-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black'>
      <div className='w-full sm:mt-6' >
        <div className=' mb-14 flex flex-col items-center gap-4 max-sm:gap-6 sm:flex-row sm:justify-between '>
            <h2 className=' text-4xl sm:text-5xl  text-white max-sm:text-center uppercase font-bold sm:max-w-[10ch]  '>
              Mehrab Hifz App
            </h2>
                       <Link href="/"> <button className=" bg-secondaryAccent text-sm text-primaryAccent rounded-3xl px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95">Download Now</button></Link>

        </div>
        <div className=' mb-14 flex text-secondaryAccent flex-col items-center gap-4 max-sm:gap-6 sm:flex-row sm:justify-between '>
            <div className="mt-8 flex flex-col md:flex-row gap-2 justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400">
            All rights reserved © 2025 MEHRAB
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/legal">Legal</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div/></div>
        </div>
      </div>
    </section>
  )
}

export default FooterQuran