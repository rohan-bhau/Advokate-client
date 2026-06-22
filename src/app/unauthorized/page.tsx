"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowLeft, House, ShieldExclamation } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-background text-foreground px-4 sm:px-6 py-12 transition-colors duration-200">
      {/* Decorative Vector & Icon Container */}
      <div className="relative mb-8 flex flex-col items-center">
        {/* Glow Background Effect */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-danger-500/20 to-warning-500/20 blur-xl opacity-75 dark:opacity-40 animate-pulse" />

        {/* Shield Icon Box */}
        <div className="relative w-20 h-20 bg-danger-50 dark:bg-danger-950/30 border border-danger-200/50 dark:border-danger-900/40 rounded-2xl flex items-center justify-center text-danger shadow-md shadow-danger-500/5">
          <ShieldExclamation className="size-10 stroke-[1.5]" />
        </div>
      </div>

      {/* Error Message Header Section */}
      <div className="text-center max-w-md mx-auto space-y-3">
        <span className="text-xs font-bold text-danger uppercase tracking-widest bg-danger-50 dark:bg-danger-950/40 px-3 py-1 rounded-full border border-danger-200/30 dark:border-danger-900/30">
          Error 403
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B3A75] dark:text-white pt-1">
          Access Denied
        </h1>
        <p className="text-sm font-medium text-default-500 dark:text-default-400 leading-relaxed">
          You do not have the required permissions to view this secure legal
          chamber. Please verify your credentials or contact the administrator.
        </p>
      </div>

      {/* Decorative Separator Loop */}
      <div className="w-16 h-0.5 bg-default-100 dark:bg-zinc-800/60 my-8 rounded-full" />

      {/* Action Navigation Controls Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Button
          variant="outline"
          onPress={() => router.back()}
          className="border-default-200 text-default-600 hover:text-[#1D44B7] dark:hover:text-blue-400 rounded-xl h-12 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-sm"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </Button>

        <Button
          onPress={() => router.push("/")}
          className="bg-[#1D44B7] hover:bg-[#153491] text-white font-semibold rounded-xl h-12 px-6 text-sm flex items-center justify-center gap-2 shadow-md transition-all w-full sm:w-auto"
        >
          <House className="size-4" />
          Return Home
        </Button>
      </div>

      {/* Bottom Legal Identification Tag */}
      <div className="mt-16 text-[11px] font-medium text-default-400 dark:text-zinc-500 select-none">
        Advokate Security Gateway Secured &bull; Secure Protocol
      </div>
    </div>
  );
}
