"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Separator, Avatar, Card, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, FileText, Briefcase, Clock } from "@gravity-ui/icons";
import { FiCheckCircle as CheckIcon } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { SPECIALIZATIONS } from "./specializations";
import Image from "next/image";

interface LegalService {
  id?: string;
  _id?: string;
  professionalName: string;
  specialization: string;
  bio: string;
  details: string;
  hourlyFee: string;
  availabilityStatus: "Available" | "Busy";
  image: string;
  status: "pending" | "approved" | "rejected";
  lawyerId: string;
  lawyerEmail: string;
}

interface ManageLegalClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  initialProfiles: LegalService[]; 
}

export default function ManageLegalClient({
  user,
  initialProfiles,
}: ManageLegalClientProps) {
  const router = useRouter();

  const [services, setServices] = useState<LegalService[]>(initialProfiles);

  const handleOpenAddForm = () => {
    router.push("/dashboard/lawyer/manage-legal-profile/new-legal-profile");
  };

  const handleOpenEditForm = (service: LegalService) => {
    console.log(
      "Edit button clicked for service id:",
      service._id || service.id,
    );
  };

  const handleDeleteService = (id: string) => {
    console.log("Delete button clicked for service id:", id);
  };

  const getStatusChips = (status: "pending" | "approved" | "rejected") => {
    if (status === "approved")
      return { label: "Verified Profile", color: "success" as const };
    if (status === "rejected")
      return { label: "Rejected Profile", color: "danger" as const };
    return { label: "Waiting for admin approval", color: "warning" as const };
  };

  return (
    <>
      {/* Top Main Banner Header layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Legal Profile
          </h1>
          <p className="text-sm text-default-400 mt-1">
            Welcome back, {user.name}. Track or scale your litigation services
            workspace.
          </p>
        </div>
        <Button
          onPress={handleOpenAddForm}
          className="bg-[#1D44B7] text-white font-semibold rounded-xl h-11 px-5 flex items-center gap-2 shadow-md transition-transform active:scale-95"
        >
          <Plus className="size-4" />
          Add Legal Service
        </Button>
      </div>

      <Separator orientation="horizontal" className="mb-8 opacity-60" />

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-20 px-4 bg-default-50/50 dark:bg-default-100/10 border border-dashed border-default-200 rounded-3xl"
          >
            <div className="w-16 h-16 bg-[#1D44B7]/10 rounded-2xl flex items-center justify-center text-[#1D44B7] mb-5">
              <Briefcase className="size-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-default-800">
              No Legal Services Registered
            </h2>
            <p className="text-sm text-default-400 max-w-md mt-2 leading-relaxed">
              You haven&apos;t added any legal consulting profiles yet. Add your
              professional specialties, set your rates, and showcase your
              portfolio.
            </p>
            <Button
              onPress={handleOpenAddForm}
              className="bg-[#1D44B7] text-white font-semibold rounded-xl h-11 px-6 mt-6 flex items-center gap-2 shadow-md active:scale-95"
            >
              <Plus className="size-4" />
              Setup First Service Profile
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((service) => {
              const chipMeta = getStatusChips(service.status);
              return (
                <Card
                  key={service._id || service.id}
                  className="bg-content1 border border-default-100 hover:border-blue-200 dark:hover:border-blue-900/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5 sm:p-6 flex flex-col h-full justify-between gap-5">
                    {/* Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left w-full">
                        {/* Avatar Box wrapper for stability */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-default-100 flex-shrink-0">
                          <Image
                            src={service.image}
                            width={80}
                            height={80}
                            alt={service.professionalName}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 w-full">
                          <h3 className="font-bold text-lg text-[#0B3A75] dark:text-white truncate">
                            {service.professionalName}
                          </h3>
                          <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-semibold tracking-wide bg-blue-50 dark:bg-blue-950/40 text-[#1D44B7] dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30">
                            {SPECIALIZATIONS.find(
                              (s) => s.value === service.specialization,
                            )?.label || service.specialization}
                          </span>
                        </div>
                      </div>

                      {/* Availability Badge*/}
                      <div className="flex justify-center sm:justify-end flex-shrink-0 w-full sm:w-auto">
                        <div
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            service.availabilityStatus === "Available"
                              ? "bg-success-50 dark:bg-success-950/20 text-success"
                              : "bg-danger-50 dark:bg-danger-950/20 text-danger"
                          }`}
                        >
                          <CheckIcon className="size-3.5" />
                          {service.availabilityStatus}
                        </div>
                      </div>
                    </div>

                    {/* Bio Summary Section */}
                    <div className="space-y-4">
                      <p className="text-sm text-default-600 dark:text-default-300 font-medium bg-default-50/50 dark:bg-default-100/10 p-3 rounded-xl italic break-words">
                        &ldquo;{service.bio}&rdquo;
                      </p>

                      {/* Meta Items Row: Mobile friendly adjustments */}
                      <div className="flex flex-col gap-3 pt-1 border-b border-default-50 pb-2 sm:border-none sm:pb-0">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-default-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-4 text-default-400" />
                            <span>
                              ${Number(service.hourlyFee).toString()} / hr
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 max-w-full truncate">
                            <FileText className="size-4 text-default-400 flex-shrink-0" />
                            <span className="truncate max-w-[200px] sm:max-w-xs">
                              {service.details}
                            </span>
                          </div>
                        </div>

                        {/* Status Verification Chip */}
                        <div className="w-full sm:w-auto flex justify-start">
                          <Chip
                            size="sm"
                            color={chipMeta.color}
                            variant="soft"
                            className="font-bold text-[11px] px-2.5 w-full sm:w-auto text-center justify-center"
                          >
                            {chipMeta.label}
                          </Chip>
                        </div>
                      </div>
                    </div>

                    <Separator
                      orientation="horizontal"
                      className="opacity-40 hidden sm:block"
                    />

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2.5 mt-2 sm:mt-0 w-full">
                      <Button
                        isIconOnly
                        variant="ghost"
                        className="border-default-200 text-default-500 hover:text-danger hover:bg-danger-50 hover:border-danger/20 rounded-xl w-10 h-10 min-w-10 flex-shrink-0"
                        onPress={() =>
                          handleDeleteService(service._id || service.id || "")
                        }
                      >
                        <FaRegTrashCan className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-default-200 rounded-xl h-10 px-4 text-xs font-bold text-default-600 hover:text-[#1D44B7] flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                        onPress={() => handleOpenEditForm(service)}
                      >
                        <Pencil className="size-3.5" />
                        Configure Service
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
