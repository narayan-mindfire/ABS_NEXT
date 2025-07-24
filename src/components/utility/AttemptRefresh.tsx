"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshAction } from "@/app/actions/refreshAction";

export default function AttemptRefresh({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { success } = await refreshAction();
      router.replace(success ? redirectTo : "/login");
    })();
  }, [redirectTo, router]);

  return (
    <div className="text-center mt-10">
      <p>Restoring your session...</p>
    </div>
  );
}
