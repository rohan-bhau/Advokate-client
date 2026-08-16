import React from "react";
import { getAdminLawyerProfiles } from "@/lib/api/legalProfiles";
import ManageLawyersClient from "./components/ManageLawyersClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ManageLawyersPage() {
  let lawyers: any[] = [];
  try {
    lawyers = (await getAdminLawyerProfiles()) || [];
  } catch (err) {
    console.error("Failed to load lawyer profiles:", err);
  }

  return (
    <div className="w-full">
      <ManageLawyersClient initialLawyers={lawyers || []} />
    </div>
  );
}
