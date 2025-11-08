/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppDetails from "./components/Appdetails";
import NavbarQuran from "./components/Navbarquran";
import FooterQuran from "./components/Footer";
import Head from "next/head";
import BannerApp from "./components/BannerApp";
import AppFaq from "./components/AppFaq";


export default function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push("/dashbord");
  };

  return (
    <div className=" scroll-smooth bg-secondaryAccent font-raleway overflow-hidden grid w-full min-h-screen   ">
      <NavbarQuran />
      <section className='py-28 max-w-5xl grid items-center w-full mt-0 flex-col mx-auto max-lg:px-[10%]'>
            <div className='text-black h-full flex sm:flex-row justify-center flex-col max-sm:mt-10 max-sm:gap-8 gap-12 w-full max-h-[80%] sm:h-[80%] items-center'>
              <div className="w-full flex justify-center">
                <Image
                  src="/phone-home.png"
                  alt="Hifz App Preview"
                  width={300}
                  height={600}
                  layout="intrinsic"
                  loading="lazy"
                  className="max-w-[22em]  duration-300 ease-in-out"
                />  
              </div>
              <div className="flex flex-col w-full items-center max-sm:text-center">
                <div className='space-y-4'>
                  <h2 className='text-5xl text-[#262364] font-bold leading-tight'>
                    Memorize Quran with Ease
                  </h2>
                  <p className='text-slate-600 text-base pt-2 max-w-[40ch] leading-relaxed'>
                    Experience a virtual madrasa in Arabic, English, and Urdu with vibrant lessons and essential tools.{' '}
                    <span className='font-semibold text-[#262364]'>Start your Hifz journey today!</span>
                  </p>
                  <div className="flex flex-row sm:gap-4  gap-2  max-sm:w-full max-sm:justify-center max-sm:flex-col ">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:text-lg bg-secondaryAccent flex text-center justify-center gap-2 max-sm:w-full text-base  border-solid border border-slate-400 text-slate-600 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1]  "
              >
                <Image
                  src="/playstore.png" // Replace with your Flaticon Google Play icon
                  alt="Google Play"
                  width={25}
                  height={20}
                  className="mt-0.5"
                />
                Google Play
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:text-lg bg-secondaryAccent flex text-center justify-center gap-2 max-sm:w-full text-base  border-solid border border-slate-400 text-slate-600 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease hover:scale-[1.1]"
              >
                <Image
                  src="/apple-logo.png" // Replace with your Flaticon App Store icon
                  alt="App Store"
                  width={25}
                  height={20}
                  className="mt-0.5"
                />
                App Store
              </a>
            </div>
                </div>
              </div>
            </div>
          </section>
    <AppDetails/>
    <BannerApp />
    <AppFaq />
    <FooterQuran />
      

      {/* <AppleButton /> */}
    </div>
  );
}
