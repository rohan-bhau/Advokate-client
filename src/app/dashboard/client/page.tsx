import React from "react";
import { getClientDashboardMetrics } from "@/lib/api/client";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import ClientDashboardClientView from "./components/ClientDashboardClientView";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  const clientEmail = session?.data?.user?.email;

  if (!clientEmail) {
    return (
      <div className="p-6 text-center text-default-400 text-sm">
        Unauthorized. Please log in as a user.
      </div>
    );
  }

  const data = await getClientDashboardMetrics(clientEmail);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Welcome back, {session?.data?.user?.name || "Client"}! 👋
        </h1>
        <p className="text-xs text-default-400">
          Here's what's happening with your legal activities.
        </p>
      </div>

      <ClientDashboardClientView data={data} />
    </div>
  );
}
