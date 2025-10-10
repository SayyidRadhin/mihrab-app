'use client'; // Ensure this is a Client Component (required for Framer Motion)

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

// Parent container variants (for staggering children like cards)
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger each card by 0.2s
      delayChildren: 0.3, // Slight delay after header animation
    },
  },
};

// Individual card variants (zoom + fade-up)
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Header text variants (slide in)
const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Section fade-in
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

function CardSectionInfo() {
  // Sample card data (replace with real data if needed)
  const cards = [
    { title: 'Trial Classes', description: 'This will encourage your concept in Islam and make you and your child a successful devotee.' },
    { title: 'Interactive Lessons', description: 'Engaging sessions with real-time feedback to deepen understanding.' },
    { title: 'Certified Instructors', description: 'Learn from qualified scholars with years of experience.' },
    { title: 'Flexible Scheduling', description: 'Classes tailored to your timeline for seamless learning.' },
  ];

  return (
    <motion.section
      id="courses"
      className="py-28 w-full rounded-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false}} // Trigger once when 20% in view
    >
      <div className="max-w-5xl w-full flex-col mx-auto">
        <div className="mb-14 flex flex-col items-center gap-4 max-sm:gap-6 sm:flex-row sm:justify-between">
          <motion.h2
            className="text-5xl sm:text-5xl text-DarkBlueAccent max-sm:text-center uppercase font-bold sm:max-w-[10ch]"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            We've been&nbsp;there. we&nbsp;know what it takes.
          </motion.h2>

          <motion.div
            className="max-w-[35ch] text-sm text-slate-600 max-sm:text-ellipsis max-sm:text-center"
            variants={descriptionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <p>
              Unlike traditional search firms, we’ve been part of building innovative companies – like – from the ground up, giving us a deep understanding of what it takes to build effective, thriving teams.
            </p>
          </motion.div>
        </div>

        {/* Cards Container with Stagger */}
        <motion.div
          className="flex flex-col gap-7 flex-wrap sm:flex-row mt-6 gap-2"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="card flex-1 rounded-3xl border border-slate-300 bg-secondaryAccent px-4 py-8 flex flex-col items-center"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }} // Hover lift + shadow
            >
              <Image
                src="/laptop.png"
                alt={`${card.title} icon`}
                width={56}
                height={56}
                loading="lazy"
                className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition-transform duration-300"
              />
              <h1 className="font-bold text-center mt-4 text-[#262364] text-3xl">{card.title}</h1>
              <p className="text-sm text-slate-600 pt-4 max-w-[25ch] text-center px-3">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default CardSectionInfo;