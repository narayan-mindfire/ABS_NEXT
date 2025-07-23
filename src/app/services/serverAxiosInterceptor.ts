import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";

/**
 * Server-safe axios wrapper with cookies from request context.
 */
export async function serverAxios<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await axios.request<T>({
    baseURL:
      process.env.NEXT_PUBLIC_API_ROUTE || "http://localhost:5001/api/v1",
    url,
    method: options?.method || "GET",
    headers: {
      ...options?.headers,
      Cookie: cookieHeader,
    },
    withCredentials: true,
    ...options,
  });
  return res.data;
}
