import React from "react";
import { getLawyerDashboardMetrics } from "@/lib/api/lawyer";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import LawyerDashboardClientView from "./components/LawyerDashboardClientView";

export const dynamic = "force-dynamic";

export default async function LawyerDashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  const lawyerEmail = session?.data?.user?.email;

  if (!lawyerEmail) {
    return (
      <div className="p-6 text-center text-default-400 text-sm">
        Unauthorized access. Please log in as a practitioner.
      </div>
    );
  }

  const data = await getLawyerDashboardMetrics(lawyerEmail);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Welcome back, {session?.data?.user?.name || "Counsel"}! 👋
        </h1>
        <p className="text-xs text-default-400">
          Here's what's happening with your legal practice.
        </p>
      </div>

      <LawyerDashboardClientView data={data} />
    </div>
  );
}
