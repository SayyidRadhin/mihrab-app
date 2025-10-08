"use client";

import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="w-full bg-primary text-white py-7 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center md:text-left"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
          Empower Learning, <br className="md:hidden" />
          <span className="text-slate-300 ">Anywhere, Anytime</span>
        </h2>
      </motion.div>
    </section>
  );
}
