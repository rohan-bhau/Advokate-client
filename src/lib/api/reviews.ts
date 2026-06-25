import { serverFetch } from "../core/serverMutation";

export const getLawyerReviews = async (lawyerId: string) => {
  return serverFetch(`/api/reviews/${lawyerId}`);
};

export const getClientReviews = async (email: string) => {
  return serverFetch(
    `/api/client/my-reviews?email=${encodeURIComponent(email)}`,
  );
};