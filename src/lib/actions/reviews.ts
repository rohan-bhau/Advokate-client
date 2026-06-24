"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const createReview = async (reviewData: any, lawyerId: string) => {
  const result = await serverMutation("/api/reviews", reviewData, "POST");
  revalidatePath(`/lawyers/${lawyerId}`);
  return result;
};
