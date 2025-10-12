import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DetailSection() {
  const Router = useRouter();

  // Animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Animation variants for image and text container
  const contentVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  // Animation variants for h2
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      className="py-28 max-w-5xl grid items-center w-full mt-0 flex-col mx-auto max-lg:px-[10%]"
      variants={sectionVariants}
      initial="hidden"
      id='learning-apps'
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="text-black h-full flex sm:flex-row justify-center flex-col max-sm:mt-10 max-sm:gap-8 gap-12 w-full max-h-[80%] sm:h-[80%] items-center">
        <motion.div
          className="w-full flex justify-center"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          style={{ x: -50 }}
          viewport={{ once: true }}
        >
          <Image
            src="/phone-home.png"
            alt="Hifz App Preview"
            width={300}
            height={600}
            layout="intrinsic"
            loading="lazy"
            className="max-w-[22em] duration-300 ease-in-out"
          />
        </motion.div>
        <motion.div
          className="flex flex-col select-none w-full items-center max-sm:text-center"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          style={{ x: 50 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4 ">
            <motion.h2
              className="text-4xl text-[#262364] font-bold leading-tight"
              variants={textVariants}
              initial="hidden"
              custom={1}
              whileInView="visible"
              viewport={{ once: false }}
            >
              Memorize Quran with Ease
            </motion.h2>
            <motion.p variants={textVariants}
              initial="hidden"
              custom={2}
              whileInView="visible"
              viewport={{ once: false }}  className="text-slate-600 text-base pt-2 max-w-[40ch] leading-relaxed">
              Experience a virtual madrasa in Arabic, English, and Urdu with vibrant lessons and essential tools.{' '}
              <span className="font-semibold text-[#262364]">Start your Hifz journey today!</span>
            </motion.p>
            <div className="flex flex-row sm:gap-4 gap-2 max-sm:w-full max-sm:justify-center max-sm:flex-col">
              <motion.button
                onClick={() => Router.push('/quranapp')}
                className="sm:text-lg flex cursor-pointer  text-center bg-secondaryAccent justify-center gap-2 max-sm:w-full text-base border-solid border border-slate-400 text-slate-600 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease"
                variants={buttonVariants}
                whileHover="hover"
              >
                <Image
                  src="/playstore.png"
                  alt="Google Play"
                  width={25}
                  height={20}
                  className="mt-0.5"
                />
                Google Play
              </motion.button>
              <motion.button
                onClick={() => Router.push('/quranapp')}
                className="sm:text-lg cursor-pointer flex text-center bg-secondaryAccent justify-center gap-2 max-sm:w-full text-base border-solid border border-slate-400 text-slate-600 rounded-full sm:px-7 sm:py-3 px-6 py-3 font-semibold transition duration-300 ease"
                variants={buttonVariants}
                whileHover="hover"
              >
                <Image
                  src="/apple-logo.png"
                  alt="App Store"
                  width={25}
                  height={20}
                  className="mt-0.5"
                />
                App Store
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}