import { serverFetch } from "../core/serverMutation";

export const getLawyerDashboardMetrics = async (email: string) => {
  return serverFetch(
    `/api/lawyer/dashboard-metrics?email=${encodeURIComponent(email)}`,
  );
};

export const getLawyerTransactions = async (
  email: string,
  search: string = "",
  page: number = 1,
  limit: number = 10,
) => {
  return serverFetch(
    `/api/lawyer/transactions?email=${encodeURIComponent(email)}&search=${search}&page=${page}&limit=${limit}`,
  );
};
