import DashboardShell from "@/components/dashboard/DashboardShell";
import { getUserRole, getUserSession } from "@/lib/core/session";

export default async function DashboardLayout({ children }) {
  const session = await getUserSession();
  const user = session?.user;
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
