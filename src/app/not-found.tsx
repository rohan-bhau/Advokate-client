"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { LuShield } from "react-icons/lu";

export default function NotFound() {
  const router = useRouter();

  // Unified animations using premium ease-out bezier curve
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white dark:bg-black transition-colors duration-300 overflow-hidden px-4">
      {/* Structural Background Glow Grid Lines / Graphic Context Tokens */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-xl text-center flex flex-col items-center"
      >
        {/* 1. Large Conceptual Icon Wrapper */}
        <motion.div
          variants={itemVariants}
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F4F7FC] border border-black/5 text-[#1D44B7] dark:bg-[#0D0D0D] dark:border-white/10 dark:text-blue-500 shadow-sm mb-6 animate-pulse"
        >
          <LuShield size={36} aria-label="Scales of Justice Icon" role="img" />
        </motion.div>

        {/* 2. Giant Elegant Error Code Text */}
        <motion.h1
          variants={itemVariants}
          className="text-7xl sm:text-8xl font-sans font-black tracking-tight text-[#1D44B7] dark:text-blue-500 drop-shadow-sm select-none"
        >
          404
        </motion.h1>

        {/* 3. Primary Section Heading */}
        <motion.h2
          variants={itemVariants}
          className="mt-4 text-2xl sm:text-3xl font-serif font-bold text-[#1E3A60] dark:text-white tracking-tight"
        >
          Case File Not Found
        </motion.h2>

        {/* 4. Content Description Context Text */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm sm:text-base text-gray-500 dark:text-[#71717A] max-w-md leading-relaxed font-medium"
        >
          The page or legal document you are searching for might have been
          moved, archived, or temporarily dissolved.
        </motion.p>

        {/* 5. Dual Tactical Action Control Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto"
        >
          {/* Main Return CTA */}
          <Button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto font-semibold bg-[#1D44B7] hover:bg-[#153491] dark:bg-blue-600 dark:hover:bg-blue-700 text-white h-11 px-6 tracking-wide text-sm shadow-sm transition-colors flex items-center gap-2"
          >
            <FiHome size={16} />
            Back to Home
          </Button>

          {/* Secondary Structural Go Back Action */}
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto font-semibold border-default-200 hover:border-default-300 dark:border-default-100/30 bg-background dark:bg-[#0D0D0D] text-[#1E3A60] dark:text-default-400 h-11 px-6 text-sm flex items-center gap-2 transition-colors"
          >
            <FiArrowLeft size={16} />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
