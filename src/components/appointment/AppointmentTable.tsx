"use client";
import React, { JSX, useEffect, useState, memo } from "react";

import { sortAppointments } from "@/utils/sortAppointments";

import Button from "../generic/Button";
import { useAppContext } from "../../context/app.context";
import type { Appointment } from "../../types/stateTypes";
import { useAppointmentActions } from "../../hooks/useAppointmentActions";

/**
 * TableRow Component
 *
 * Renders a single row in the appointment table.
 * Displays appointment details and provides actions based on user type.
 *
 * @component
 * @param {TableRowProps} props - The props for the TableRow component.
 * @returns {JSX.Element}
 */
interface TableRowProps {
  app: Appointment;
  isEditing?: boolean;
  onDelete: () => void;
  onEdit: () => void;
  userType: "doctor" | "patient" | "admin" | null;
}

const TableRow: React.FC<TableRowProps> = memo(
  ({ app, isEditing, onDelete, onEdit, userType }) => {
    return (
      <tr
        className={`${
          isEditing ? "bg-gray-200 border-2 border-black" : ""
        } hover:bg-gray-100`}
      >
        {userType === "doctor" && (
          <td className="px-3 py-2 border-b border-gray-200">{app.name}</td>
        )}
        {userType === "patient" && (
          <td className="px-3 py-2 border-b border-gray-200">{app.doctor}</td>
        )}
        <td className="px-3 py-2 border-b border-gray-200">{app.date}</td>
        <td className="px-3 py-2 border-b border-gray-200">{app.slot}</td>
        <td className="px-3 py-2 border-b border-gray-200">{app.purpose}</td>
        {userType === "patient" && (
          <td className="px-3 py-2 border-b border-gray-200 flex gap-1 md:gap-1 items-center">
            <Button variant="default" className="w-full" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="danger" className="w-full" onClick={onDelete}>
              Cancel
            </Button>
          </td>
        )}
      </tr>
    );
  }
);
TableRow.displayName = "TableRow";

const AppointmentTable = ({
  initialAppointments,
  userType,
}: {
  initialAppointments: Appointment[];
  userType: "patient" | "doctor" | "admin" | null;
}): JSX.Element => {
  const { modal, deleteAppointment, editAppointment } = useAppointmentActions();
  const { state } = useAppContext();
  const [appointments, setAppointments] = useState(initialAppointments);
  const sortedAppointments = state.sortAppointmentsBy
    ? sortAppointments(appointments, state.sortAppointmentsBy)
    : appointments;

  useEffect(() => {
    setAppointments(state.appointments || []);
  }, [state.appointments]);

  return (
    <>
      <table className="w-full mt-4 border-collapse bg-white rounded shadow-md max-h-[80vh] overflow-y-auto">
        <thead className="bg-gray-100 text-left">
          <tr>
            {userType === "doctor" && <th className="px-3 py-2">Name</th>}
            {userType === "patient" && <th className="px-3 py-2">Doctor</th>}
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Slot</th>
            <th className="px-3 py-2">Purpose</th>
            {userType === "patient" && <th className="px-3 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedAppointments.map((app) => {
            const handleEdit = () => editAppointment(app);
            const handleDelete = () => deleteAppointment(app.id);

            return (
              <TableRow
                key={app.id}
                app={app}
                isEditing={app.id === state.editingAppointmentId}
                onEdit={handleEdit}
                onDelete={handleDelete}
                userType={userType}
              />
            );
          })}
        </tbody>
      </table>
      {modal}
    </>
  );
};

export default AppointmentTable;
