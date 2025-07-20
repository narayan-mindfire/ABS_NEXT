import { cookies } from "next/headers";
import ClientProfile from "../../../components/ClientProfile";
import { secureFetch } from "@/app/lib/fetchUse";

const Profile = async () => {
  const cookieStore = cookies();
  console.log("Fetching profile data...");
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await secureFetch("http://localhost:5001/api/v1/users/me");

  if (!res.ok) {
    return <p>Unauthorized or error loading profile</p>;
  }

  const user = await res.json();

  return <ClientProfile user={user} />;
};

export default Profile;
