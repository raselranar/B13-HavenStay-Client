import { serverFetch } from "@/lib/core/server";
import PropertiesPage from "./PropertiesPage";

const page = async () => {
  const properties = await serverFetch("/api/properties");
  console.log(properties);
  return <PropertiesPage properties={properties} />;
};
export default page;
