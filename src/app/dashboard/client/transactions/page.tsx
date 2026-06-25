import React from "react";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import ClientTransactionsClient from "./components/ClientTransactionsClient";

export const dynamic = "force-dynamic";

export default async function ClientTransactionsPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  const clientEmail = session?.data?.user?.email;

  if (!clientEmail) {
    return (
      <div className="p-6 text-center text-default-400">Access Denied.</div>
    );
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ClientTransactionsClient clientEmail={clientEmail} />
    </div>
  );
}
