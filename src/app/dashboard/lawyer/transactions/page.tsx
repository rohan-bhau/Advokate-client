import React from "react";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import LawyerTransactionsClient from "./components/LawyerTransactionsClient";

export const dynamic = "force-dynamic";

export default async function LawyerTransactionsPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  const lawyerEmail = session?.data?.user?.email;

  if (!lawyerEmail) {
    return (
      <div className="p-6 text-center text-default-400">Access Denied.</div>
    );
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LawyerTransactionsClient lawyerEmail={lawyerEmail} />
    </div>
  );
}
