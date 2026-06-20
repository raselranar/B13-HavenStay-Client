import { serverFetch } from "@/lib/core/server";
import PropertyDetailsPage from "./PropertyDetailsPage";

// generate metadata
export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const property = await serverFetch(`/api/properties/details/${id}`);

  return {
    title: property.title,
    description: property.description,
  };
};

const page = async ({ params }) => {
  const { id } = await params;
  const property = await serverFetch(`/api/properties/details/${id}`);

  return <PropertyDetailsPage id={id} propertyData={property} />;
};
export default page;
