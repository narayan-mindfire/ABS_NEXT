// lib/secureFetch.ts
import { cookies } from "next/headers";

export async function secureFetch(
  url: string,
  options?: RequestInit,
  attempt = 0
): Promise<Response> {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: cookieHeader,
    },
    cache: "no-store",
    credentials: "include",
  });

  if (res.status === 401 && attempt < 1) {
    console.log("Access token expired, trying to refresh...");
    // Try to refresh the token
    const refreshRes = await fetch(
      "http://localhost:5001/api/v1/auth/refresh-token",
      {
        method: "POST",
        headers: {
          Cookie: cookieHeader,
        },
        credentials: "include",
      }
    );
    console.log("Refresh token response:", refreshRes);

    if (refreshRes.ok) {
      // Try the original request again after refreshing
      return secureFetch(url, options, attempt + 1);
    }
  }

  return res;
}
