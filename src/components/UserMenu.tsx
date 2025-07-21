"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faHospitalUser,
  faRightFromBracket,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/context/app.context";
import { logout } from "@/app/lib/logout";
import Button from "./Button";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { state } = useAppContext();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const icon = state.userType === "patient" ? faHospitalUser : faUserDoctor;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex mr-5 items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 transition-all border border-gray-200 shadow-sm"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FontAwesomeIcon icon={icon} className="text-xl text-gray-700" />
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-gray-800">
            {state.userName || "User"}
          </p>
          <p className="text-xs text-gray-500 capitalize">{state.userType}</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="py-2">
            <Button
              onClick={() => {
                router.push("/dashboard/profile");
                setOpen(false);
              }}
              variant="ghost"
              className="flex items-center w-full gap-2 hover:bg-gray-100 transition text-gray-500"
            >
              <FontAwesomeIcon icon={faUser} className="text-gray-500" />
              Profile
            </Button>

            <Button
              variant="ghost"
              className="flex items-center w-full gap-2 hover:bg-gray-100 transition text-gray-500"
            >
              <FontAwesomeIcon icon={faGear} className="text-gray-500" />
              Settings
            </Button>
          </div>

          <div className="border-t border-gray-200" />

          <button
            onClick={async () => {
              await logout().then(() => router.replace("/"));
            }}
            className="flex items-center w-full gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-red-500"
            />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
