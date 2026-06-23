import React from "react";
import { getSingleLawyerProfile } from "@/lib/api/legalProfiles";
import EditLegalProfileForm from "./EditLegalProfileForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLegalProfilePage({ params }: Props) {
  const { id } = await params;
  const profileData = await getSingleLawyerProfile(id);

  return (
    <main className="w-full">
      <EditLegalProfileForm initialData={profileData} profileId={id} />
    </main>
  );
}
