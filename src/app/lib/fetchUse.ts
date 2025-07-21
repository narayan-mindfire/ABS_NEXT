import { cookies } from "next/headers";

/**
 * Securely fetch data from a URL with cookie support and automatic token refreshing.
 * @param url - The URL to fetch data from.
 * @param options - Fetch options.
 * @param attempt - The current attempt number (for retrying on 401).
 * @returns The fetch response.
 */
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
    console.log("re-attempt");
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

    if (refreshRes.ok) {
      console.log("Token refreshed successfully");
      return secureFetch(url, options, attempt + 1);
    }
  }

  return res;
}
