// utils/fetchWithRefresh.ts
export async function fetchWithRefresh(input: RequestInfo, init?: RequestInit) {
  let res = await fetch(input, { ...init, credentials: "include" });

  // If access token expired, try refreshing
  if (res.status === 401) {
    const refreshRes = await fetch(
      "http://localhost:5001/api/v1/auth/refresh-token",
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (refreshRes.ok) {
      // Try the original request again
      res = await fetch(input, { ...init, credentials: "include" });
    }
  }

  return res;
}
