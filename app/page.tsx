/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SliderDesign from "./components/SliderDesign"
import Framer from "./components/Framer.jsx";
import InViewFramer from "./components/InViewFramer.jsx";
import UseAnimateExample from "./components/UseAnimateExample.jsx";
import AppleButton from "./components/AppleButton.jsx";
import CardSection from "./components/CardSection";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const router = useRouter()

  const onClick = () => {
    router.push("/dashbord");
  }

  return (
     <div className=" bg-white overflow-hidden grid w-full min-h-screen   ">
       <section className='max-w-5xl w-full mt-0 flex-col mx-auto max-lg:px-[10%] min-h-screen'>
        <nav className="py-2 flex items-center justify-between border-b-slate-300 ">
          <div className="w-44">
          <Image
          src="/mihrabLogo.png"
          alt="logo"
          width={200}
          height={200}s
          layout="responsive"
          loading="lazy"
          className="w-4 translate-x-[-2px]"
        />
          </div>
          <div className="flex gap-4 items-center text-sm">
        <ul className="list-none max-sm:hidden flex gap-2 font-medium text-[#262364] mr-6">
             <li>Home</li>
             <li>Courses</li>
              <li>Contact Us</li>
            </ul>
           <Link href="/login"> <button className="border- bg-[#262364] text-white rounded px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95">Join Now</button></Link>

          </div>
        </nav>
        <div className='text-black h-full flex sm:flex-row justify-center  flex-col-reverse max-sm:mt-10 max-sm:gap-2 gap-2 w-full max-h-[80%] sm:h-[80%] items-center '>
          <div className="flex  flex-col    w-full items-center sm:items-start max-sm:text-center">
         <h6 className="font-semibold ">Literature-<span className="underline">Missed Meals</span></h6>
         <h1 className="sm:text-5xl  text-2xl mt-6 max-w-[18ch] sm:leading-[1.2em] text-[#262364] font-bold ">Organize your Meals by <span className="underline"> reading log</span></h1>
         <p className="font-lora max-w-[20ch] sm:my-5 my-3">
          " Are you struggle to get madrasa Education ? - Join Us Now."
         </p>
        <button onClick={onClick} className="sm:text-lg flex gap-1 text-lg my-6 max-sm:self-center border-solid bg-[#262364] text-white rounded sm:px-7 sm:py-3 px-6 py-2 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95">Find Now <ArrowUpRight className="translate-y-1"/> </button>

          </div>
          <div className="w-full flex sm:justify-end justify-center">
          {/* <Image
          src="/plate.png"
          alt=""
          width={200}
          height={200}
          layout="responsive"
          loading="lazy"
          className=""
        /> */}
          </div>
        
        </div>
       </section>
       <CardSection/>
       
       <section className="bg-black">
       {/* <SliderDesign/> */}
       <SliderDesign/>

       </section>
    
            {/* <AppleButton /> */}
     </div>
     )
}

