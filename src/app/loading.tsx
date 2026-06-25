"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/70 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-content1/80 border border-default-100 shadow-xl max-w-xs w-full text-center">
        <Spinner size="lg" color="accent" />

        <div className="space-y-1">
          <h3 className="text-sm font-black text-foreground tracking-tight">
            Synchronizing Secure Pipeline
          </h3>
          <p className="text-[11px] text-default-400 font-medium">
            Please wait while we encrypt and anchor your legal terminal...
          </p>
        </div>
      </div>
    </div>
  );
}
