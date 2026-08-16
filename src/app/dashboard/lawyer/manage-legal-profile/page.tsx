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
  let profiles: any[] = [];
  try {
    profiles = (await getLawyerProfiles(user!.id)) || [];
  } catch (err) {
    console.error("Failed to load lawyer profiles:", err);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-foreground bg-background min-h-[90vh]">
      <ManageLegalClient
        user={lawyerUserData}
        initialProfiles={profiles || []}
      />
    </main>
  );
}
