"use client";

import React from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  const router = useRouter();

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full rounded-[1.75rem] p-8 md:p-14 text-center overflow-hidden border border-border shadow-xl shadow-brand-500/5"
      >
        <div className="absolute inset-0 -z-0 bg-linear-to-br from-brand-500 via-[#1b2f6e] to-[#0a1230]" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-100/20 rounded-full blur-3xl pointer-events-none" />
        {/* Fine grid texture */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur">
            Get started today
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Ready to find your lawyer?
          </h2>

          <p className="text-sm md:text-base text-white/80 font-medium max-w-lg mx-auto leading-relaxed">
            Join thousands of clients who resolved their legal matters with
            expert guidance.
          </p>

          <div className="pt-2">
            <Button
              onPress={() => router.push("/register")}
              className="h-12 px-9 rounded-full text-sm font-bold text-[#0a1230] bg-gold-400 hover:bg-gold-300 shadow-lg shadow-black/20 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
