import { serverFetch } from "../core/serverMutation";

export const getAnalyticsData = async () => {
  return serverFetch("/api/admin/analytics-data");
};
