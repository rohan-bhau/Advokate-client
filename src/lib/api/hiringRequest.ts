import { serverFetch } from "../core/serverMutation";

export const checkHiringStatus = async (lawyerId: string, clientId: string) => {
  return serverFetch(
    `/api/client/hiring-status?lawyerId=${lawyerId}&clientId=${clientId}`,
  );
};

export const getLawyerHiringRequests = async (lawyerEmail: string) => {
  return serverFetch(
    `/api/lawyer/hiring-requests?lawyerEmail=${encodeURIComponent(lawyerEmail)}`,
  );
};

export const getClientHiringRequests = async (clientEmail: string) => {
  return serverFetch(
    `/api/client/hiring-requests?clientEmail=${encodeURIComponent(clientEmail)}`,
  );
};

export const getLawyerStats = async (lawyerEmail: string) => {
  return serverFetch(`/api/lawyers/${lawyerEmail}/stats`);
};