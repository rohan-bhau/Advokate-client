"use client";

import { updateUserRole } from "@/lib/actions/users";
import { Pencil } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface UserInfo {
  _id: string | { $oid: string };
  name: string;
  email: string;
  role:  "lawyer" | "client";
  createdAt: any;
}

interface UpdateRoleProps {
  user: UserInfo;
  isSelf: boolean;
  currentRole: string;
  onUpdateSuccess: (id: string, updatedRole: string) => void; 
}

export function UpdateRole({
  user,
  isSelf,
  currentRole,
  onUpdateSuccess,
}: UpdateRoleProps) {
  const [Role, setRole] = useState<string>(currentRole);
  const [isPending, setIsPending] = useState(false);

  const handleRoleUpdate = async (id: string | { $oid: string }) => {
    const userIdStr =
      typeof id === "object" && "$oid" in id ? id.$oid : (id as string);
    console.log("updated role", Role, userIdStr);

    setIsPending(true);
    try {
      const result = await updateUserRole(id, Role);

      if (
        result &&
        (result.modifiedCount > 0 || result.acknowledged === true)
      ) {
        toast.success("User Role Updated successfully!");
        onUpdateSuccess(userIdStr, Role); 
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
          isDisabled={isSelf}
          className={`border-default-200 rounded-xl font-bold text-xs px-3 transition-all ${
            isSelf
              ? "opacity-40 cursor-not-allowed text-default-400 bg-transparent hover:bg-transparent hover:text-default-400"
              : "text-default-600 hover:text-blue-600 hover:bg-blue-50/50"
          }`}
        >
          <Pencil className="size-3.5" />
          Change Role
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="warning" />
                <AlertDialog.Heading>Update Role?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <Select
                  className="w-[256px]"
                  placeholder="Select one"
                  selectedKey={Role}
                  onSelectionChange={(key) => setRole(key as string)}
                >
                  <Label>Select Role</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="client" textValue="client">
                        Client
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="lawyer" textValue="lawyer">
                        Lawyer
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  slot="close"
                  onClick={() => handleRoleUpdate(user._id)}
                  variant="primary"
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
