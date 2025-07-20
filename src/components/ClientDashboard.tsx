"use client";
import { useEffect, useState } from "react";
import AppointmentModal from "@/components/AppointmentModal";
import AppointmentList from "@/components/AppointmetntList";
import UserMenu from "@/components/UserMenu";
import Button from "@/components/Button";
import { useAppContext } from "@/context/app.context";
import { Appointment } from "@/types/stateTypes";

type Props = {
  appointments: Appointment[];
  userType: "patient" | "doctor" | "admin" | null;
};

const ClientDashboard = ({ appointments, userType }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { setState } = useAppContext();

  useEffect(() => {
    setState("appointments", appointments);
    setState("userType", userType);
  }, [appointments, userType]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {userType === "doctor" ? "Doctor" : "Patient"} Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here are your latest appointments.
          </p>
        </div>
        <UserMenu />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Appointments
        </h2>
        {userType === "patient" && (
          <Button
            onClick={() => setShowModal(true)}
            variant="default"
            className="h-14 md:h-10 lg:10"
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
            const res = await fetch("/api/appointments/me");
            const data = await res.json();
            setState("appointments", data);
          }}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
