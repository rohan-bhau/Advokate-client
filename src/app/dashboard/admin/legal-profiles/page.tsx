import React from "react";
import { getAdminLawyerProfiles } from "@/lib/api/legalProfiles";
import ManageLawyersClient from "./components/ManageLawyersClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ManageLawyersPage() {
  const lawyers = await getAdminLawyerProfiles();

  return (
    <div className="w-full">
      <ManageLawyersClient initialLawyers={lawyers || []} />
    </div>
  );
}
