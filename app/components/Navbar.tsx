import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    const{scrollY} = useScroll()
    const [hidden, setHidden] = useState(false)
    const [background, setbackground] = useState(false)
    
    useMotionValueEvent(scrollY,"change",(latest)=>{
        const previous = scrollY.getPrevious() as number;
        if(latest > 2){
            setbackground(true)
        }else{
            setbackground(false)
        }
        if(latest > previous && latest >150){
            setHidden(true)
        }else{
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
     className={`${background ? "bg-white shadow-md" : ""} scroll- px-10 fixed top-0 left-0 w-full flex items-center justify-between border-b-slate-300 `}>
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
        <ul className="list-none max-sm:hidden flex gap-2 font-medium text-[#262364] mr-6">
             <li>Home           </li>
             <li>Courses</li>
              <li>Contact Us</li>
            </ul>
           <Link href="/login"> <button className=" bg-[#262364] text-sm text-white rounded px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95">JoinNow</button></Link>

          </div>
        </motion.nav>
  )
}
