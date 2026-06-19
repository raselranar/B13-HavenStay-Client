// src/app/page.js
import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCities from "@/components/home/PopularCities";
import CustomerReviews from "@/components/home/CustomerReviews";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <FeaturedProperties />
      <WhyChooseUs />
      <PopularCities />
      <CustomerReviews />
      {/* Include Reviews and Footer sections here */}
      {/* <Footer /> */}
    </main>
  );
}
