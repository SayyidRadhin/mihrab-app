import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

function CardSection() {
  const router = useRouter();

  // Animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Animation variants for h6 and h2
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.section
      id="courses"
      className="py-24 sm:py-32 w-full bg-primaryAccent rounded-[2em] mt-0 flex-col mx-auto max-lg:px-[10%] text-black"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-5xl w-full flex-col mx-auto mt-6">
        <motion.p
          className="text-center text-base text-secondary py-4 mb-4"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: false }}
        >
          courses
        </motion.p>

        <motion.h2
          className="text-center text-4xl text-secondary font-semibold uppercase"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: false }}
        >
          Explore Courses
        </motion.h2>
        <motion.h2
          className="text-center text-4xl text-secondary font-semibold uppercase"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: false }}
        >
          We Offer
        </motion.h2>

        <div className="flex-col gap-7 sm:flex-row flex mt-10 gap-2">
          {[
            {
              number: "01",
              title: "Online Madrasa Education",
              description:
                "Online madrasa merges tradition with technology, teaching Islamic studies from Grade 1 to Plus Two.",
              link: "/joinnow",
            },
            {
              number: "02",
              title: "Quran Memorization",
              description:
                "Memorize the Qur'an from home with our Online Hifz programs, offering flexible and personalized learning for every student.",
              link: "/quranapp",
            },
            {
              number: "03",
              title: "Online school",
              description:
                "Online school provides education through the internet, replacing traditional classrooms with flexible, virtual learning.",
              link: "/joinnow",
            },
          ].map((course, index) => (
            <motion.article
              key={index}
              className="card shadow-md flex-1 rounded-3xl bg-secondaryAccent px-4 py-6 flex flex-col items-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true }}
            >
              <span className="font-bold text-[#262364]">{course.number}</span>

              <h1 className="font-bold text-center text-[#262364] text-3xl mt-2">
                {course.title}
              </h1>

              <Image
                src="/laptop.png"
                alt="Student learning through laptop in online madrasa course"
                width={15}
                height={15}
                layout="responsive"
                loading="lazy"
                className="rounded-tr-lg rounded-tl-lg max-w-14 hover:scale-110 transition mt-4"
              />
              <p className="text-sm text-slate-600 pt-4 text-center mb-4">
                {course.description}
              </p>
              <motion.button
                onClick={() => router.push(course.link)}
                className="border mt-auto border-slate-300 transition rounded-full text-primary py-2 px-6 font-medium mx-auto text-sm"
                variants={buttonVariants}
                whileHover="hover"
              >
                join now
              </motion.button>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default CardSection;