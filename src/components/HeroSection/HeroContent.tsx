"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroContent() {
  const router = useRouter()
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, 
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl text-left"
    >
      {/* 1. Main Heading Layer */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E3A60] dark:text-white leading-[1.15] tracking-tight drop-shadow-sm"
      >
        Find & Hire <br />
        <span className="text-[#1D44B7] dark:text-blue-500 font-sans tracking-wide block mt-2">
          Expert Legal Counsel
        </span>
      </motion.h1>

      {/* 2. Content Description Subtext */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-base sm:text-lg text-[#5C6E85] dark:text-default-400 font-medium max-w-lg leading-relaxed"
      >
        Connecting clients with verified and experienced lawyers for all your
        legal needs.
      </motion.p>

      {/* 3. Staggered Button Group Elements */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-5 mt-8"
      >
        <Button
          onClick={()=>router.push("/browse-lawyer")}
          className="font-semibold rounded-md bg-[#1D44B7] hover:bg-[#153491] dark:bg-blue-600 dark:hover:bg-blue-700 text-white h-12 px-8 tracking-wide text-sm shadow-md transition-colors duration-200">
          Browse Lawyers
        </Button>

        <Button
          variant="outline"
          className="font-semibold border-none rounded-md text-[#1D44B7] dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-default-100 h-12 px-5 text-sm flex items-center gap-2 transition-colors duration-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          How it works
        </Button>
      </motion.div>
    </motion.div>
  );
}
