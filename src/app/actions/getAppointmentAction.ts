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
    return { success: false, error: `Failed to delete appointment. ${error}` };
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
    return { error: `Failed to fetch appointments., ${error}` };
  }
}
