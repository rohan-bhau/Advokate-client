"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import lightHero from "@/assets/light-hero.png";
import darkHero from "@/assets/dark-hero.png";

export default function HeroImage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : "light";

  return (
    <div className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={currentTheme === "dark" ? darkHero : lightHero}
            alt="Hero background graphics"
            fill
            priority
            sizes="100vw"
            className="object-cover  md:object-center opacity-90 dark:opacity-80 transition-opacity"
          />
          {/* Subtle overlay to guarantee high-contrast readability over background vectors */}
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent lat-overlay" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
