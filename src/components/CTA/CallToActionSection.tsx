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
        className="relative w-full rounded-3xl p-8 md:p-12 text-center overflow-hidden border border-default-200/50 dark:border-[#1E2530] bg-gradient-to-br from-blue-50/40 via-indigo-50/20 to-transparent dark:from-[#0F141C] dark:via-[#0D1117] dark:to-[#0A0D14] shadow-sm dark:shadow-2xl"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Ready to find your lawyer?
          </h2>

          <p className="text-sm md:text-base text-default-500 dark:text-default-400 font-medium max-w-lg mx-auto leading-relaxed">
            Join thousands of clients who resolved their legal matters with
            expert guidance.
          </p>

          <div className="pt-2">
            <Button
              onPress={() => router.push("/register")}
              className="h-12 px-8 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md hover:shadow-lg dark:hover:shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
