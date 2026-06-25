"use server";

// import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";


export const updateLawyerPlanAction = async (payload: {
  userId: string;
  planStatus: string;
  sessionId: string;
  amount: number;
  userEmail: string;
}) => {
  try {
    const result = await serverMutation(
      `/api/lawyer/update-plan/${payload.userId}`,
      {
        planStatus: payload.planStatus,
        sessionId: payload.sessionId,
        amount: payload.amount,
        userEmail: payload.userEmail,
      },
      "PATCH",
    );

    // revalidatePath("/dashboard/lawyer/manage-legal-profile/new-legal-profile");
    return { success: true, data: result };
  } catch (error: any) {
    console.error(" Action Error [updateLawyerPlanAction]:", error.message);
    return { success: false, error: error.message };
  }
};


export const updateHiringPaymentAction = async (payload: {
  lawyerId: string;
  clientId: string;
  sessionId: string;
  amount: number;
  clientEmail: string;
  lawyerEmail: string;
}) => {
  try {
    const result = await serverMutation(
      "/api/client/update-hiring-payment",
      payload,
      "PATCH",
    );

    // revalidatePath("/dashboard/client/hiring-requests");
    return { success: true, data: result };
  } catch (error: any) {
    console.error(
      "Action Error [updateHiringPaymentAction]:",
      error.message,
    );
    return { success: false, error: error.message };
  }
};
