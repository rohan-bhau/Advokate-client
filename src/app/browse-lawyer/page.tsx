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
          <div className="flex items-center justify-center min-h-screen bg-background text-default-400">
            Loading system context directory...
          </div>
        }
      >
        <BrowseLawyersClient initialData={initialData} />
      </Suspense>
    </main>
  );
}
