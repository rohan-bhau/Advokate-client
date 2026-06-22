"use client";

import { deleteUser } from "@/lib/actions/users";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 

interface UserInfo {
  _id: string | { $oid: string };
  name: string;
  email: string;
  role: "moderator" | "lawyer" | "client";
  createdAt: any;
}

interface DeleteUserProps {
  user: UserInfo;
  isSelf: boolean;
}

export function DeleteUser({ user, isSelf }: DeleteUserProps) {
  const router = useRouter(); 
  console.log("user from alert dialouge", user);

  const handleDelete = async (id: string | { $oid: string }) => {
    console.log("clicked id", id);
    try {
      await deleteUser(id);
      toast.success("User Deleted successfully!");

        router.refresh()
    //   window.location.reload()
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
        isDisabled={isSelf}
        className={`border-default-200 rounded-xl transition-all ${
          isSelf
            ? "opacity-40 cursor-not-allowed text-default-300 bg-transparent hover:bg-transparent hover:text-default-300"
            : "text-default-400 hover:text-danger hover:bg-danger-50"
        }`}
      >
        <TrashBin className="size-4" />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete user permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{user.name}</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                onClick={() => handleDelete(user._id)}
              >
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
