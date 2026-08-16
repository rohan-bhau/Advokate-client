"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Star } from "@gravity-ui/icons";

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

  const imageSrc =
    currentTheme === "dark" ? "/hero/hero-scales-dark.jpg" : "/hero/hero-law-desk.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden lg:block"
    >
      {/* Framed hero visual */}
      <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-2xl shadow-brand-500/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-[4/5] w-full"
          >
            <Image
              src={imageSrc}
              alt="Legal professionals at work"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 420px"
              className="object-cover"
            />
            {/* Elegant gradient frame overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold tracking-wide text-brand-500 backdrop-blur">
            <ShieldCheck className="size-3.5" />
            Trusted by clients &amp; law firms
          </span>
        </div>
      </div>

      {/* Floating rating badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -left-6 top-10 rounded-2xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-gold-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </div>
        </div>
        <p className="mt-1.5 text-lg font-extrabold text-foreground">4.9 / 5</p>
        <p className="text-[11px] font-medium text-muted">
          Client satisfaction
        </p>
      </motion.div>

      {/* Floating availability badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="absolute -right-5 bottom-24 flex items-center gap-3 rounded-2xl border border-border bg-surface/95 p-3.5 pr-5 shadow-xl backdrop-blur"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">48 Available</p>
          <p className="text-[11px] font-medium text-muted">this week</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
