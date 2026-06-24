import React, { Suspense } from "react";
import LawyerHiringClient from "./components/LawyerHiringClient";
import { getLawyerHiringRequests } from "@/lib/api/hiringRequest";
import { getUserSession, requireRole } from "@/lib/core/core";

export const dynamic = "force-dynamic";

export default async function LawyerHiringRequestsPage() {
  await requireRole("lawyer");
  const user = await getUserSession();

const requests = user?.email ? await getLawyerHiringRequests(user.email) : [];
    console.log(requests)

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="text-center py-20 text-xs text-default-400 animate-pulse">
            Loading hiring history grid...
          </div>
        }
      >
        <LawyerHiringClient initialRequests={requests} />
      </Suspense>
    </div>
  );
}
