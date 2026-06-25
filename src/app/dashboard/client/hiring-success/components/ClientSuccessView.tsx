"use client";

import React from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { LuSparkles } from "react-icons/lu";

interface Props {
  sessionId: string;
  customerEmail: string;
  lawyerEmail: string;
}

export default function ClientSuccessView({
  sessionId,
  customerEmail,
  lawyerEmail,
}: Props) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full bg-content1 border border-success-200 dark:border-success-900/30 p-8 text-center flex flex-col items-center gap-6 shadow-xl rounded-3xl">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-500 text-2xl font-bold shadow-inner">
          💼
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            Lawyer Hired Successfully!
          </h1>
          <p className="text-xs text-default-500 dark:text-default-400 leading-relaxed max-w-sm mx-auto">
            Your retainer payment has been approved! An escrow setup
            confirmation was transmitted to{" "}
            <span className="text-foreground font-semibold">
              {customerEmail}
            </span>
            .
          </p>
        </div>

        <div className="w-full bg-default-50 dark:bg-[#121212] border border-default-200 dark:border-neutral-800 p-4 rounded-xl text-left text-xs space-y-1.5 font-medium text-default-600 dark:text-default-400">
          <p>
            • <span className="font-bold text-foreground">Transaction ID:</span>{" "}
            {sessionId.substring(0, 18)}...
          </p>
          <p>
            • <span className="font-bold text-foreground">Hired Advocate:</span>{" "}
            {lawyerEmail}
          </p>
          <p>
            • <span className="font-bold text-foreground">Case Status:</span>{" "}
            Initialized / Active
          </p>
        </div>

        <Link href="/dashboard/client/hiring-history" className="w-full">
          <Button className="w-full bg-[#1D44B7] text-white text-xs font-bold rounded-xl h-11 shadow-md hover:bg-[#153491]">
            Track Hiring Status
          </Button>
        </Link>
      </Card>
    </div>
  );
}
