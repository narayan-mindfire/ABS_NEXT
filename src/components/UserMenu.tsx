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

const dummyUser = {
  userType: "doctor",
  userName: "Narayan",
};

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const icon = dummyUser.userType === "patient" ? faHospitalUser : faUserDoctor;

  const handleLogout = () => {
    // TODO: Replace with actual logout logic
    console.log("Logged out");
    router.push("/unauthenticated");
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <FontAwesomeIcon icon={icon} className="text-xl text-gray-700" />
        <span className="font-medium text-gray-700">
          Hi, {dummyUser.userName}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <button
            onClick={() => {
              router.push("/profile");
              setOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2 text-sm" />
            Profile
          </button>
          <button
            onClick={handleLogout}
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
