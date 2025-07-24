"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import { Appointment } from "@/types/stateTypes";

// Define the type for the form input if it's not exactly Appointment
export async function createAppointmentAction(
  form: Partial<Appointment> & { doctor_id: string }
) {
  try {
    const response = await serverAxios("/appointments", {
      method: "POST",
      data: {
        ...form,
        doctor_id: form.doctor_id,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
