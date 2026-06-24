import { serverFetch } from "../core/serverMutation";

export const checkHiringStatus = async (lawyerId: string, clientId: string) => {
  return serverFetch(
    `/api/client/hiring-status?lawyerId=${lawyerId}&clientId=${clientId}`,
  );
};
