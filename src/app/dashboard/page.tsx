import dynamic from "next/dynamic";

import { Appointment, User } from "@/types/stateTypes";

import ClientDashboard from "../../components/dashboard/ClientDashboard";
import { serverAxios } from "../services/serverAxiosInterceptor";

const AttemptRefresh = dynamic(
  () => import("../../components/utility/AttemptRefresh"),
  {
    loading: () => {
      return <p>loading page</p>;
    },
  }
);

/**
 * dashboard page component that fetches and displays user appointments and profile information.
 * It uses the  function to handle authentication and data retrieval.
 * @returns Dashboard page component that fetches and displays user appointments and profile information.
 */
const Dashboard = async () => {
  try {
    const appointments = await serverAxios<Appointment[]>("appointments/me");
    const userRes = await serverAxios<User>("users/me");
    return (
      <ClientDashboard
        appointments={appointments}
        userType={userRes.user_type}
      />
    );
  } catch {
    return <AttemptRefresh redirectTo="/dashboard" />;
  }
};

export default Dashboard;
