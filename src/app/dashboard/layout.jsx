import DashboardShell from "@/components/dashboard/DashboardShell";
import { getUserRole } from "@/lib/core/session";

export default async function DashboardLayout({ children }) {
  const role = await getUserRole();

  return <DashboardShell role={role}>{children}</DashboardShell>;
}
