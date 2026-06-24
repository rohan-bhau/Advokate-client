"use client";

import React, { useState } from "react";
import { Briefcase as Envelope } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  TextArea,
  Separator,
} from "@heroui/react";

import toast from "react-hot-toast";
import { submitHiringRequest } from "@/lib/actions/hiringRequest";

interface HireLawyerModalProps {
  lawyer: {
    _id: string | { $oid: string };
    professionalName: string;
    hourlyFee: string;
    specialization: string;
    lawyerEmail?: string;
  };
  currentUser: { id: string; name: string; email: string; role: string } | null;
  hasApplied: boolean;
  setHasApplied: (val: boolean) => void;
  isBusy: boolean;
}

export function HireLawyerModal({
  lawyer,
  currentUser,
  hasApplied,
  setHasApplied,
  isBusy,
}: HireLawyerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [caseTitle, setCaseTitle] = useState("");
  const [caseDescription, setCaseDescription] = useState("");

  const idStr =
    lawyer._id && typeof lawyer._id === "object" && "$oid" in lawyer._id
      ? lawyer._id.$oid
      : (lawyer._id as string);

  const handleButtonClick = () => {
    if (!currentUser) {
      toast.error("Authentication required! Please login to hire a lawyer.");
      return;
    }
    if (currentUser.role !== "client") {
      toast.error(
        "Access Denied! Only accounts with a 'client' role can issue hiring contracts.",
      );
      return;
    }
    setIsOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitLoading(true);

    const payload = {
      lawyerId: idStr,
      lawyerEmail: lawyer.lawyerEmail || "",
      lawyerName: lawyer.professionalName,
      specialization: lawyer.specialization,
      clientId: currentUser.id,
      clientEmail: currentUser.email,
      clientName: currentUser.name,
      caseTitle,
      caseDescription,
      hourlyFee: lawyer.hourlyFee,
    };

    try {
      const res = await submitHiringRequest(payload);
      if (res) {
        toast.success("Hiring request submitted successfully!");
        setHasApplied(true);
        setIsOpen(false); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Try again.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const canApply = !isBusy && !hasApplied;

  return (
    <>
      <Button
        isDisabled={!canApply}
        onPress={handleButtonClick}
        className={`w-full mt-6 font-bold h-11 text-xs rounded-xl shadow-md transition-all ${
          hasApplied
            ? "bg-success-100 text-success cursor-not-allowed shadow-none font-extrabold"
            : isBusy
              ? "bg-default-100 text-default-400 cursor-not-allowed shadow-none"
              : "bg-[#1D44B7] hover:bg-[#153491] text-white active:scale-95"
        }`}
      >
        {hasApplied
          ? "Already Applied"
          : isBusy
            ? "Unavailable"
            : `Hire ${lawyer.professionalName.split(" ")[0]}`}
      </Button>


      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-content1 text-foreground border border-default-100 rounded-2xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-blue-500/10 text-[#1D44B7]">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Retainer Request Contract</Modal.Heading>
                <p className="mt-1.5 text-xs leading-5 text-default-400">
                  Please review your profile details and submit your litigation
                  briefs below.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form
                    id="retainer-modal-form"
                    className="flex flex-col gap-4 w-full"
                    onSubmit={handleFormSubmit}
                  >
                    {/*  Client Information displaying as Read-Only */}
                    <div className="grid grid-cols-2 gap-3 bg-default-50 dark:bg-default-100/5 p-3 rounded-xl border border-default-100">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-default-400 font-bold block">
                          Client Name
                        </span>
                        <span className="text-xs font-semibold text-foreground truncate block">
                          {currentUser?.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-default-400 font-bold block">
                          Client Email
                        </span>
                        <span className="text-xs font-semibold text-foreground truncate block">
                          {currentUser?.email}
                        </span>
                      </div>
                    </div>

                    <Separator className="opacity-40 my-1" />

                    {/* Inputs */}
                    <TextField
                      className="w-full"
                      name="caseTitle"
                      variant="secondary"
                    >
                      <Label className="text-xs font-semibold mb-1 block">
                        Case Title / Primary Issue *
                      </Label>
                      <Input
                        required
                        placeholder="e.g. Corporate Breach of Contract"
                        value={caseTitle}
                        onChange={(e) => setCaseTitle(e.target.value)}
                      />
                    </TextField>

                    <div className="w-full flex flex-col gap-1">
                      <Label className="text-xs font-semibold mb-1 block">
                        Litigation Narrative Details *
                      </Label>
                      <TextArea
                        aria-label="Case Description Parameters"
                        required
                        placeholder="Provide details about the legal assistance you need..."
                        className="h-32 w-full border border-default-200 rounded-xl p-3 text-sm bg-background outline-none focus:border-blue-500 transition-all"
                        value={caseDescription}
                        onChange={(e) => setCaseDescription(e.target.value)}
                      />
                    </div>
                  </form>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  slot="close"
                  variant="secondary"
                  className="rounded-xl text-xs font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="retainer-modal-form"
                  isDisabled={isSubmitLoading}
                  className="bg-[#1D44B7] text-white text-xs font-bold rounded-xl px-4 h-10"
                >
                  {isSubmitLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
