"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { Star, Clock, Briefcase, Calendar } from "@gravity-ui/icons";
import { SPECIALIZATIONS } from "../../../dashboard/lawyer/manage-legal-profile/specializations";
import { HireLawyerModal } from "./HireLawyerModal";
import { GrLocation } from "react-icons/gr";
import { RelatedLawyers } from "./RelatedLawyers";
import LawyerReviewsSection from "./LawyerReviewsSection";

interface ReviewItem {
  _id?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  lawyerId: string;
  rating: number;
  comment: string;
  createdAt: any;
}

interface LawyerDetailsProps {
  lawyer: {
    _id: string | { $oid: string };
    professionalName: string;
    specialization: string;
    hourlyFee: string;
    location: string;
    bio: string;
    details: string;
    image: string;
    availabilityStatus: "Available" | "Busy";
    createdAt: any;
    lawyerEmail?: string;
  };
  relatedLawyers: any[];
  currentUser: { id: string; name: string; email: string; role: string } | null;
  initialHasApplied: boolean;
  initialReviews?: any[];
  hiringStatus?: "pending" | "accepted" | "rejected" | null;
  totalHires: number; 
  casesWon: number;
}

export default function LawyerDetailsClient({
  lawyer,
  relatedLawyers,
  currentUser,
  initialHasApplied,
  initialReviews = [],
  hiringStatus = null,
  totalHires, 
  casesWon,
}: LawyerDetailsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [hasApplied, setHasApplied] = useState(initialHasApplied);

  const getLawyerIdStr = () => {
    return typeof lawyer._id === "object" && "$oid" in lawyer._id
      ? lawyer._id.$oid
      : (lawyer._id as string);
  };

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const formatExactDate = (dateData: any) => {
    try {
      const rawDate =
        dateData && typeof dateData === "object" && "$date" in dateData
          ? dateData.$date
          : dateData;
      if (!rawDate) return "N/A";
      return new Date(rawDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const isBusy = lawyer.availabilityStatus === "Busy";

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* left side profile card */}
        <div className="flex flex-col gap-6">
          <Card className="card-surface p-6 flex flex-col items-center text-center overflow-hidden relative">
            {/* Subtle top accent band */}
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-br from-brand-100/60 via-transparent to-transparent dark:from-brand-100/10" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-surface border border-border mb-4 shadow-lg shadow-brand-500/10">
              <Image
                src={
                  lawyer.image ||
                  "https://i.ibb.co/nNXjDpC7/linkedi-2-Photoroom.png"
                }
                alt={lawyer.professionalName}
                fill
                className="object-cover"
                priority
              />
            </div>

            <h2 className="text-xl font-bold text-foreground truncate w-full">
              {lawyer.professionalName}
            </h2>

            <p className="text-xs font-semibold text-brand-500 dark:text-brand-600 mt-1">
              {SPECIALIZATIONS.find((s) => s.value === lawyer.specialization)
                ?.label || lawyer.specialization}
            </p>

            <div className="flex items-center gap-1 text-gold-500 text-xs font-bold mt-2">
              <Star className="size-3.5 fill-current" />
              <span>{averageRating}</span>
              <span className="text-muted font-normal">
                ({reviews.length} reviews)
              </span>
            </div>

            <hr className="hairline-gradient my-4 w-full" />

            <div className="w-full space-y-3 text-left text-xs text-muted font-medium">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-content2">
                  <Clock className="size-3.5 text-brand-500 dark:text-brand-600" />
                </span>
                <span>
                  Hourly Rate:{" "}
                  <b className="text-foreground">
                    ${Number(lawyer.hourlyFee).toString()}/hr
                  </b>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-content2">
                  <GrLocation className="size-3.5 text-brand-500 dark:text-brand-600" />
                </span>
                <span className="truncate">
                  {lawyer.location || "Dhaka, Bangladesh"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-content2">
                  <Briefcase className="size-3.5 text-brand-500 dark:text-brand-600" />
                </span>
                <span className="flex items-center gap-1.5">
                  Status:
                  <Chip
                    size="sm"
                    variant="soft"
                    color={isBusy ? "danger" : "success"}
                    className="h-5 text-[10px] font-bold"
                  >
                    {lawyer.availabilityStatus}
                  </Chip>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-content2">
                  <Calendar className="size-3.5 text-brand-500 dark:text-brand-600" />
                </span>
                <span>
                  Joined Date:{" "}
                  <b className="text-foreground">
                    {formatExactDate(lawyer.createdAt)}
                  </b>
                </span>
              </div>
            </div>

            <HireLawyerModal
              lawyer={lawyer}
              currentUser={currentUser}
              hasApplied={hasApplied}
              setHasApplied={setHasApplied}
              isBusy={isBusy}
            />
          </Card>
        </div>

        {/* right side information and review block */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card className="card-surface p-4 rounded-xl text-center">
              <p className="text-3xl font-extrabold text-foreground">
                {totalHires}
              </p>
              <p className="text-[11px] text-muted font-medium mt-1 uppercase tracking-wider">
                Total Hires
              </p>
            </Card>
            <Card className="card-surface p-4 rounded-xl text-center">
              <p className="text-3xl font-extrabold text-emerald-500">
                {casesWon}
              </p>
              <p className="text-[11px] text-muted font-medium mt-1 uppercase tracking-wider">
                Cases Won
              </p>
            </Card>
            <Card className="card-surface p-4 rounded-xl text-center col-span-2 sm:col-span-1">
              <p className="text-3xl font-extrabold text-gold-500">
                {reviews.length}
              </p>
              <p className="text-[11px] text-muted font-medium mt-1 uppercase tracking-wider">
                Reviews
              </p>
            </Card>
          </div>

          <Card className="card-surface p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-foreground">
              About
            </h3>
            <p className="text-xs text-muted leading-relaxed italic bg-content2 p-4 rounded-xl border border-border break-words">
              &ldquo;{lawyer.bio}&rdquo;
            </p>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-foreground">
                Litigation Experience &amp; Scope
              </h4>
              <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
                {lawyer.details}
              </p>
            </div>
          </Card>

          <LawyerReviewsSection
            lawyerId={
              typeof lawyer._id === "object" && "$oid" in lawyer._id
                ? lawyer._id.$oid
                : lawyer._id
            }
            lawyerEmail={lawyer.lawyerEmail || ""}
            currentUser={currentUser}
            hiringStatus={hiringStatus as any}
            initialReviews={reviews}
            onReviewAdded={(newReview) =>
              setReviews((prev) => [newReview, ...prev])
            }
          />
        </div>
      </div>

      <RelatedLawyers
        relatedLawyers={relatedLawyers}
        currentSpecialization={lawyer.specialization}
      />
    </div>
  );
}
