import ClientProfile from "@/components/ClientProfile";
import { secureFetch } from "@/app/lib/fetchUse";
import AttemptRefresh from "@/app/refresh/page";

/**
 * Profile page component that fetches and displays user profile information.
 * @returns Profile page component that fetches and displays user profile information.
 */
const ProfilePage = async () => {
  const res = await secureFetch("http://localhost:5001/api/v1/users/me");

  if (!res.ok) {
    return <AttemptRefresh redirectTo="/dashboard/profile" />;
  }

  const user = await res.json();

  return <ClientProfile user={user} />;
};

export default ProfilePage;
