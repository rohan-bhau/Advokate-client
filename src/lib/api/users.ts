import { serverFetch } from "../core/serverMutation";

export const getUsers = async () => {
  return serverFetch(`/api/user`);
};