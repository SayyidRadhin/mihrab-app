import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function NavbarQuran() {
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
          <div className="flex gap-4 items-center text-sm">
        
           <Link href="/"> <button className=" bg-primaryAccent text-sm text-white rounded-3xl px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95">Download Now</button></Link>

          </div>
        </motion.nav>
  )
}
