import { protectedFetch, serverFetch } from "../core/serverMutation";

export const getLawyerTransactions = async (
  search: string = "",
  page: number = 1,
  limit: number = 10,
) => {
  return protectedFetch(
    `/api/admin/lawyer-transactions?search=${search}&page=${page}&limit=${limit}`,
  );
};

