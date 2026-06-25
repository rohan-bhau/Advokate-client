import React from "react";
import TransactionsClient from "./components/TransactionsClient";

export const dynamic = "force-dynamic";

export default function AllTransactionsPage() {
  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <TransactionsClient />
    </div>
  );
}
