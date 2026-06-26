import React from "react";
import ClientTransactionsClient from "./components/ClientTransactionsClient";
import { getUserSession } from "@/lib/core/core";
import { getClientTransactions } from "@/lib/api/client";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function ClientTransactionsPage({
  searchParams,
}: PageProps) {
  const user = await getUserSession();
  const clientEmail = user?.email;

  if (!clientEmail) {
    return (
      <div className="p-6 text-center text-default-400">Access Denied.</div>
    );
  }

  // Await search params securely on server runtime
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const page = Number(resolvedParams.page) || 1;

  // Execute protected fetch safely on the server side
  let initialData = {
    transactions: [],
    totalPages: 1,
    total: 0,
    page: 1,
    limit: 10,
  };
  try {
    initialData = await getClientTransactions(clientEmail, search, page, 10);
  } catch (err) {
    console.error("Server-side ledger acquisition crash:", err);
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ClientTransactionsClient
        clientEmail={clientEmail}
        initialData={initialData}
      />
    </div>
  );
}
