import { protectedFetch, serverFetch } from "../core/serverMutation";

export const getLawyers = async (queryString: string = "") => {
  return serverFetch(`/api/lawyerProfiles${queryString}`);
};

export const getLawyerProfiles = async (lawyerId: string) => {
  return serverFetch(`/api/my/lawyerProfiles?lawyerId=${lawyerId}`);
};


export const getSingleLawyerProfile = async (id: string) => {
  return serverFetch(`/api/lawyerProfiles/${id}`);
};

export const getAdminLawyerProfiles = async () => {
  return protectedFetch("/api/admin/lawyerProfiles");
};