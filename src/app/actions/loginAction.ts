import axios from "axios";

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  user_type: "doctor" | "patient" | "admin" | null;
  user_name: string;
  message: string;
}

export async function loginAction(input: LoginInput): Promise<{
  data?: LoginResponse;
  error?: string;
}> {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_ROUTE || "http://localhost:5001/api/v1/"}auth/login`,
      input,
      {
        withCredentials: true,
      },
    );

    return { data: response.data };
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
}
