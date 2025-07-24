"use server";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import { Slot } from "@/const/const";
export async function getSlotAction({
  doctor_id,
  slot_date,
}: {
  doctor_id: string;
  slot_date: string;
}): Promise<{ data?: Slot[]; error?: string }> {
  try {
    const response = await serverAxios<Slot[]>("/slots/doctor", {
      method: "GET",
      params: { doctor_id, slot_date },
    });

    return { data: response };
  } catch (error) {
    console.error("Failed to fetch booked slots:", error);
    return { error: "Could not fetch booked slots" };
  }
}
