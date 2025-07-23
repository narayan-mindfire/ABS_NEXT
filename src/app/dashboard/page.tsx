import AttemptRefresh from "@/components/utility/AttemptRefresh";
import ClientDashboard from "../../components/dashboard/ClientDashboard";
import { serverAxios } from "../services/serverAxiosInterceptor";
import { Appointment, User } from "@/types/stateTypes";
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
  } catch (err) {
    console.log(err);
    return <AttemptRefresh redirectTo="/dashboard" />;
  }
};

export default Dashboard;
