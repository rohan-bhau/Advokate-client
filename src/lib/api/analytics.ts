import { protectedFetch, serverFetch } from "../core/serverMutation";

export const getAnalyticsData = async () => {
  return protectedFetch("/api/admin/analytics-data");
};
