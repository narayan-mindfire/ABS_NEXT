import { type JSX } from "react";
import AppointmentCard from "./AppointmentCard";
import type { Appointment } from "../types/stateTypes";
import { useAppContext } from "../context/app.context";
import { sortAppointments } from "../utils/sortAppointments";

function AppointmentCards(): JSX.Element {
  const { state } = useAppContext();
  const user = state.userType;
  console.log("user: ", user);
  let appointments: Appointment[] = state.appointments;
  const sortAppointmentsBy = state.sortAppointmentsBy;

  if (sortAppointmentsBy) {
    appointments = sortAppointments(appointments, sortAppointmentsBy);
  }

  return (
    <div className=" w-full max-w-7xl mx-auto p-2 md:p-6 bg-white rounded-[10px] max-h-[110vh] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {appointments.map((app) => (
          <AppointmentCard
            key={app.id}
            app={app}
            isEditing={app.id === state.editingAppointmentId}
            readonly={user === "doctor" ? true : false}
          />
        ))}
      </div>
    </div>
  );
}

export default AppointmentCards;
