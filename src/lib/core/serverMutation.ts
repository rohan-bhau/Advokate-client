const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL environment variable is missing");
}

export const serverFetch = async <T = any>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`);

  if (!res.ok) {
    throw new Error(`Fetch failed with status: ${res.status}`);
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
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Mutation failed with status: ${res.status}`);
  }

  return res.json();
};
