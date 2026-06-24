"use client";

import { useRouter } from "next/navigation";
import { Avatar, Badge, Card, Chip } from "@heroui/react";
import { SPECIALIZATIONS } from "../../../dashboard/lawyer/manage-legal-profile/specializations";
import { Star } from "@gravity-ui/icons";
import { GrLocation } from "react-icons/gr";

interface RelatedLawyerData {
  _id: string | { $oid: string };
  id?: string;
  professionalName: string;
  specialization: string;
  hourlyFee: string;
  location: string;
  image: string;
  availabilityStatus: string;
}

interface RelatedLawyersProps {
  relatedLawyers: RelatedLawyerData[];
  currentSpecialization: string;
}

export function RelatedLawyers({
  relatedLawyers,
  currentSpecialization,
}: RelatedLawyersProps) {
  const router = useRouter();

  if (!relatedLawyers || relatedLawyers.length === 0) return null;

  const getLawyerIdStr = (lawyer: RelatedLawyerData) => {
    return lawyer._id && typeof lawyer._id === "object" && "$oid" in lawyer._id
      ? lawyer._id.$oid
      : (lawyer._id as string) || lawyer.id || "";
  };

  const specializationLabel =
    SPECIALIZATIONS.find((s) => s.value === currentSpecialization)?.label ||
    currentSpecialization;

  return (
    <div className="space-y-4 pt-6 border-t border-default-100 mt-4">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-[#0B3A75] dark:text-white">
          More Experts in Same Specialty
        </h3>
        <p className="text-xs text-default-400">
          Recommended attorneys based on case specialization match.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {relatedLawyers.map((rel) => {
          const relId = getLawyerIdStr(rel);
          console.log(rel);

          return (
            <Card
              key={relId}
              onClick={() => router.push(`/browse-lawyer/${rel._id || rel.id}`)}
              className="bg-content1 border border-default-100 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-2 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden"
            >
              <div className="p-4 sm:p-5 flex flex-col gap-4">
                {/* Avatar, Name, and Status Badge */}
                <div className="flex items-start justify-between w-full gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge.Anchor>
                      <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border border-default-200 rounded-full overflow-hidden flex-shrink-0">
                        <Avatar.Image src={rel.image} />
                        <Avatar.Fallback>
                          {rel.professionalName
                            ? rel.professionalName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "JD"}
                        </Avatar.Fallback>
                      </Avatar>
                      <Badge
                        color={
                          rel.availabilityStatus === "Available"
                            ? "success"
                            : "danger"
                        }
                        placement="bottom-right"
                        size="sm"
                      />
                    </Badge.Anchor>

                    {/* Name and Compact Category placed right next to Avatar */}
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
                        {rel.professionalName}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 truncate tracking-wide">
                        {SPECIALIZATIONS.find(
                          (s) => s.value === rel.specialization,
                        )?.label || rel.specialization}
                      </p>
                    </div>
                  </div>

                  <Chip
                    size="sm"
                    variant="soft"
                    color={
                      rel.availabilityStatus === "Available"
                        ? "success"
                        : "danger"
                    }
                    className="font-bold text-[9px] sm:text-[10px] px-1.5 flex-shrink-0"
                  >
                    {rel.availabilityStatus}
                  </Chip>
                </div>

                {/* Ratings and Separate Location Lines Layout */}
                <div className="flex flex-col gap-1.5 pt-1">
                  {/* Line 1: Review rating info */}
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="size-3.5 fill-amber-500" />
                    <span>4.9</span>
                    <span className="text-default-400 text-[11px] font-normal">
                      (218 reviews)
                    </span>
                  </div>
                  {/* Line 2: Independent Location display line */}
                  <div className="flex items-center gap-1 text-xs text-default-400 font-medium">
                    <GrLocation className="size-3.5 text-default-400 flex-shrink-0" />
                    <span className="truncate">
                      {rel.location || "Dhaka Bangladesh"}
                    </span>
                  </div>
                </div>
              </div>

              <Card.Footer className="border-t border-default-100 bg-default-50/50 px-4 sm:px-5 py-3 flex items-center justify-between gap-2 mt-auto w-full">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-base sm:text-lg font-extrabold text-foreground">
                    ${Number(rel.hourlyFee).toString()}
                  </span>
                  <span className="text-[10px] text-default-400 font-bold">
                    /hr
                  </span>
                </div>
                <span className="text-[11px] font-bold text-default-400 group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  View Profile &rarr;
                </span>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
