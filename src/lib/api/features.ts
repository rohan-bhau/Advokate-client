import {  serverFetch } from "../core/serverMutation";

export const getHomeFeaturedData = async () => {
  return serverFetch(`/api/home/featured-lawyers`);
};