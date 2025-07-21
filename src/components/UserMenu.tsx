"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faHospitalUser,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/context/app.context";
import { logout } from "@/app/lib/logout";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };
  const { state } = useAppContext();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const icon = state.userType === "patient" ? faHospitalUser : faUserDoctor;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FontAwesomeIcon icon={icon} className="text-xl text-gray-700" />
        {/* <span className="font-medium text-gray-700">Hi, {state.userName}</span> */}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <button
            onClick={() => {
              router.push("dashboard/profile");
              setOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2 text-sm" />
            Profile
          </button>
          <button
            onClick={async () => {
              await logout().then(() => router.replace("/login"));
            }}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 border-t"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="mr-2 text-sm"
            />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
