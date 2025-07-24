import axios from "axios";

export async function refreshAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const res = await axios.post(
      "http://localhost:5001/api/v1/auth/refresh-token",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { success: res.status >= 200 && res.status < 300 };
  } catch (err) {
    throw err;
  }
}
