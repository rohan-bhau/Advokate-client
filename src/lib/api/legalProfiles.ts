import { serverFetch } from "../core/serverMutation"

export const getLawyerProfiles = async (lawyerId: string) => {
    return serverFetch(`/api/my/lawyerProfiles?lawyerId=${lawyerId}`);
}