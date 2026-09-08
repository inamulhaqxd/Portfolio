"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function TopLeftCTA() {
  return (
    <motion.button
      className="fixed left-6 top-8 z-50 flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200/60 bg-white/20 px-4 py-2.5 backdrop-blur-2xl transition-all duration-300 hover:shadow-xl group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="object-contain"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" className="text-foreground/80" />
        <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">I</text>
      </svg>
      <span className="hidden text-sm font-medium text-neutral-700 sm:inline">
        Build your AI portfolio
      </span>
      <span className="text-sm font-medium text-neutral-700 sm:hidden">
        Build yours
      </span>
      <ArrowRight className="hidden h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 sm:block" />
    </motion.button>
  );
}
