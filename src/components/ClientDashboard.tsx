"use client";
import { useEffect, useState } from "react";
import AppointmentModal from "@/components/AppointmentModal";
import AppointmentList from "@/components/AppointmetntList";
import Button from "@/components/Button";
import { useAppContext } from "@/context/app.context";
import { Appointment } from "@/types/stateTypes";
import axiosInstance from "@/app/lib/axiosInterceptor";

type Props = {
  appointments: Appointment[];
  userType: "patient" | "doctor" | "admin" | null;
};

/**
 *
 * @param param0 - Component properties.
 * @param {Appointment[]} param0.appointments - List of appointments to display.
 * @param {"patient" | "doctor" | "admin" | null} param0.userType - The type of user viewing the appointments.
 * @description This component serves as the client dashboard, displaying a list of appointments and allowing patients to create new appointments.
 * It uses the AppointmentModal for creating or editing appointments.
 * It also manages the state of appointments and user type using the application context.
 * @returns {JSX.Element}
 */
const ClientDashboard = ({ appointments, userType }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { setState } = useAppContext();

  useEffect(() => {
    setState("appointments", appointments);
    setState("userType", userType);
  }, [appointments, userType]);

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-x-hidden">
      <div className="flex-1 px-4 py-0 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
          {userType === "patient" && (
            <Button
              onClick={() => setShowModal(true)}
              variant="default"
              className="h-14 md:h-10"
            >
              + Create Appointment
            </Button>
          )}
        </div>

        <AppointmentList appointments={appointments} userType={userType} />

        {showModal && userType === "patient" && (
          <AppointmentModal
            onClose={() => setShowModal(false)}
            onSuccess={async () => {
              const res = await axiosInstance("/appointments/me");
              setState("appointments", res.data);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
