import { protectedFetch } from "@/lib/core/server";
import PropertyDetailsPage from "./PropertyDetailsPage";
import { getUserSession } from "@/lib/core/session";

// generate metadata
export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const property = await protectedFetch(`/api/properties/details/${id}`);

  return {
    title: property.title,
    description: property.description,
  };
};

const page = async ({ params }) => {
  const { id } = await params;
  const property = await protectedFetch(`/api/properties/details/${id}`);
  const session = await getUserSession();
  console.log(session?.session?.userId);

  return (
    <PropertyDetailsPage
      id={id}
      propertyData={property}
      userId={session?.session?.userId}
    />
  );
};
export default page;
