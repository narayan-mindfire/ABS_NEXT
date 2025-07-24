"use client";
import { useAppContext } from "../context/app.context";
import { useState, type JSX } from "react";
import type { Appointment } from "../types/stateTypes";
import axios from "axios";
import dynamic from "next/dynamic";
import {
  deleteAppointmentAction,
  getAppointmentsAction,
} from "@/app/actions/getAppointmentAction";

const AppointmentModal = dynamic(
  () => import("@/components/appointment/AppointmentModal"),
  { loading: () => <p>Loading form...</p> },
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

  function deleteAppointment(id: number) {
    const handleConfirm = async () => {
      try {
        await deleteAppointmentAction(id);
        const updated = state.appointments.filter((app) => app.id !== id);
        setState("appointments", updated);
        setModal(null);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to delete appointment:", error);
          alert("Failed to delete appointment");
        } else {
          console.error("Unexpected error:", error);
          alert("Something went wrong");
        }
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
      />,
    );
  }

  function editAppointment(appointment: Appointment) {
    const handleClose = () => setModal(null);
    const handleSuccess = () => {
      setModal(null);
      getAppointmentsAction().then((res) => {
        if (Array.isArray(res)) {
          setState("appointments", res);
        } else {
          console.error("Failed to fetch appointments:", res.error);
        }
      });
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
      />,
    );
  }

  return {
    deleteAppointment,
    editAppointment,
    modal,
  };
}
