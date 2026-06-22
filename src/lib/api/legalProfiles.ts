import { serverFetch } from "../core/serverMutation"


export const getLawyers = async (queryString: string = "") => {
  return serverFetch(`/api/lawyerProfiles${queryString}`);
};

export const getLawyerProfiles = async (lawyerId: string) => {
    return serverFetch(`/api/my/lawyerProfiles?lawyerId=${lawyerId}`);
}