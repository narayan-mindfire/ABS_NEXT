import ClientProfile from "@/components/ClientProfile";
import { secureFetch } from "@/app/lib/fetchUse";

const ProfilePage = async () => {
  const res = await secureFetch("http://localhost:5001/api/v1/users/me");

  if (!res.ok) {
    return <p>Unauthorized or error loading profile</p>;
  }

  const user = await res.json();

  return <ClientProfile user={user} />;
};

export default ProfilePage;
