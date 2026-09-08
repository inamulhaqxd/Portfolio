"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  return (
    <motion.div
      className="z-10 mb-0 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="z-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <button
          className="inline-flex items-center justify-center rounded-2xl bg-white/30 p-3 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/60"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 md:w-8"
          >
            <rect width="32" height="32" rx="8" fill="currentColor" className="text-foreground/80" />
            <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">I</text>
          </svg>
          <span className="sr-only">About Inam</span>
        </button>
      </motion.div>

      <motion.h2
        className="mt-1 text-xl font-semibold text-neutral-600 md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {portfolio.greeting}
      </motion.h2>

      <motion.h1
        className="text-4xl font-bold text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {portfolio.role}
      </motion.h1>
    </motion.div>
  );
}
