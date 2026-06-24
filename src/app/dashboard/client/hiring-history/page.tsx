import React, { Suspense } from "react";
import { getUserSession, requireRole } from "@/lib/core/core";
import ClientHiringClient from "./components/ClientHiringClient";
import { getClientHiringRequests } from "@/lib/api/hiringRequest";

export const dynamic = "force-dynamic";

export default async function ClientHiringHistoryPage() {
  await requireRole("client");
  const user = await getUserSession();

  const requests = user?.email ? await getClientHiringRequests(user.email) : [];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-background">
      <Suspense fallback={<ClientHiringSkeleton />}>
        <ClientHiringClient initialRequests={requests} />
      </Suspense>
    </div>
  );
}

function ClientHiringSkeleton() {
  return (
    <div className="space-y-6 text-foreground bg-background w-full animate-pulse">
      {/* Skeleton header*/}
      <div>
        <div className="h-7 bg-default-200 w-1/4 rounded-lg mb-2" />
        <div className="h-4 bg-default-100 w-2/5 rounded-md" />
      </div>

      {/* search and filter skeleton */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-content1 border border-default-100 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="w-full sm:w-72 h-10 bg-default-200 rounded-xl" />
          <div className="w-full sm:w-44 h-10 bg-default-200 rounded-xl" />
        </div>
        <div className="w-40 h-8 bg-default-100 rounded-xl hidden lg:block" />
      </div>

      {/*table structure skeleton*/}
      <div className="border border-default-100 rounded-2xl overflow-hidden bg-content1 shadow-sm">
        {/* table header */}
        <div className="grid grid-cols-7 gap-4 p-4 bg-default-50 border-b border-default-100">
          <div className="h-4 bg-default-200 rounded w-2/3" />
          <div className="h-4 bg-default-200 rounded w-3/4" />
          <div className="h-4 bg-default-200 rounded w-1/2" />
          <div className="h-4 bg-default-200 rounded w-2/3" />
          <div className="h-4 bg-default-200 rounded w-1/2" />
          <div className="h-4 bg-default-200 rounded w-1/2" />
          <div className="h-4 bg-default-200 rounded w-1/3" />
        </div>

        <div className="divide-y divide-default-100">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 p-4 items-center"
            >
              {/* Lawyer Name/Email */}
              <div className="space-y-1.5">
                <div className="h-4 bg-default-200 rounded w-4/5" />
                <div className="h-3 bg-default-100 rounded w-3/5" />
              </div>
              {/* Specialisation */}
              <div className="h-4 bg-default-200 rounded w-2/3" />
              {/* Hourly Fee */}
              <div className="h-4 bg-default-200 rounded w-1/2 font-bold" />
              {/* Hiring Date */}
              <div className="h-4 bg-default-100 rounded w-3/4" />
              {/* Proposal Status */}
              <div className="h-6 bg-default-200 rounded-lg w-16" />
              {/* Payment Status */}
              <div className="h-6 bg-default-100 rounded-lg w-14" />
              {/* Action Button */}
              <div className="h-8 bg-default-200 rounded-lg w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}