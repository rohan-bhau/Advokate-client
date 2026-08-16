"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "@gravity-ui/icons";

export default function HeroContent() {
  const router = useRouter();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
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
      {/* Eyebrow badge */}
      <motion.span
        variants={itemVariants}
        className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-500 dark:border-brand-100/20 dark:bg-brand-100/10 dark:text-brand-700"
      >
        <ShieldCheck className="size-3.5" />
        Verified legal professionals
      </motion.span>

      {/* Main heading */}
      <motion.h1
        variants={itemVariants}
        className="mt-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
      >
        Find &amp; Hire
        <br />
        <span className="text-gradient-brand mt-1 block font-sans font-extrabold tracking-tight">
          Expert Legal Counsel
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-lg text-base font-medium leading-relaxed text-muted sm:text-lg"
      >
        Connecting clients with verified and experienced lawyers for all your
        legal needs — with secure, transparent hiring and payments.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        className="mt-9 flex flex-wrap items-center gap-4"
      >
        <Button
          onClick={() => router.push("/browse-lawyer")}
          className="h-12 rounded-full bg-brand-500 px-8 text-sm font-semibold tracking-wide text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.98]"
        >
          Browse Lawyers
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push("/register")}
          className="h-12 rounded-full border border-border bg-surface/60 px-6 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-brand-100 hover:bg-surface"
        >
          Get Started
        </Button>
      </motion.div>

      {/* Trust stats */}
      <motion.div
        variants={itemVariants}
        className="mt-12 grid max-w-md grid-cols-3 gap-4"
      >
        {[
          { value: "500+", label: "Verified Lawyers" },
          { value: "4.9/5", label: "Average Rating" },
          { value: "100%", label: "Secure Payments" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-foreground">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-muted">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
