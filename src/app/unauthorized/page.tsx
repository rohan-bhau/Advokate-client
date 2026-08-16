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
        <div className="relative w-20 h-20 bg-danger-500/10 border border-danger-500/20 rounded-2xl flex items-center justify-center text-danger shadow-md shadow-danger-500/5">
          <ShieldExclamation className="size-10 stroke-[1.5]" />
        </div>
      </div>

      {/* Error Message Header Section */}
      <div className="text-center max-w-md mx-auto space-y-3">
        <span className="text-xs font-bold text-danger uppercase tracking-widest bg-danger-500/10 px-3 py-1 rounded-full border border-danger-500/20">
          Error 403
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground dark:text-white pt-1">
          Access Denied
        </h1>
        <p className="text-sm font-medium text-muted leading-relaxed">
          You do not have the required permissions to view this secure legal
          chamber. Please verify your credentials or contact the administrator.
        </p>
      </div>

      {/* Decorative Separator Loop */}
      <div className="w-16 h-0.5 bg-border my-8 rounded-full" />

      {/* Action Navigation Controls Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Button
          variant="outline"
          onPress={() => router.back()}
          className="border-border text-muted hover:text-brand-500 dark:hover:text-brand-600 rounded-xl h-12 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-sm"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </Button>

        <Button
          onPress={() => router.push("/")}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl h-12 px-6 text-sm flex items-center justify-center gap-2 shadow-md transition-all w-full sm:w-auto"
        >
          <House className="size-4" />
          Return Home
        </Button>
      </div>

      {/* Bottom Legal Identification Tag */}
      <div className="mt-16 text-[11px] font-medium text-muted select-none">
        Advokate Security Gateway Secured &bull; Secure Protocol
      </div>
    </div>
  );
}
