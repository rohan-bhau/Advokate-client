import React, { Suspense } from "react";
import BrowseLawyersClient from "./BrowseLawyersClient";
import { getLawyers } from "@/lib/api/legalProfiles";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    availability?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function BrowseLawyersPage({ searchParams }: PageProps) {
  // Await incoming search parameters safely on server side
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "all";
  const availability = resolvedParams.availability || "all";
  const sort = resolvedParams.sort || "default";
  const page = resolvedParams.page || "1";

  // Construct query string for express backend aggregation loop
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (category !== "all") query.set("category", category);
  if (availability !== "all") query.set("availability", availability);
  if (sort !== "default") query.set("sort", sort);
  query.set("page", page);
  query.set("limit", "8");

  // Execute safe server-side aggregate query
  let initialData = { lawyers: [], total: 0, totalPages: 1 };
  try {
    initialData = await getLawyers(`?${query.toString()}`);
  } catch (err) {
    console.error("Server-side lawyer directory query crash:", err);
  }

  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="space-y-8 bg-background text-foreground min-h-screen p-4 sm:p-8 animate-pulse">
            {/* Title Header Skeleton */}
            <div>
              <div className="h-3 w-16 bg-default-200 rounded mb-2" />
              <div className="h-9 w-64 bg-default-200 rounded-xl mb-2" />
              <div className="h-4 w-40 bg-default-200 rounded" />
            </div>

            {/* Filter Bar Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center bg-content1 border border-default-200/60 p-4 rounded-2xl shadow-md">
              <div className="h-12 bg-default-100 rounded-xl lg:col-span-2" />
              <div className="h-12 bg-default-100 rounded-xl" />
              <div className="h-12 bg-default-100 rounded-xl" />
              <div className="h-12 bg-default-100 rounded-xl" />
            </div>

            {/* Grid Architecture Skeleton Stack */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-content1 border border-default-100 rounded-2xl flex flex-col justify-between overflow-hidden h-[210px]"
                >
                  <div className="p-4 sm:p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className="flex items-center gap-3 min-w-0 w-full">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3 w-full">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-default-200 rounded-full flex-shrink-0" />
                          <div className="flex flex-col gap-2 w-full">
                            <div className="h-4 bg-default-200 rounded w-3/4" />
                            <div className="h-3 bg-default-200 rounded w-1/2" />
                          </div>
                        </div>
                      </div>
                      <div className="h-5 w-14 bg-default-200 rounded-full flex-shrink-0" />
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="h-3.5 bg-default-200 rounded w-1/3" />
                      <div className="h-3.5 bg-default-200 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="border-t border-default-100 bg-default-50/50 px-4 sm:px-5 py-3 flex items-center justify-between h-12">
                    <div className="h-5 bg-default-200 rounded w-16" />
                    <div className="h-3 bg-default-200 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <BrowseLawyersClient initialData={initialData} />
      </Suspense>
    </main>
  );
}
