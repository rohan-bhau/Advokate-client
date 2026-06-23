"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const updateLawyerStatus = async (
  id: string | { $oid: string },
  status: "pending" | "approved" | "rejected",
) => {
  const idStr =
    typeof id === "object" && "$oid" in id ? id.$oid : (id as string);
  const result = await serverMutation(
    `/api/admin/lawyerProfiles/change-status/${idStr}`,
    { status },
    "PATCH",
  );
  revalidatePath("/dashboard/admin/manage-lawyers");
  return result;
};

export const deleteLawyerProfile = async (id: string | { $oid: string }) => {
  const idStr =
    typeof id === "object" && "$oid" in id ? id.$oid : (id as string);
  const result = await serverMutation(
    `/api/admin/lawyerProfiles/delete/${idStr}`,
    {},
    "DELETE",
  );
  revalidatePath("/dashboard/admin/manage-lawyers");
  return result;
};
