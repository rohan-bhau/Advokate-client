"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Card, Avatar, Chip, Button } from "@heroui/react";
import { Star } from "@gravity-ui/icons";
import { GrLocation } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface FeaturedLawyer {
  _id: string;
  professionalName: string;
  specialization: string;
  image: string;
  hourlyFee: string;
  location: string;
  availabilityStatus: "Available" | "Busy";
  averageRating: number;
  totalReviews: number;
  totalHires?: number;
}

interface TopExpert {
  _id: string;
  professionalName: string;
  specialization: string;
  image: string;
  totalHires: number;
}

interface FeaturedSectionClientProps {
  featuredLawyers: FeaturedLawyer[];
  topExperts: TopExpert[];
}

export default function FeaturedSectionClient({
  featuredLawyers,
  topExperts,
}: FeaturedSectionClientProps) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cardAnimation: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1,
      },
    }),
  };

  const rankBadgeColors = [
    "bg-[#F5A524] text-black font-black",
    "bg-[#F5A524] text-black font-black",
    "bg-[#F5A524] text-black font-black",
  ];

  return (
    <div
      suppressHydrationWarning
      className="py-12 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden selection:bg-blue-500/30"
    >
      {/* section 1: FEATURED LAWYERS */}
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              TOP RATED
            </span>
            <h2 className="text-3xl font-black tracking-tight mt-0.5 text-foreground">
              Featured Lawyers
            </h2>
          </div>
          <Link href="/browse-lawyer">
            <Button
              size="sm"
              variant="outline"
              className="text-blue-600 dark:text-blue-400 border-0 font-bold text-xs flex items-center gap-1"
            >
              View all &rarr;
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLawyers.map((lawyer, index) => {
            const initials = lawyer.professionalName
              ? lawyer.professionalName.substring(0, 2).toUpperCase()
              : "LY";

            const displayHires =
              lawyer.totalHires ||
              (mounted
                ? (parseInt(lawyer._id.slice(-4), 16) % 400) + 100
                : 185);
            return (
              <motion.div
                key={lawyer._id}
                custom={index}
                variants={cardAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-20px" }}
                className="w-full"
              >
                <Card
                  onClick={() => router.push(`/browse-lawyer/${lawyer._id}`)}
                  className="bg-[#0D1117]/5 dark:bg-[#0F141C]  rounded-2xl transition-all duration-200 cursor-pointer p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md hover:border-default-400/80 dark:hover:border-[#2E3748]"
                >
                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <Avatar className="w-12 h-12 border border-default-200 dark:border-default-100 rounded-full overflow-hidden shadow-xs">
                          <Avatar.Image
                            src={lawyer.image}
                            alt={lawyer.professionalName}
                          />
                          <Avatar.Fallback>{initials}</Avatar.Fallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#FAFBFD] dark:border-[#0F141C] rounded-full"></span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-extrabold text-base text-foreground truncate">
                          {lawyer.professionalName}
                        </h3>
                        <p className="text-xs text-default-400 truncate">
                          {lawyer.specialization}
                        </p>
                      </div>
                    </div>

                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        lawyer.availabilityStatus === "Available"
                          ? "success"
                          : "danger"
                      }
                      className="font-bold text-[10px] px-2 shrink-0 h-6 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    >
                      {lawyer.availabilityStatus}
                    </Chip>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-foreground text-xs ml-1">
                        {lawyer.averageRating
                          ? lawyer.averageRating.toFixed(1)
                          : "0.0"}
                      </span>
                      <span className="text-default-400 font-normal text-[11px]">
                        ({lawyer.totalReviews || 0})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-default-400 font-medium">
                      <GrLocation className="size-3.5 shrink-0 text-default-400" />
                      <span className="truncate">
                        {lawyer.location || "Dhaka"}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-default-200/60 dark:bg-[#1E2530]" />

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-baseline">
                      <span className="text-lg font-black text-foreground">
                        ${lawyer.hourlyFee}
                      </span>
                      <span className="text-xs text-default-400 font-medium">
                        /hr
                      </span>
                    </div>
                    {/* <span className="text-xs text-default-400/80 font-medium">
                      {displayHires} hires
                    </span> */}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* section 2: TOP LEGAL EXPERTS */}
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            ELITE TIER
          </span>
          <h2 className="text-3xl font-black tracking-tight mt-0.5 text-foreground">
            Top Legal Experts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topExperts.map((expert, index) => {
            const initials = expert.professionalName
              ? expert.professionalName.substring(0, 2).toUpperCase()
              : "EX";
            return (
              <motion.div
                key={expert._id}
                custom={index + 3}
                variants={cardAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-20px" }}
                className="w-full"
              >
                <Card
                  onClick={() => router.push(`/browse-lawyer/${expert._id}`)}
                  className="relative h-[340px] border border-default-200/60 dark:border-[#1E2530] bg-[#0F141C] rounded-2xl overflow-hidden cursor-pointer group shadow-sm flex flex-col justify-end"
                >
                  <div className="absolute inset-0 w-full h-full bg-[#181F2A]">
                    {expert.image ? (
                      <Image
                        src={expert.image}
                        alt={expert.professionalName}
                        fill
                        sizes="(max-w-780px) 100vw, 33vw"
                        priority={index === 0}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-black bg-blue-500/10 text-blue-500">
                        {initials}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/95 via-[#0A0D14]/40 to-transparent" />
                  </div>

                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`text-[10px] uppercase px-2.5 py-0.5 rounded-md shadow-xs ${rankBadgeColors[index]}`}
                    >
                      {index === 0
                        ? "#1 Expert"
                        : index === 1
                          ? "#2 Expert"
                          : "#3 Expert"}
                    </span>
                  </div>

                  <div className="relative z-10 p-5 w-full text-white space-y-4">
                    <div className="space-y-0.5">
                      <h3 className="font-extrabold text-lg text-white tracking-tight truncate">
                        {expert.professionalName}
                      </h3>
                      <p className="text-xs text-default-400 truncate font-medium">
                        {expert.specialization}
                      </p>
                    </div>

                    <div className="flex items-center justify-between w-full pt-1">
                      <span className="text-xs font-bold text-[#F5A524]">
                        👤 {expert.totalHires} hires
                      </span>
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
