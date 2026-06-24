import React, { Suspense } from "react";
import { getUserSession } from "@/lib/core/core";
import LawyerDetailsClient from "./components/LawyerDetailsClient";
import { getLawyers, getSingleLawyerProfile } from "@/lib/api/legalProfiles";
import { checkHiringStatus, getLawyerStats } from "@/lib/api/hiringRequest";
import { getLawyerReviews } from "@/lib/api/reviews";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LawyerDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await getUserSession();
  const initialReviewsData = await getLawyerReviews(id).catch(() => []);

  const lawyerData = await getSingleLawyerProfile(id);
  const allApprovedLawyersResponse = await getLawyers("?limit=100");
  const allLawyers = allApprovedLawyersResponse?.lawyers || [];


  

  let hasApplied = false;
  let hiringStatus = null;
  if (user?.id) {
    const statusRes = await checkHiringStatus(id, user.id);
    hasApplied = statusRes?.hasApplied || false;
    hiringStatus = statusRes?.status || null;
  }

  const stats = lawyerData?.lawyerEmail
    ? await getLawyerStats(lawyerData.lawyerEmail).catch(() => ({
        totalHires: 0,
        casesWon: 0,
      }))
    : { totalHires: 0, casesWon: 0 };

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
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <Suspense fallback={<LawyerDetailSkeleton />}>
        <LawyerDetailsClient
          lawyer={lawyerData}
          relatedLawyers={filteredRelatedLawyers}
          currentUser={
            user
              ? {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role || "",
                }
              : null
          }
          initialHasApplied={hasApplied}
          initialReviews={initialReviewsData || []}
          hiringStatus={hiringStatus}
          totalHires={stats?.totalHires || 0}
          casesWon={stats?.casesWon || 0}
        />
      </Suspense>
    </div>
  );
}

function LawyerDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side profile Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="bg-content1 border border-default-100 p-6 rounded-2xl flex flex-col items-center text-center h-[420px]">
            <div className="w-32 h-32 rounded-full bg-default-200 mb-4" />
            <div className="h-5 bg-default-200 w-3/4 rounded-md mb-2" />
            <div className="h-3 bg-default-200 w-1/2 rounded-md mb-4" />
            <div className="h-4 bg-default-200 w-1/3 rounded-md mb-6" />

            <div className="w-full border-t border-default-100 my-4 opacity-50" />

            <div className="w-full space-y-3">
              <div className="h-3 bg-default-200 w-full rounded-sm" />
              <div className="h-3 bg-default-200 w-5/6 rounded-sm" />
              <div className="h-3 bg-default-200 w-4/5 rounded-sm" />
              <div className="h-3 bg-default-200 w-full rounded-sm" />
            </div>
            <div className="w-full h-11 bg-default-200 rounded-xl mt-6" />
          </div>
        </div>

        {/* right side information and review block*/}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* counter matrix grid*/}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="h-[76px] bg-content1 border border-default-100 rounded-xl" />
            <div className="h-[76px] bg-content1 border border-default-100 rounded-xl" />
            <div className="h-[76px] bg-content1 border border-default-100 rounded-xl col-span-2 sm:col-span-1" />
          </div>

          {/* About card skeleton */}
          <div className="bg-content1 border border-default-100 p-5 rounded-2xl h-[220px] space-y-4">
            <div className="h-4 bg-default-200 w-1/6 rounded-md" />
            <div className="h-14 bg-default-200 w-full rounded-xl" />
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-default-200 w-1/4 rounded-md" />
              <div className="h-3 bg-default-200 w-full rounded-md" />
              <div className="h-3 bg-default-200 w-5/6 rounded-md" />
            </div>
          </div>

          {/* review card skeleton */}
          <div className="bg-content1 border border-default-100 p-5 rounded-2xl h-[180px] space-y-4">
            <div className="h-4 bg-default-200 w-1/5 rounded-md" />
            <div className="h-10 bg-default-200 w-full rounded-xl" />
            <div className="h-14 bg-default-200 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* suggested lawyer section */}
      <div className="space-y-4 pt-6 border-t border-default-100">
        <div className="h-4 bg-default-200 w-1/4 rounded-md" />
        <div className="h-3 bg-default-200 w-1/3 rounded-md mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="h-32 bg-content1 border border-default-100 rounded-2xl" />
          <div className="h-32 bg-content1 border border-default-100 rounded-2xl" />
          <div className="h-32 bg-content1 border border-default-100 rounded-2xl hidden sm:block" />
          <div className="h-32 bg-content1 border border-default-100 rounded-2xl hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
