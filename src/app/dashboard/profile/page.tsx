import ClientProfile from "@/components/profile/ClientProfile";
import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import { User } from "@/types/stateTypes";
import dynamic from "next/dynamic";
const AttemptRefresh = dynamic(
  () => import("../../../components/utility/AttemptRefresh"),
  {
    loading: () => {
      return <p>loading page</p>;
    },
  },
);

/**
 * Profile page component that fetches and displays user profile information.
 * @returns Profile page component that fetches and displays user profile information.
 */
const ProfilePage = async () => {
  try {
    const res = await serverAxios<User>("users/me");
    return <ClientProfile user={res} />;
  } catch (error: unknown) {
    console.error("Failed to fetch user profile:", error);
    return <AttemptRefresh redirectTo="/dashboard/profile" />;
  }
};

export default ProfilePage;
