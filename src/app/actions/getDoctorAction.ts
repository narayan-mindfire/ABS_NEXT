"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import { User } from "@/types/stateTypes";
export async function getDoctorAction(): Promise<{
  data?: User[];
  error?: string;
}> {
  try {
    const response = await serverAxios<User[]>("/users", {
      method: "GET",
      params: { duser_type: "doctor" },
    });

    return { data: response };
  } catch (error) {
    console.error("Failed to fetch booked slots:", error);
    return { error: "Could not fetch booked slots" };
  }
}
