"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const updateLawyerPlanAction = async (
  userId: string,
  planStatus: string = "premium",
) => {
  try {
    const result = await serverMutation(
      `/api/lawyer/update-plan/${userId}`,
      { planStatus },
      "PATCH",
    );

    revalidatePath("/dashboard/lawyer/manage-legal-profile/new-legal-profile");

    return { success: true, data: result };
  } catch (error: any) {
    console.error(" Action Error [updateLawyerPlanAction]:", error.message);
    return { success: false, error: error.message };
  }
};

export const updateHiringPaymentAction = async (
  lawyerId: string,
  clientId: string,
) => {
  try {
    const result = await serverMutation(
      "/api/client/update-hiring-payment",
      { lawyerId, clientId },
      "PATCH",
    );

    revalidatePath("/dashboard/client/hiring-requests");

    return { success: true, data: result };
  } catch (error: any) {
    console.error(
      "Action Error [updateHiringPaymentAction]:",
      error.message,
    );
    return { success: false, error: error.message };
  }
};
