"use client";

import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { useAppContext } from "../context/app.context";
import { sortAppointments } from "../utils/sortAppointments";
import type { Appointment } from "../types/stateTypes";

function AppointmentCards({
  initialAppointments,
  userType,
}: {
  initialAppointments: Appointment[];
  userType: "patient" | "doctor" | "admin" | null;
}) {
  const { state } = useAppContext();
  const [appointments, setAppointments] = useState(initialAppointments);

  const sortedAppointments = state.sortAppointmentsBy
    ? sortAppointments(appointments, state.sortAppointmentsBy)
    : appointments;

  useEffect(() => {
    setAppointments(state.appointments || []);
  }, [state.appointments]);
  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-6 bg-white rounded-[10px] max-h-[110vh] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sortedAppointments.map((app) => (
          <AppointmentCard
            key={app.id}
            app={app}
            isEditing={app.id === state.editingAppointmentId}
            readonly={userType === "doctor"}
            userType={userType}
          />
        ))}
      </div>
    </div>
  );
}

export default AppointmentCards;
