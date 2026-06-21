// src/app/page.js
import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCities from "@/components/home/PopularCities";
import CustomerReviews from "@/components/home/CustomerReviews";
import { protectedFetch } from "@/lib/core/server";
import RecentlyAddedProperties from "@/components/home/RecentlyAddedProperties";
// import Footer from "@/components/Footer";

export default async function Home() {
  const featuredProperties = await protectedFetch("/api/properties/featured");
  const recentProperties = await protectedFetch("/api/properties/recent");
  return (
    <section className="min-h-screen bg-white ">
      <Banner />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <WhyChooseUs />
      <PopularCities />
      <CustomerReviews />
      <RecentlyAddedProperties recentProperties={recentProperties} />
    </section>
  );
}
