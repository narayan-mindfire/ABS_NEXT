import dynamic from "next/dynamic";

import { serverAxios } from "@/app/services/serverAxiosInterceptor";
import ClientProfile from "@/components/profile/ClientProfile";
import { User } from "@/types/stateTypes";

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
  } catch {
    return <AttemptRefresh redirectTo="/dashboard/profile" />;
  }
};

export default ProfilePage;
