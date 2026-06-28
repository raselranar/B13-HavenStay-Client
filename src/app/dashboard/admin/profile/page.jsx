import UserProfilePage from "@/components/userProfile";
import { getUserRole, getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const userSession = await getUserSession();
  const role = await getUserRole();

  if (role !== "admin") {
    redirect("/unauthorized");
  }

  return <UserProfilePage userData={userSession?.user} />;
};
export default ProfilePage;
