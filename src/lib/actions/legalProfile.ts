import { serverMutation } from "../core/serverMutation";

export const createLegalProfile = async (newLegalProfile: []) => {
  return serverMutation("/api/lawyerProfiles", newLegalProfile);
};
