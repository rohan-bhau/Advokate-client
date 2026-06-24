import { serverFetch } from "../core/serverMutation";

export const getLawyerReviews = async (lawyerId: string) => {
  return serverFetch(`/api/reviews/${lawyerId}`);
};
