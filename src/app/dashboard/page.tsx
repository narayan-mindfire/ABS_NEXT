import ClientDashboard from "../../components/ClientDashboard";
import { secureFetch } from "../lib/fetchUse";
import AttemptRefresh from "../refresh/page";

/**
 * dashboard page component that fetches and displays user appointments and profile information.
 * It uses the secureFetch function to handle authentication and data retrieval.
 * @returns Dashboard page component that fetches and displays user appointments and profile information.
 */
const Dashboard = async () => {
  try {
    const res = await secureFetch(
      "http://localhost:5001/api/v1/appointments/me"
    );
    if (!res.ok) {
      return <AttemptRefresh redirectTo="/dashboard" />;
    }

    const appointments = await res.json();

    const userRes = await secureFetch("http://localhost:5001/api/v1/users/me");

    const user = await userRes.json();

    return (
      <ClientDashboard appointments={appointments} userType={user.user_type} />
    );
  } catch (err) {
    console.log("error found");
    return;
  }
};

export default Dashboard;
