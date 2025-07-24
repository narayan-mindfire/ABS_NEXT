"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";

export async function deleteUserAction() {
  try {
    const res = await serverAxios("users/me", {
      method: "DELETE",
    });
    return res;
  } catch (error: unknown) {
    return error;
  }
}
