// src/components/Banner.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

export default function Banner() {
  const router = useRouter();
  const [search, setSearch] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(search).toString();
    router.push(`/properties?${query}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center pt-16">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Your Sanctuary Awaits.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-200 max-w-2xl mx-auto mb-12">
          Discover curated luxury properties for short-term stays and long-term
          residence. Trust, transparency, and exquisite comfort.
        </motion.p>

        {/* Search Bar Container */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl text-gray-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-2 border-r border-gray-200 px-2 last:border-0">
            <MapPin className="text-gray-400 size-5 shrink-0" />
            <input
              type="text"
              placeholder="Where to?"
              className="w-full text-sm outline-none bg-transparent"
              onChange={(e) =>
                setSearch({ ...search, location: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2 border-r border-gray-200 px-2 last:border-0">
            <Home className="text-gray-400 size-5 shrink-0" />
            <select
              className="w-full text-sm outline-none bg-transparent text-gray-500"
              onChange={(e) => setSearch({ ...search, type: e.target.value })}>
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-2">
            <DollarSign className="text-gray-400 size-5 shrink-0" />
            <input
              type="number"
              placeholder="Max Price"
              className="w-full text-sm outline-none bg-transparent"
              onChange={(e) =>
                setSearch({ ...search, maxPrice: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Search className="size-4" /> Search
          </button>
        </motion.form>
      </div>
    </section>
  );
}
