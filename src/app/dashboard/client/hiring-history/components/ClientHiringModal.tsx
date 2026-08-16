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

const handleHiringCheckout = async () => {
  const res = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paymentType: "hiring",
      amount: request.hourlyFee,
      lawyerEmail: request.lawyerEmail,
      lawyerId: request._id,
    }),
  });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
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
          <Modal.Dialog className="sm:max-w-lg bg-surface text-foreground border border-border rounded-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-brand-100/15 text-brand-500">
                <CircleInfo className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Retainer Proposal Details</Modal.Heading>
              <p className="mt-1 text-xs text-muted">
                Review your contract status and case documentation parameters.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6 space-y-4">
              <Surface variant="default" className="space-y-4">
                {/* Lawyer Profile Metadata */}
                <div className="grid grid-cols-2 gap-4 bg-content2 dark:bg-content2/5 p-3 rounded-xl border border-border/50">
                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                      Attorney Name
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {request.lawyerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                      Specialization
                    </span>
                    <span className="text-xs font-semibold text-foreground truncate block capitalize">
                      {request.specialization}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
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
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
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
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                    Case Title / Primary Issue
                  </span>
                  <h3 className="text-sm font-bold text-foreground bg-background p-2.5 rounded-lg border border-border">
                    {request.caseTitle}
                  </h3>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">
                    Litigation Narrative
                  </span>
                  <p className="text-xs text-foreground leading-relaxed bg-background p-3 rounded-xl border border-border whitespace-pre-line max-h-36 overflow-y-auto">
                    {request.caseDescription}
                  </p>
                </div>

                {/* Meta Meta Details */}
                <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/50">
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
                    onPress={handleHiringCheckout}
                    className="bg-brand-500 text-white text-xs font-bold rounded-xl px-5 h-10 shadow-sm hover:bg-brand-600"
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
