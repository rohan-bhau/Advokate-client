"use client";

import React, { useState } from "react";
// import { updateLawyerStatus } from "@/lib/actions/lawyers";
import { Pencil } from "@gravity-ui/icons";
import { AlertDialog, Button, Label, ListBox, Select } from "@heroui/react";
import toast from "react-hot-toast";
import { LawyerInfo } from "./ManageLawyersClient";
import { updateLawyerStatus } from "@/lib/actions/lawyers";

interface UpdateStatusProps {
  lawyer: LawyerInfo;
  currentStatus: "pending" | "approved" | "rejected";
  onUpdateSuccess: (
    id: string,
    updatedStatus: "pending" | "approved" | "rejected",
  ) => void;
}

export function UpdateLawyerStatus({
  lawyer,
  currentStatus,
  onUpdateSuccess,
}: UpdateStatusProps) {
  const [status, setStatus] = useState<string>(currentStatus);
  const [isPending, setIsPending] = useState(false);

  const handleStatusUpdate = async (id: string | { $oid: string }) => {
    const lawyerIdStr =
      typeof id === "object" && "$oid" in id ? id.$oid : (id as string);
    setIsPending(true);
    try {
      const result = await updateLawyerStatus(id, status as any);

      if (
        result &&
        (result.modifiedCount > 0 || result.acknowledged === true)
      ) {
        toast.success("Application Status Updated!");
        onUpdateSuccess(lawyerIdStr, status as any);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <AlertDialog>
        <Button
          size="sm"
          variant="ghost"
          className="border-default-200 rounded-xl font-bold text-xs px-3 transition-all text-default-600 hover:text-blue-600 hover:bg-blue-50/50"
        >
          <Pencil className="size-3.5" />
          Status
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="warning" />
                <AlertDialog.Heading>
                  Update Profile Status?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <div className="py-2">
                  <Select
                    className="w-full"
                    placeholder="Select Status"
                    selectedKey={status}
                    onSelectionChange={(key) => setStatus(key as string)}
                  >
                    <Label>Select Action</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="pending" textValue="pending">
                          Pending
                        </ListBox.Item>
                        <ListBox.Item id="approved" textValue="approved">
                          Approve / Publish
                        </ListBox.Item>
                        <ListBox.Item id="rejected" textValue="rejected">
                          Reject
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  onClick={() => handleStatusUpdate(lawyer._id)}
                  variant="primary"
                  isDisabled={isPending}
                >
                  Save Changes
                </Button>
                <Button slot="close" variant="tertiary">
                  Discard
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}
