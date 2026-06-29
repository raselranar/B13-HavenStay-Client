import { protectedFetch } from "@/lib/core/server";
import AdminPropertiesPage from "./AdminPropertiesPage";

export const metadata = {
  title: "Admin Properties",
};

const page = async () => {
  const allProperties = await protectedFetch("/api/admin/properties");
  return <AdminPropertiesPage items={allProperties} />;
};
export default page;
