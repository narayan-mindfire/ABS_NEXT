"use client";

import { useAppContext } from "@/context/app.context";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/lib/logout";
import { Menu, X } from "lucide-react";
import Button from "@/components/Button";
import UserMenu from "@/components/UserMenu";
import clsx from "clsx";
import { useState } from "react";
import axiosInstance from "../lib/axiosInterceptor";

const sidebarOptions = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/dashboard/profile" },
];

/**
 *
 * @param param0 - Component properties.
 * @param {React.ReactNode} children - The child components to render within the layout.
 * This layout provides a consistent sidebar and header for the dashboard.
 * It includes a responsive sidebar that can be toggled on smaller screens.
 * It also handles user logout functionality.
 * @description This component serves as the layout for the dashboard, providing a sidebar and header.
 * It uses the application context to manage user state and provides navigation options.
 * @returns {JSX.Element} The rendered layout component.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const username = state.userName || "User";

  return (
    <div className="max-h-[90vh] overflow-hidden flex bg-gray-50 relative overflow-x-hidden">
      <div className="hidden md:flex w-64 shadow-md p-6 flex-col justify-between">
        <div className="space-y-6">
          <div>
            <p className="text-gray-800 font-semibold text-lg">
              Hi, {username}
            </p>
            <p className="text-gray-500 text-sm">Welcome!</p>
          </div>
          <div className="space-y-4">
            {sidebarOptions.map(({ label, path }) => (
              <Button
                key={label}
                onClick={() => router.push(path)}
                isSelected={pathname === path}
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
              await logout().then(() => router.replace("/"));
            }}
            className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-gray-100 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 bg-opacity-30 md:hidden">
          <div className="absolute left-0 top-0 h-full w-64 bg-zinc-200 shadow-md p-6 flex flex-col justify-between animate-slide-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-800 font-semibold text-lg">
                    Hi, {username}
                  </p>
                  <p className="text-gray-500 text-sm">Welcome!</p>
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
                      setSidebarOpen(false);
                      router.push(path);
                    }}
                    className={clsx(
                      "w-full text-left px-4 py-2 rounded-lg font-medium",
                      pathname === path
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
                  await logout().then(() => router.replace("/"));
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-gray-100 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 px-4 py-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {pathname.split("/").pop()}
              </h1>
              <p className="text-gray-500 text-sm">
                {state.userType} {pathname.split("/").pop()}
              </p>
            </div>
          </div>
          <UserMenu />
        </div>
        <nav
          className="flex text-gray-500 text-sm flex-1"
          aria-label="Breadcrumb"
        >
          {pathname
            .replace(/^\/|\/$/g, "")
            .split("/")
            .map((segment, idx, arr) => {
              const path = "/" + arr.slice(0, idx + 1).join("/");
              const isLast = idx === arr.length - 1;
              return (
                <span key={path} className="flex items-center">
                  {idx > 0 && <span className="mx-1">{">"}</span>}
                  {!isLast ? (
                    <button
                      className="hover:underline capitalize"
                      onClick={() => router.push(path)}
                      type="button"
                    >
                      {segment}
                    </button>
                  ) : (
                    <span className="capitalize font-semibold">{segment}</span>
                  )}
                </span>
              );
            })}
        </nav>
        {children}
      </div>
    </div>
  );
}
