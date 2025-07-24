"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
interface FormState {
  doctor_id?: string;
  slot_date: string;
  slot_time: string;
  purpose: string;
  status: string;
}
export async function updateAppointmentAction({
  appointment_id,
  form,
}: {
  appointment_id: number;
  form: Partial<FormState>;
}) {
  try {
    const response = await serverAxios(`/appointments/${appointment_id}`, {
      method: "PUT",
      data: {
        ...form,
        doctor_id: form.doctor_id,
      },
    });

    return response;
  } catch (error) {
    return { error: `Failed to update appointment.  ${error}` };
  }
}
