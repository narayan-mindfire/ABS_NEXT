"use client";

import { useEffect, useState } from "react";
// import axiosInstance from "@/api/axiosInterceptor";
import UserMenu from "@/components/UserMenu";
import Button from "@/components/Button";
import AppointmentModal from "@/components/AppointmentModal";
import AppointmentList from "@/components/AppointmetntList";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  type Appointment = {
    _id: string;
    date: string;
    time: string;
    reason: string;
    doctor: {
      first_name: string;
      last_name: string;
      specialization: string;
    };
    patient: {
      first_name: string;
      last_name: string;
    };
    status: string;
  };

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  let userType = "doctor";

  useEffect(() => {
    const dummyAppointments = [
      {
        _id: "1",
        date: "2025-07-20",
        time: "10:00 AM",
        reason: "Routine checkup",
        doctor: {
          first_name: "Alice",
          last_name: "Smith",
          specialization: "Cardiologist",
        },
        patient: {
          first_name: "Narayan",
          last_name: "Pradhan",
        },
        status: "confirmed",
      },
      {
        _id: "2",
        date: "2025-07-22",
        time: "02:30 PM",
        reason: "Back pain",
        doctor: {
          first_name: "John",
          last_name: "Doe",
          specialization: "Orthopedic",
        },
        patient: {
          first_name: "Narayan",
          last_name: "Pradhan",
        },
        status: "pending",
      },
      {
        _id: "3",
        date: "2025-07-25",
        time: "11:45 AM",
        reason: "Skin rash",
        doctor: {
          first_name: "Sophia",
          last_name: "Lee",
          specialization: "Dermatologist",
        },
        patient: {
          first_name: "Narayan",
          last_name: "Pradhan",
        },
        status: "cancelled",
      },
    ];

    setAppointments(dummyAppointments);
    setLoading(false);
  }, []);

  //   useEffect(() => {
  //     const fetchAppointments = async () => {
  //       try {
  //         const res = await axiosInstance.get("/appointments/me");
  //         setAppointments(res.data);
  //       } catch (error) {
  //         console.error("Failed to fetch appointments:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchAppointments();
  //   }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
      {/* Header */}
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
            className="h-10"
          >
            + Create Appointment
          </Button>
        )}
      </div>

      {/* Appointments Display */}
      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        // <AppointmentList appointments={appointments} user={userType} />
        <></>
      )}

      {/* Modal */}
      {showModal && userType === "patient" && (
        <AppointmentModal
          onClose={() => setShowModal(false)}
          onSuccess={async () => {
            setLoading(true);
            try {
              //   const res = await axiosInstance.get("/appointments/me");
              //   setAppointments(res.data);
            } catch (error) {
              console.error("Failed to refresh appointments:", error);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
