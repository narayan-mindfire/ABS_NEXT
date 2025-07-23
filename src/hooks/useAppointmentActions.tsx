"use client";
import { useAppContext } from "../context/app.context";
import { useState, type JSX } from "react";
import type { Appointment } from "../types/stateTypes";
import axiosInstance from "@/app/services/axiosInterceptor";
import { useAsyncHandler } from "./useAsyncHandler";
import dynamic from "next/dynamic";

const AppointmentModal = dynamic(
  () => import("@/components/appointment/AppointmentModal"),
  { loading: () => <p>Loading form...</p> }
);

const Modal = dynamic(() => import("@/components/generic/Modal"), {
  loading: () => <p>Loading modal...</p>,
});

/**
 * Custom React hook to manage appointment-related actions such as deleting or editing appointments.
 *
 * Integrates with application context to manage global state and uses modals to handle user interactions.
 *
 * @returns {{
 *   deleteAppointment: (id: number) => void,
 *   editAppointment: (appointment: Appointment) => void,
 *   modal: JSX.Element
 * }} An object containing action handlers and the modal element.
 *
 */
export function useAppointmentActions() {
  const { state, setState } = useAppContext();
  const [modal, setModal] = useState<null | JSX.Element>(null);
  const { run: runDelete, loading: deleting } = useAsyncHandler<void>();
  const { run: runFetch, loading: fetching } = useAsyncHandler<Appointment[]>();

  function deleteAppointment(id: number) {
    const handleConfirm = async () => {
      try {
        await runDelete(axiosInstance.delete(`/appointments/${id}`));
        const updated = state.appointments.filter((app) => app.id !== id);
        console.log(updated);
        setState("appointments", updated);
        setModal(null);
      } catch (err) {
        alert("Failed to delete appointment");
        console.error(err);
      }
    };

    const handleClose = () => setModal(null);

    setModal(
      <Modal
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment?"
        onClose={handleClose}
        onConfirm={handleConfirm}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    );
  }

  function editAppointment(appointment: Appointment) {
    const handleClose = () => setModal(null);
    const handleSuccess = async () => {
      setModal(null);
      try {
        const res = await runFetch(axiosInstance.get("/appointments/me"));
        setState("appointments", res.data);
      } catch {
        alert("Failed to refresh appointments");
      }
    };

    setModal(
      <AppointmentModal
        onClose={handleClose}
        onSuccess={handleSuccess}
        initialData={{
          id: appointment.id,
          slot_date: appointment.date,
          slot_time: appointment.slot,
          purpose: appointment.purpose,
          status: appointment.status,
          doctor: appointment.doctor,
        }}
      />
    );
  }

  return {
    deleteAppointment,
    editAppointment,
    modal,
    deleting,
    fetching,
  };
}
