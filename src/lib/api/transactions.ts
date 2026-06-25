import { serverFetch } from "../core/serverMutation";

export const getLawyerTransactions = async (
  search: string = "",
  page: number = 1,
  limit: number = 10,
) => {
  return serverFetch(
    `/api/admin/lawyer-transactions?search=${search}&page=${page}&limit=${limit}`,
  );
};
