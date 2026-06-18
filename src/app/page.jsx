// src/app/page.js
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <FeaturedProperties />
      <WhyChooseUs />
      {/* Include Reviews and Footer sections here */}
      {/* <Footer /> */}
    </main>
  );
}
