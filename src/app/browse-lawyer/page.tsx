import React, { Suspense } from "react";
import BrowseLawyersClient from "./BrowseLawyersClient";

export default function BrowseLawyersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-background text-default-400">
            Loading system context directory...
          </div>
        }
      >
        <BrowseLawyersClient />
      </Suspense>
    </main>
  );
}
