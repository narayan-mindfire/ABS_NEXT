import { useEffect } from "react";
import AppointmentCards from "./AppointmentCards";
import Table from "./Table";
import { useAppContext } from "../context/app.context";
import { Appointment } from "@/types/stateTypes";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppointmentList = ({
  appointments,
  userType,
}: {
  appointments: Appointment[];
  userType: "patient" | "doctor" | "admin" | null;
}) => {
  console.log("appointments from list:", appointments);
  const { state, setState } = useAppContext();
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setState("sortAppointmentsBy", sortValue || null);
  };

  const handleGridViewToggle = (isGrid: boolean) => {
    setState("isGridSelected", isGrid);
  };

  useEffect(() => {
    if (state.editingAppointmentId) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [state.editingAppointmentId]);

  return (
    console.log("appointment list"),
    (
      <>
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex gap-1 md:gap-1 items-center">
            <select
              onChange={handleSortChange}
              className="w-[180px] border border-gray-300 rounded-md font-medium focus:outline-none focus:border-black focus:border-2 text-sm px-2 py-[6px]"
            >
              <option>Sort appointments (default)</option>
              <option value="date">Sort by date (closest first)</option>
              <option value="dateR">Sort by date (closest last)</option>
              {userType === "patient" && (
                <option value="doctor">Sort by doctor name (A-Z)</option>
              )}
              {userType === "patient" && (
                <option value="doctorR">Sort by doctor name (Z-A)</option>
              )}
              {userType === "doctor" && (
                <option value="name">Sort by patient name (A-Z)</option>
              )}
              {userType === "doctor" && (
                <option value="nameR">Sort by patient name (Z-A)</option>
              )}
            </select>
            <button
              title="Grid view"
              className={`hidden md:inline-block rounded-sm border-none px-2 py-1 ${
                state.isGridSelected ? "bg-[#c5c4c4]" : "bg-white"
              }`}
              onClick={() => handleGridViewToggle(true)}
            >
              <FontAwesomeIcon icon={faThLarge} />
            </button>
            <button
              title="List view"
              className={`hidden md:inline-block rounded-sm border-none px-2 py-1 ${
                !state.isGridSelected ? "bg-[#c5c4c4]" : "bg-white"
              }`}
              onClick={() => handleGridViewToggle(false)}
            >
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center text-gray-600 text-base mt-10">
            There are no appointments yet.
          </div>
        ) : state.isGridSelected ? (
          <AppointmentCards
            initialAppointments={appointments}
            userType={userType}
          />
        ) : (
          <Table appointments={appointments} userType={userType} />
        )}
      </>
    )
  );
};

export default AppointmentList;
