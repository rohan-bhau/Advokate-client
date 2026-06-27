"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroActions() {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="flex flex-wrap items-center gap-4 mt-8"
    >

        <Button onClick={()=>router.push("/browse-lawyer")} className="font-semibold  bg-[#1D44B7] hover:bg-[#153491] dark:bg-blue-600 dark:hover:bg-blue-700 text-white h-12 px-8 tracking-wide text-sm shadow-md transition-colors">
          Browse Lawyers
        </Button>


      <Button
        variant="outline"
        className="font-semibold  border-default-200 hover:border-default-400 dark:border-default-700 bg-background/50 text-foreground h-12 px-6 text-sm flex items-center gap-2 transition-colors"
      >
        {/* Modern play icon geometry */}
        <svg
          className="w-4 h-4 text-[#1D44B7] dark:text-blue-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        How it works
      </Button>
    </motion.div>
  );
}
