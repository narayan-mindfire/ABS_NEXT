"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../lib/axiosInterceptor";

export default function AttemptRefresh({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.post("auth/refresh-token");
        if (res.status >= 200 && res.status < 300) {
          console.log("redirecting to::");
          router.replace(redirectTo);
        } else {
          router.replace("/login");
        }
      } catch (err) {
        console.error("Refresh error:", err);
        router.replace("/login");
      }
    })();
  }, [redirectTo, router]);

  return (
    <div className="text-center mt-10">
      <p>Restoring your session...</p>
    </div>
  );
}
