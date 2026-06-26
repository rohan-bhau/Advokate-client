import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { cache } from "react"; // ← এটা add করো

export type User =
  | {
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

// cache() দিয়ে wrap করলে একই request এ বারবার DB call হবে না
export const getUserSession = cache(async (): Promise<User> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user as User;
});

export const getUserToken = cache(async (): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.session?.token || null;
});

export const requireRole = async (role: "client" | "lawyer" | "admin") => {
  const user = await getUserSession(); // এখন cached, extra DB call নেই

  if (!user || user.role !== role) {
    redirect("/unauthorized");
  }
};
