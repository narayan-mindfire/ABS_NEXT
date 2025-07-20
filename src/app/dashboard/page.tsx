import { cookies } from "next/headers";
import ClientDashboard from "../../components/ClientDashboard";

const Dashboard = async () => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const res = await fetch("http://localhost:5001/api/v1/appointments/me", {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return <p>Unauthorized or failed to fetch appointments</p>;
    }

    const appointments = await res.json();

    // Optionally fetch userType from /users/me if needed
    const userRes = await fetch("http://localhost:5001/api/v1/users/me", {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    const user = await userRes.json();

    return (
      <ClientDashboard appointments={appointments} userType={user.user_type} />
    );
  } catch (err) {
    return <p>Error fetching data</p>;
  }
};

export default Dashboard;
