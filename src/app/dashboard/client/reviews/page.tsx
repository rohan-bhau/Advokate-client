import React, { Suspense } from "react";
import { getUserSession, requireRole } from "@/lib/core/core";
import ClientReviewsClient from "./components/ClientReviewsClient";
import { getClientReviews } from "@/lib/api/reviews";

export const dynamic = "force-dynamic";

export default async function ClientReviewsPage() {
  await requireRole("client");
  const user = await getUserSession();

  const myReviews = user?.email ? await getClientReviews(user.email) : [];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-background">
      <Suspense fallback={<ClientReviewsSkeleton />}>
        <ClientReviewsClient initialReviews={myReviews} />
      </Suspense>
    </div>
  );
}

function ClientReviewsSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      <div>
        <div className="h-7 bg-default-200 w-1/4 rounded-lg mb-2" />
        <div className="h-4 bg-default-100 w-2/5 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-content1 border border-default-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 h-[190px]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5 w-3/4">
                  <div className="h-3 bg-default-100 w-1/3 rounded" />
                  <div className="h-4 bg-default-200 w-4/5 rounded-md" />
                </div>
                <div className="h-6 bg-default-200 rounded-lg w-10 shrink-0" />
              </div>

              <div className="bg-default-50 dark:bg-default-100/5 p-3 rounded-xl border border-default-100/50 space-y-2 h-[75px]">
                <div className="h-3 bg-default-200 w-full rounded" />
                <div className="h-3 bg-default-200 w-5/6 rounded" />
                <div className="h-3 bg-default-100 w-1/2 rounded" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-default-100/60 w-full">
              <div className="h-3 bg-default-100 w-1/4 rounded" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-default-200 rounded-lg" />
                <div className="h-8 w-8 bg-default-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
