import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import NavbarMobileAnimation from './NavMobile'

export default function Navbar() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [background, setbackground] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() as number;
        if (latest > 2) {
            setbackground(true)
        } else {
            setbackground(false)
        }
        // Don't hide navbar when mobile menu is open
        if (!isMobileMenuOpen && latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

  return (
    <motion.nav
     variants={{
        visible:{y:0},
        hidden:{y:"-100%"}
     }}
     animate={hidden ? "hidden" : "visible"}
     transition={{duration:0.35,ease:"easeInOut"}}
     className={`${background ? "bg-secondaryAccent " : ""}  scroll px-10   max-sm:px-5 fixed top-0 left-0 rounded-b-3xl w-full flex items-center justify-between border-b-slate-300 `}>
          <div className="w-44">
          <Image
          src="/mihrabLogo.png"
          alt="logo"
          width={200}
          height={200}
          layout="responsive"
          loading="lazy"
          className="w-4 translate-x-[-15px]"
        />
          </div>
          <div className="flex gap-4 items-center text-base">
        <ul className="list-none max-sm:hidden flex gap-4 font-medium text-[#262364] mr-6">
             <li><Link href="#home" >Home</Link> </li>
             <li><Link href="#courses" >Courses</Link> </li>

             <li><Link href="#learning-apps" >Apps</Link> </li>
              <li><Link href="#about" >About</Link> </li>
             <li><Link href="/joinnow" className='border font-semibold border-slate-300 rounded-full px-4 py-2' >Join Us</Link> </li>
            </ul>
           {/* <Link href="/login"> <button className=" bg-[#262364] text-sm text-white rounded px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95">JoinNow</button></Link> */}
        <NavbarMobileAnimation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

          </div>
        </motion.nav>
  )
}
