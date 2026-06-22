import { serverMutation } from "../serverMutation"

export const createLegalProfile = async (newLegalProfile:[]) => {
    return serverMutation("/api/lawyerProfiles", newLegalProfile);
}