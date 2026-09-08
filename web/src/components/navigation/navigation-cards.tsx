"use client";

import { motion } from "framer-motion";
import {
  Laugh,
  BriefcaseBusiness,
  Layers,
  PartyPopper,
  UserRoundSearch,
  type LucideIcon,
} from "lucide-react";
import { portfolio, type NavCardId } from "@/data/portfolio";

const iconMap: Record<string, LucideIcon> = {
  Laugh,
  BriefcaseBusiness,
  Layers,
  PartyPopper,
  UserRoundSearch,
};

interface NavigationCardsProps {
  onCardClick: (id: NavCardId) => void;
}

export function NavigationCards({ onCardClick }: NavigationCardsProps) {
  return (
    <div className="z-10 mt-4 flex w-full max-w-2xl justify-center gap-3">
      {portfolio.navCards.map((card, index) => {
        const Icon = iconMap[card.icon];
        return (
          <motion.button
            key={card.id}
            onClick={() => onCardClick(card.id)}
            className="flex aspect-square h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-neutral-200/60 bg-white/30 shadow-none backdrop-blur-lg transition-all active:scale-95 sm:h-28 sm:w-28 md:h-32 md:w-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <Icon size={22} stroke={card.color} />
            <span className="text-xs font-medium sm:text-sm">{card.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
