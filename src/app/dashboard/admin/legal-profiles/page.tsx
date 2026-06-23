import React from "react";
import { getAdminLawyerProfiles } from "@/lib/api/legalProfiles";
import ManageLawyersClient from "./ManageLawyersClient";

export default async function ManageLawyersPage() {
  const lawyers = await getAdminLawyerProfiles();

  return (
    <div className="w-full">
      <ManageLawyersClient initialLawyers={lawyers || []} />
    </div>
  );
}
