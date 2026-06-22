import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export type User =
   {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
      role: string | null | undefined;
    }
  | undefined;

export const getUserSession = async (): Promise<User> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user as User;
};

export const requireRole = async (role: "client" | "lawyer" | "admin") => {
  const user = await getUserSession();

  if (!user || user.role !== role) {
    redirect("/unauthorized");
  }
};
