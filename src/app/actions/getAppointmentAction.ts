"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import { Appointment } from "@/types/stateTypes";

export async function deleteAppointmentAction(
  id: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    await serverAxios(`/appointments/${id}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Delete appointment error:", error);
    return { success: false, error: "Failed to delete appointment." };
  }
}

export async function getAppointmentsAction(): Promise<
  Appointment[] | { error: string }
> {
  try {
    const response = await serverAxios<Appointment[]>("/appointments/me", {
      method: "GET",
    });

    return response;
  } catch (error: unknown) {
    console.error("Get appointments error:", error);
    return { error: "Failed to fetch appointments." };
  }
}
