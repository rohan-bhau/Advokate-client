import { redirect } from "next/navigation";
import { getUserToken } from "./core";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL environment variable is missing");
}

export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();

  const header: Record<string, string> = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};

  return header;
};

export const serverFetch = async <T = any>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`);

  if (!res.ok) {
    throw new Error(`Fetch failed with status: ${res.status}`);
  }

    if (res.status === 401) {
      redirect("/login");
    } else if (res.status === 403) {
      redirect("/unauthorized");
    }


  return res.json();
};

export const protectedFetch = async <T = any>(path: string): Promise<T> => {
  const res = await fetch(
    `${baseUrl}${path}`,

    {
      headers: await authHeader(),
    },
  );

    if (res.status === 401) {
      redirect("/login");
    } else if (res.status === 403) {
      redirect("/unauthorized");
    }


  return res.json();
};

export const serverMutation = async <T = any>(
  path: string,

  data: any,

  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,

    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Mutation failed with status: ${res.status}`);
  }
  if (res.status === 401) {
    redirect("/login")
  } else if (res.status === 403) {
    redirect("/unauthorized")
  }

  return res.json();
};

