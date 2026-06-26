import React from "react";
import TransactionsClient from "./components/TransactionsClient";
import { getLawyerTransactions } from "@/lib/api/transactions";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function AllTransactionsPage({ searchParams }: PageProps) {
  // Await search parameters safely on server side
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 10;

  // Execute data fetching via safe protected/server fetch on the server side
  let initialData = {
    transactions: [],
    totalPages: 1,
    total: 0,
    page: 1,
    limit: 10,
  };
  try {
    initialData = await getLawyerTransactions(search, page, limit);
  } catch (err) {
    console.error("Server-side admin verification ledger crash:", err);
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TransactionsClient initialData={initialData} />
    </div>
  );
}
