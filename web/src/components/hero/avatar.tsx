"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

export function Avatar() {
  return (
    <motion.div
      className="relative z-10 h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
    >
      <img
        alt={`${portfolio.fullName} avatar`}
        width="2000"
        height="2000"
        decoding="async"
        className="h-full w-full object-contain"
        src={portfolio.avatar}
      />
    </motion.div>
  );
}
