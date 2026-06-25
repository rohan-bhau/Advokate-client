import React from "react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/core";
import PlansClientView from "./components/PlansClientView";

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-background">
        <div className="max-w-md w-full bg-content1 border border-default-200 p-8 text-center flex flex-col items-center gap-5 shadow-sm rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-default-100 flex items-center justify-center text-default-500">
            🔒
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-foreground">
              Authentication Required
            </h2>
            <p className="text-xs text-default-400 max-w-xs mx-auto leading-relaxed">
              Please sign in to your attorney account to access the lifetime
              legal directory profile plans.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full block bg-[#1D44B7] text-white text-xs font-bold rounded-xl h-10 shadow-sm hover:bg-[#153491] flex items-center justify-center transition-all"
          >
            Sign In to Account
          </Link>
        </div>
      </div>
    );
  }

  if (user.role !== "lawyer") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-background">
        <div className="max-w-md w-full bg-content1 border border-danger-200 dark:border-danger-900/40 p-8 text-center flex flex-col items-center gap-5 shadow-sm rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-danger-50 dark:bg-danger-950/40 border border-danger-200 dark:border-danger-900 flex items-center justify-center text-danger text-xl font-bold">
            ⚠️
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-foreground">
              Unauthorized Access
            </h2>
            <p className="text-xs text-default-400 max-w-xs mx-auto leading-relaxed">
              This directory premium ledger is strictly limited to verified
              legal consultants. Client accounts cannot purchase vendor
              listings.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="w-full block bg-default-100 text-default-600 text-xs font-bold rounded-xl h-10 hover:bg-default-200 flex items-center justify-center transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isAlreadyPaid = (user as any)?.plan === "premium";

  return <PlansClientView isAlreadyPaid={isAlreadyPaid} />;
}
