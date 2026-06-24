"use client";

import React from "react";
import {  CircleInfo, Clock, Briefcase, Calendar } from "@gravity-ui/icons";
import { Button, Modal, Surface, Chip } from "@heroui/react";
import toast from "react-hot-toast";

interface HiringRequest {
  _id: string | { $oid: string };
  lawyerName: string;
  lawyerEmail: string;
  specialization: string;
  caseTitle: string;
  caseDescription: string;
  hourlyFee: string;
  status: "pending" | "accepted" | "rejected";
  paymentStatus: "pending" | "paid";
  caseStatus: "active" | "won";
  createdAt: any;
}

interface ClientHiringModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  request: HiringRequest | null;
}

export function ClientHiringModal({
  isOpen,
  onOpenChange,
  request,
}: ClientHiringModalProps) {
  if (!request) return null;

  const formatRequestDate = (dateData: any) => {
    try {
      const rawDate =
        typeof dateData === "object" && "$date" in dateData
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

  const handlePaymentMock = () => {
    toast.success("Payment button clicked! Processing transaction gateway...");
  };

  const getStatusColor = (status: string) => {
    if (status === "accepted") return "success" as const;
    if (status === "pending") return "warning" as const;
    return "danger" as const;
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg bg-content1 text-foreground border border-default-100 rounded-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-blue-500/10 text-[#1D44B7]">
                <CircleInfo className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Retainer Proposal Details</Modal.Heading>
              <p className="mt-1 text-xs text-default-400">
                Review your contract status and case documentation parameters.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6 space-y-4">
              <Surface variant="default" className="space-y-4">
                {/* Lawyer Profile Metadata */}
                <div className="grid grid-cols-2 gap-4 bg-default-50 dark:bg-default-100/5 p-3 rounded-xl border border-default-100/50">
                  <div>
                    <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider block">
                      Attorney Name
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {request.lawyerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider block">
                      Specialization
                    </span>
                    <span className="text-xs font-semibold text-foreground truncate block capitalize">
                      {request.specialization}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider block">
                      Proposal Status
                    </span>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={getStatusColor(request.status)}
                      className="font-bold text-[9px] uppercase mt-0.5 h-5"
                    >
                      {request.status}
                    </Chip>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider block">
                      Payment Status
                    </span>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        request.paymentStatus === "paid" ? "success" : "danger"
                      }
                      className="font-bold text-[10px] mt-0.5"
                    >
                      {request.paymentStatus.toUpperCase()}
                    </Chip>
                  </div>
                </div>

                {/* Case Parameters */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider block">
                    Case Title / Primary Issue
                  </span>
                  <h3 className="text-sm font-bold text-foreground bg-background p-2.5 rounded-lg border border-default-200">
                    {request.caseTitle}
                  </h3>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-default-400 uppercase tracking-wider block">
                    Litigation Narrative
                  </span>
                  <p className="text-xs text-default-600 dark:text-default-300 leading-relaxed bg-background p-3 rounded-xl border border-default-200 whitespace-pre-line max-h-36 overflow-y-auto">
                    {request.caseDescription}
                  </p>
                </div>

                {/* Meta Meta Details */}
                <div className="flex items-center justify-between text-xs text-default-400 pt-2 border-t border-default-100/50">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> Rate:{" "}
                    <b>${request.hourlyFee}/hr</b>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" /> Date:{" "}
                    <b>{formatRequestDate(request.createdAt)}</b>
                  </span>
                </div>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="secondary"
                className="rounded-xl text-xs font-medium"
                onClick={() => onOpenChange(false)}
              >
                Close Details
              </Button>

              {/* pay button */}
              {request.status === "accepted" &&
                request.paymentStatus === "pending" && (
                  <Button
                    onPress={handlePaymentMock}
                    className="bg-[#1D44B7] text-white text-xs font-bold rounded-xl px-5 h-10 shadow-sm hover:bg-[#153491]"
                  >
                    Pay Attorney Retainer
                  </Button>
                )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
