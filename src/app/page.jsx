// src/app/page.js
import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCities from "@/components/home/PopularCities";
import CustomerReviews from "@/components/home/CustomerReviews";
import { serverFetch } from "@/lib/core/server";
// import Footer from "@/components/Footer";

export default async function Home() {
  const featuredProperties = await serverFetch("/api/properties/featured");
  console.log(featuredProperties);
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <WhyChooseUs />
      <PopularCities />
      <CustomerReviews />
      {/* Include Reviews and Footer sections here */}
      {/* <Footer /> */}
    </main>
  );
}
