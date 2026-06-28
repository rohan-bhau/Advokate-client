"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background gap-3">
      <Spinner size="lg" color="accent"  />
      <p className="text-xs font-semibold text-default-400 tracking-wider uppercase">
        Loading...
      </p>
    </div>
  );
}
