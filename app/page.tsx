/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion
import SliderDesign from "./components/SliderDesign";
import Framer from "./components/Framer.jsx";
import CardSection from "./components/CardSection";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./components/Navbar";
import DetailSection from "./components/DetailSection";
import CardSectionInfo from "./components/InfoSection";
import Banner from "./components/Banner";
import FaqSection from "./components/Faqsection";
import Footer from "./components/Footer";
import WhatsupButton from "./components/WhatsupButton";

export default function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push("/dashbord");
  };

  // Animation variants for the hero section elements
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div id="home" className="scroll-smooth bg-secondaryAccent font-raleway overflow-hidden grid w-full min-h-screen">
      <Navbar />
      <motion.section
        id="home"
        className="max-w-5xl grid items-center w-full mt-0 flex-col mx-auto max-lg:px-5 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <div className="text-black h-full mt-28 mx-auto justify-center max-sm:mt-10 max-sm:gap-2 gap-2 w-full max-h-[80%] sm:h-[80%] items-center">
          <div className="flex flex-col max-sm:mt-[20vw] w-full items-center text-center">
            <motion.h1
              className="sm:text-5xl text-4xl mt-[7vw] max-w-[18ch] sm:leading-[1.2em] text-[#262364] font-bold"
              variants={heroVariants}
            >
              Explore knowledge{" "}
              <span className="">beyond classrooms — online, on your time</span>
            </motion.h1>
            <motion.p
              className="font-lora text-slate-600 sm:max-w-[20ch] font-medium max-sm:px-5 text-lg sm:my-5 my-3"
              variants={heroVariants}
            >
              Are you struggle to get madrasa Education? - Join Us Now.
            </motion.p>
            <div className="flex flex-row sm:gap-4 gap-2 max-sm:w-full items-center">
              <motion.button
                onClick={onClick}
                className="sm:text-lg flex text-center justify-center gap-1 max-sm:w-full text-base my-6 max-sm:self-center border-solid bg-[#262364] text-white rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:bg-opacity-95"
                variants={buttonVariants}
                whileHover="hover"
              >
                Learn more
              </motion.button>
              <motion.button
                onClick={onClick}
                className="sm:text-lg text-center flex gap-1 justify-center max-sm:w-full text-base my-6 max-sm:self-center border-solid border border-slate-400 text-slate-400 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:bg-opacity-95"
                variants={buttonVariants}
                whileHover="hover"
              >
                Get Touch
              </motion.button>
            </div>
          </div>
          <div className="w-full flex sm:justify-end justify-center"></div>
        </div>
      </motion.section>

      <Banner />
      <CardSectionInfo />
      <CardSection />
      <DetailSection />
      <FaqSection />
      {/* <section id="contact" className="bg-black">
        <SliderDesign />
      </section> */}
      <Footer />
      <WhatsupButton />
      {/* <AppleButton /> */}
    </div>
  );
}