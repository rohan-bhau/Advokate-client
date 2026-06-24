"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, Button, Chip, Separator } from "@heroui/react";
import {
  Star,
  Clock,
  Briefcase,
  Calendar,
} from "@gravity-ui/icons";
import { SPECIALIZATIONS } from "../../dashboard/lawyer/manage-legal-profile/specializations";
import { RelatedLawyers } from "./RelatedLawyers"; 
import { GrLocation } from "react-icons/gr";
import { BsInfoCircle } from "react-icons/bs";



interface ReviewItem {
  clientName: string;
  rating: number;
  comment: string;
  date: string;
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
  };
  relatedLawyers: any[]; 
}

export default function LawyerDetailsClient({
  lawyer,
  relatedLawyers,
}: LawyerDetailsProps) {
  const [totalHires] = useState(0);
  const [casesWon] = useState(0);
  const [reviews] = useState<ReviewItem[]>([]);

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

  const handleHireClick = () => {
    const idStr =
      lawyer._id && typeof lawyer._id === "object" && "$oid" in lawyer._id
        ? lawyer._id.$oid
        : lawyer._id;
    console.log(`Hire button clicked for lawyer ID: ${idStr}`);
  };

  const isBusy = lawyer.availabilityStatus === "Busy";

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* left side profile card */}
        <div className="flex flex-col gap-6">
          <Card className="bg-content1 border border-default-100 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-default-200 mb-4 relative shadow-sm">
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

            <h2 className="text-xl font-bold text-[#0B3A75] dark:text-white truncate w-full">
              {lawyer.professionalName}
            </h2>

            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {SPECIALIZATIONS.find((s) => s.value === lawyer.specialization)
                ?.label || lawyer.specialization}
            </p>

            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-2">
              <Star className="size-3.5 fill-amber-500" />
              <span>0.0</span>
              <span className="text-default-400 font-normal">
                ({reviews.length} reviews)
              </span>
            </div>

            <Separator className="my-4 opacity-50" />

            <div className="w-full space-y-3 text-left text-xs text-default-600 dark:text-default-300 font-medium">
              <div className="flex items-center gap-2.5">
                <Clock className="size-4 text-default-400" />
                <span>
                  Hourly Rate:{" "}
                  <b className="text-foreground">
                    ${Number(lawyer.hourlyFee).toString()}/hr
                  </b>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <GrLocation className="size-4 text-default-400" />
                <span className="truncate">
                  {lawyer.location || "Dhaka, Bangladesh"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="size-4 text-default-400" />
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
                <Calendar className="size-4 text-default-400" />
                <span>
                  Joined Date:{" "}
                  <b className="text-foreground">
                    {formatExactDate(lawyer.createdAt)}
                  </b>
                </span>
              </div>
            </div>

            <Button
              onPress={handleHireClick}
              isDisabled={isBusy}
              className={`w-full mt-6 font-bold h-11 text-xs rounded-xl shadow-md transition-all ${
                isBusy
                  ? "bg-default-100 text-default-400 cursor-not-allowed shadow-none"
                  : "bg-[#1D44B7] hover:bg-[#153491] text-white active:scale-95"
              }`}
            >
              {isBusy
                ? "Unavailable"
                : `Hire ${lawyer.professionalName.split(" ")[0]}`}
            </Button>
          </Card>
        </div>

        {/* right side information and review block */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card className="bg-content1 border border-default-100 p-4 rounded-xl text-center shadow-sm">
              <h4 className="text-2xl font-extrabold text-foreground">
                {totalHires}
              </h4>
              <p className="text-[11px] text-default-400 font-medium mt-0.5">
                Total Hires
              </p>
            </Card>
            <Card className="bg-content1 border border-default-100 p-4 rounded-xl text-center shadow-sm">
              <h4 className="text-2xl font-extrabold text-success">
                {casesWon}
              </h4>
              <p className="text-[11px] text-default-400 font-medium mt-0.5">
                Cases Won
              </p>
            </Card>
            <Card className="bg-content1 border border-default-100 p-4 rounded-xl text-center col-span-2 sm:col-span-1 shadow-sm">
              <h4 className="text-2xl font-extrabold text-amber-500">
                {reviews.length}
              </h4>
              <p className="text-[11px] text-default-400 font-medium mt-0.5">
                Reviews
              </p>
            </Card>
          </div>

          <Card className="bg-content1 border border-default-100 p-5 rounded-2xl shadow-sm space-y-3">
            <h3 className="text-base font-bold text-[#0B3A75] dark:text-white">
              About
            </h3>
            <p className="text-xs text-default-600 dark:text-default-300 leading-relaxed italic bg-default-50 dark:bg-default-100/5 p-3 rounded-xl border border-default-100/50 break-words">
              &ldquo;{lawyer.bio}&rdquo;
            </p>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-default-700">
                Litigation Experience & Scope
              </h4>
              <p className="text-xs text-default-500 dark:text-default-400 leading-relaxed whitespace-pre-line">
                {lawyer.details}
              </p>
            </div>
          </Card>

          <Card className="bg-content1 border border-default-100 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#0B3A75] dark:text-white">
              Client Reviews
            </h3>
            <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400 text-xs font-medium">
              <BsInfoCircle className="size-4 flex-shrink-0" />
              <span>Only hired clients can leave reviews.</span>
            </div>

            <div className="text-center py-10 border border-dashed border-default-200 rounded-xl bg-default-50/30">
              <p className="text-xs text-default-400 font-medium">
                No reviews recorded yet for this legal consultant.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* related lawyers */}
      <RelatedLawyers
        relatedLawyers={relatedLawyers}
        currentSpecialization={lawyer.specialization}
      />
    </div>
  );
}
