import axios from "axios";
import { FormFields } from "@/types/stateTypes";

interface RegisterResponse {
  user_type: "doctor" | "patient" | "admin" | null;
  user_name: string;
  user_id: string;
  message: string;
}

export async function registerAction(input: FormFields): Promise<{
  data?: RegisterResponse;
  error?: string;
}> {
  try {
    const { data } = await axios.post<RegisterResponse>(
      "http://localhost:5001/api/v1/auth/register",
      input,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { data };
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
}
