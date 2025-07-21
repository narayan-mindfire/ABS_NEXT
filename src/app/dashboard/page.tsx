import { cookies } from "next/headers";
import ClientDashboard from "../../components/ClientDashboard";
import { secureFetch } from "../lib/fetchUse";

const Dashboard = async () => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const res = await secureFetch(
      "http://localhost:5001/api/v1/appointments/me"
    );
    if (!res.ok) {
      return <p>Unauthorized or failed to fetch appointments</p>;
    }

    const appointments = await res.json();

    const userRes = await secureFetch("http://localhost:5001/api/v1/users/me");

    const user = await userRes.json();

    return (
      <ClientDashboard appointments={appointments} userType={user.user_type} />
    );
  } catch (err) {
    return <p>Error fetching data</p>;
  }
};

export default Dashboard;
