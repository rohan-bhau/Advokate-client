import React from "react";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import LawyerTransactionsClient from "./components/LawyerTransactionsClient";
import { getLawyerTransactions } from "@/lib/api/lawyer";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function LawyerTransactionsPage({
  searchParams,
}: PageProps) {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  const lawyerEmail = session?.data?.user?.email;

  if (!lawyerEmail) {
    return (
      <div className="p-6 text-center text-default-400">Access Denied.</div>
    );
  }

  // Await incoming search parameters safely on server runtime
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const page = Number(resolvedParams.page) || 1;

  // Execute safe server-side transaction fetch
  let initialData = {
    transactions: [],
    totalPages: 1,
    total: 0,
    page: 1,
    limit: 10,
  };
  try {
    initialData = await getLawyerTransactions(lawyerEmail, search, page, 10);
  } catch (err) {
    console.error("Server-side lawyer ledger query crash:", err);
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LawyerTransactionsClient
        lawyerEmail={lawyerEmail}
        initialData={initialData}
      />
    </div>
  );
}
