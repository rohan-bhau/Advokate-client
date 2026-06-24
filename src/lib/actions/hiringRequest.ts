'use server'

import { serverMutation } from "../core/serverMutation";

export const submitHiringRequest = async (payload: any) => {
  return serverMutation("/api/client/hire-lawyer", payload, "POST");
};
