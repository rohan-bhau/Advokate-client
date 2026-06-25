"use client";

import React from "react";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LawyerInfo } from "./ManageLawyersClient";
import { deleteLawyerProfile } from "@/lib/actions/lawyers";

interface DeleteLawyerProps {
  lawyer: LawyerInfo;
  onDeleteSuccess: (id: string | { $oid: string }) => void;
}

export function DeleteLawyerProfile({
  lawyer,
  onDeleteSuccess,
}: DeleteLawyerProps) {
  const router = useRouter();

  const handleDelete = async (id: string | { $oid: string }) => {
    try {
      const result = await deleteLawyerProfile(id);
      if (result && (result.deletedCount > 0 || result.acknowledged === true)) {
        toast.success("Lawyer Listing Deleted!");
        onDeleteSuccess(id);
      } else {
        toast.success("Lawyer Listing Deleted!");
        onDeleteSuccess(id);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        className="border-default-200 rounded-xl text-default-400 hover:text-danger hover:bg-danger-50 transition-all"
      >
        <TrashBin className="size-4" />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Profile?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to delete{" "}
                <strong>{lawyer.professionalName}</strong>&apos;s listing? This
                action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                onClick={() => handleDelete(lawyer._id)}
              >
                Delete Profile
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
