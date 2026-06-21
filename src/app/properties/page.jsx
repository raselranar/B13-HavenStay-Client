import { protectedFetch } from "@/lib/core/server";
import PropertiesPage from "./PropertiesPage";

const page = async () => {
  const properties = await protectedFetch("/api/properties");
  console.log(properties);
  return <PropertiesPage properties={properties} />;
};
export default page;
