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
  options?: RequestInit
): Promise<Response> {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${url}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: cookieHeader,
    },
    cache: "no-store",
    credentials: "include",
  });

  return res;
}
