import React from "react";
import ManageLegalClient from "./ManageLegalClient";
import { getUserSession } from "@/lib/core/core";
import { getLawyerProfiles } from "@/lib/api/legalProfiles";

export default async function ManageLegalProfilePage() {
  const user = await getUserSession();

  const lawyerUserData = {
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "lawyer",
  };
  const profiles = await getLawyerProfiles(user!.id)
  console.log(profiles)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-foreground bg-background min-h-screen">
      <ManageLegalClient
        user={lawyerUserData}
        initialProfiles={profiles || []}
      />
    </main>
  );
}
