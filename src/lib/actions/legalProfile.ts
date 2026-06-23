'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const createLegalProfile = async (newLegalProfile: []) => {
  return serverMutation("/api/lawyerProfiles", newLegalProfile);
};

export const updateLegalProfile = async (id: string, updatedData: any) => {
  const result = await serverMutation(
    `/api/lawyerProfiles/update/${id}`,
    updatedData,
    "PUT",
  );
  revalidatePath("/dashboard/lawyer/manage-legal-profile");
  return result;
};