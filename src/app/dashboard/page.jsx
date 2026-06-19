import { getUserRole } from "@/lib/core/session";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const role = await getUserRole();
  console.log(role);
  const dashboardUrl = `/dashboard/${role.toLowerCase()}`;
  console.log(dashboardUrl);
  redirect(dashboardUrl); // Redirect to admin or user dashboard based on role
};
export default Dashboard;
