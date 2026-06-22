"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const updateUserRole = async (id: string, role: string) => {
  const result = await serverMutation(
    `/api/user/change-role/${id}`,
    { role },
    "PATCH",
  );
  revalidatePath("/dashboard/admin/manage-users");
  return result;
};

export const deleteUser = async (id: string) => {
  const result = await serverMutation(`/api/user/delete/${id}`, {}, "DELETE");
  revalidatePath("/dashboard/admin/manage-users");
  return result;
};
