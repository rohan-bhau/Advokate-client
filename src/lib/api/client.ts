import { protectedFetch, serverFetch } from "../core/serverMutation";

export const getClientDashboardMetrics = async (email: string) => {
  return serverFetch(
    `/api/client/dashboard-metrics?email=${encodeURIComponent(email)}`,
  );
};

export const getClientTransactions = async (
  email: string,
  search: string = "",
  page: number = 1,
  limit: number = 10,
) => {
  return protectedFetch(
    `/api/client/transactions?email=${encodeURIComponent(email)}&search=${search}&page=${page}&limit=${limit}`,
  );
};
