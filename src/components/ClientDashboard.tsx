"use client";
import { useEffect, useState } from "react";
import AppointmentModal from "@/components/AppointmentModal";
import AppointmentList from "@/components/AppointmetntList";
import UserMenu from "@/components/UserMenu";
import Button from "@/components/Button";
import { useAppContext } from "@/context/app.context";
import { Appointment } from "@/types/stateTypes";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { logout } from "@/app/lib/logout";
import { useRouter } from "next/navigation";

type Props = {
  appointments: Appointment[];
  userType: "patient" | "doctor" | "admin" | null;
};

const sidebarOptions = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "dashboard/profile" },
];

const ClientDashboard = ({ appointments, userType }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [activeOption, setActiveOption] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setState, state } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setState("appointments", appointments);
    setState("userType", userType);
  }, [appointments, userType]);

  const username = state.userName || "User";

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
        <div className="space-y-6">
          <div>
            <p className="text-gray-800 font-semibold text-lg">
              Hi, {username}
            </p>
            <p className="text-gray-500 text-sm">Welcome back!</p>
          </div>
          <div className="space-y-4">
            {sidebarOptions.map(({ label, path }) => (
              <Button
                key={label}
                onClick={() => {
                  setActiveOption(label);
                  router.push(path);
                }}
                isSelected={activeOption === label}
                variant="ghost"
                className="w-full text-left"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={async () => {
              await logout().then(() => router.replace("/login"));
            }}
            className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-gray-100 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/30  bg-opacity-30 md:hidden">
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-md p-6 flex flex-col justify-between animate-slide-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-800 font-semibold text-lg">
                    Hi, {username}
                  </p>
                  <p className="text-gray-500 text-sm">Welcome back!</p>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {sidebarOptions.map(({ label, path }) => (
                  <button
                    key={label}
                    onClick={() => {
                      setActiveOption(label);
                      setSidebarOpen(false);
                      router.push(path);
                    }}
                    className={clsx(
                      "w-full text-left px-4 py-2 rounded-lg font-medium",
                      activeOption === label
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={async () => {
                  await fetch("/api/logout", { method: "POST" });
                  window.location.href = "/login";
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-gray-100 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 px-4 py-6 w-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold md:text-s3xl md:mt-0 mt-3 text-gray-800">
                {userType === "doctor" ? "Doctor" : "Patient"} Dashboard
              </h1>
              <p className="text-gray-500 text-sm">
                Here are your latest appointments.
              </p>
            </div>
          </div>
          <div>
            <UserMenu />
          </div>
        </div>

        {/* Appointments Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Appointments
          </h2>
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
              const res = await fetch("/api/appointments/me");
              const data = await res.json();
              setState("appointments", data);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
