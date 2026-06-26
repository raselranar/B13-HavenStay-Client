import UserProfilePage from "@/components/userProfile";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const userSession = await getUserSession();

  return <UserProfilePage userData={userSession?.user} />;
};
export default ProfilePage;
