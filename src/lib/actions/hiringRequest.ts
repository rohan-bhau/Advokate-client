"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const submitHiringRequest = async (payload: any) => {
  return serverMutation("/api/client/hire-lawyer", payload, "POST");
};

export const updateHiringRequestStatus = async (
  id: string,
  status: "accepted" | "rejected",
) => {
  const result = await serverMutation(
    `/api/lawyer/hiring-requests/${id}`,
    { status },
    "PATCH",
  );
  revalidatePath("/dashboard/lawyer/hiring-requests");
  return result;
};