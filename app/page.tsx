/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SliderDesign from "./components/SliderDesign";
import Framer from "./components/Framer.jsx";
import InViewFramer from "./components/InViewFramer.jsx";
import UseAnimateExample from "./components/UseAnimateExample.jsx";
import AppleButton from "./components/AppleButton.jsx";
import CardSection from "./components/CardSection";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./components/Navbar";
import DetailSection from "./components/DetailSection";
import CardSectionInfo from "./components/InfoSection";
import Banner from "./components/Banner";

export default function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push("/dashbord");
  };

  return (
    <div className=" scroll-smooth bg-secondary overflow-hidden grid w-full min-h-screen   ">
      <Navbar />
      <section
        id="home"
        className="max-w-5xl grid items-center  w-full mt-0 flex-col mx-auto max-lg:px-5 min-h-screen"
      >
        <div className="text-black h-full mt-28 mx-auto justify-center max-sm:mt-10 max-sm:gap-2 gap-2 w-full max-h-[80%] sm:h-[80%] items-center ">
          <div className="flex  flex-col  max-sm:mt-[12vw]  w-full items-center  text-center">
           
            <h1 className="sm:text-5xl  text-4xl mt-[6vw]  max-w-[18ch] sm:leading-[1.2em] text-[#262364] font-bold ">
              Organize your Meals by{" "}
              <span className=""> reading log</span>
            </h1>
            <p className="font-lora sm:max-w-[20ch] font-semibold max-sm:px-5 text-lg  sm:my-5 my-3">
              Are you struggle to get madrasa Education ? - Join Us Now.
            </p>
            <div className="flex flex-row  sm:gap-4 gap-2 w-full items-center">
              <button
                onClick={onClick}
                className="sm:text-lg flex text-center justify-center gap-1 w-full text-base my-6 max-sm:self-center border-solid bg-[#262364]  text-white rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95"
              >
                Learn more 
              </button>
              <button
                onClick={onClick}
                className="sm:text-lg text-center flex gap-1 justify-center w-full text-base my-6 max-sm:self-center border-solid border border-slate-400  text-slate-400 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1] hover:bg-opacity-95"
              >
                Get Touch 
              </button>
            </div>
          </div>
          <div className="w-full flex sm:justify-end justify-center"></div>
        </div>
      </section>
      <Banner />
      <CardSectionInfo/>
      <CardSection />
      <DetailSection />
      <section id="contact" className="bg-black">
        {/* <SliderDesign/> */}
        <SliderDesign />
      </section>

      {/* <AppleButton /> */}
    </div>
  );
}
