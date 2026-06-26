import { getUserSession } from "@/lib/core/session";
import AddPropertyPage from "./AddPropertyPage";

export const metadata = {
  title: "Add Property",
};
const page = async () => {
  const userSession = await getUserSession();

  return <AddPropertyPage ownerData={userSession?.user} />;
};
export default page;
