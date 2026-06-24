import React, { Suspense } from "react";
import LawyerDetailsClient from "./LawyerDetailsClient";
import { getLawyers, getSingleLawyerProfile } from "@/lib/api/legalProfiles";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LawyerDetailPage({ params }: Props) {
  const { id } = await params;

  const lawyerData = await getSingleLawyerProfile(id);

  const allApprovedLawyersResponse = await getLawyers("?limit=100");
  // console.log(allApprovedLawyersResponse)
  const allLawyers = allApprovedLawyersResponse?.lawyers || [];
  console.log(allLawyers);

  const currentLawyerIdStr =
    lawyerData &&
    lawyerData._id &&
    typeof lawyerData._id === "object" &&
    "$oid" in lawyerData._id
      ? lawyerData._id.$oid
      : lawyerData?._id || id;

const filteredRelatedLawyers = allLawyers
  .filter((l: any) => {
    const lIdStr =
      l._id && typeof l._id === "object" && "$oid" in l._id
        ? l._id.$oid
        : l._id || l.id;
    return (
      l.specialization === lawyerData?.specialization &&
      lIdStr !== currentLawyerIdStr
    );
  })
  .slice(0, 6);
  // && lIdStr !== currentLawyerIdStr;
  console.log(filteredRelatedLawyers);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <Suspense
        fallback={
          <div className="text-center py-20 text-xs text-default-400 animate-pulse">
            Loading core index directory...
          </div>
        }
      >
        <LawyerDetailsClient
          lawyer={lawyerData}
          relatedLawyers={filteredRelatedLawyers}
        />
      </Suspense>
    </div>
  );
}
