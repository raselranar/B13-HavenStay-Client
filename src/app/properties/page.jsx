import { protectedFetch } from "@/lib/core/server";
import PropertiesPage from "./PropertiesPage";

const page = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const query = new URLSearchParams(searchQuery).toString();
  console.log(query);
  const properties = await protectedFetch("/api/properties?" + query);
  console.log(properties);
  return <PropertiesPage properties={properties} />;
};
export default page;
