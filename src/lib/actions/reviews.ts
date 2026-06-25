"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const createReview = async (reviewData: any, lawyerId: string) => {
  const result = await serverMutation("/api/reviews", reviewData, "POST");
  revalidatePath(`/lawyers/${lawyerId}`);
  return result;
};

export const updateReviewAction = async (
  id: string,
  updatedData: { rating: number; comment: string },
) => {
  const result = await serverMutation(`/api/reviews/${id}`, updatedData, "PUT");
  revalidatePath("/dashboard/client/reviews");
  return result;
};

export const deleteReviewAction = async (id: string) => {
  const result = await serverMutation(`/api/reviews/${id}`, {}, "DELETE");
  revalidatePath("/dashboard/client/reviews");
  return result;
};