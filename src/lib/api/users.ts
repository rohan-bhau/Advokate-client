import { protectedFetch, serverFetch } from "../core/serverMutation";

export const getUsers = async () => {
  return protectedFetch(`/api/user`);
};