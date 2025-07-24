"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import { User } from "@/types/stateTypes";

export async function updateUserAction(
  form: Partial<User>,
): Promise<{ message: string; user: User } | { error: string }> {
  try {
    const res = await serverAxios<{ message: string; user: User }>("users/me", {
      method: "PUT",
      data: form,
    });
    return res;
  } catch (error: unknown) {
    return { error: `Update failed: ${error}` };
  }
}
