// src/components/Banner.jsx
"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Banner() {
  const router = useRouter();

  const handleSearch = (e) => {
    console.log(e);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawEntries = Object.fromEntries(formData.entries());
    const search = Object.fromEntries(
      Object.entries(rawEntries).filter(([_, value]) => value !== ""),
    );
    const query = new URLSearchParams(search).toString();
    router.push(`/properties?${query}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center pt-16">
      <div className="absolute inset-0 bg-black/40 z-1" />
      <Image
        src="/banner.jpg"
        alt="Hero Background"
        fill
        className="object-cover "
      />

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
          className="bg-gray-300/85 backdrop-blur-md p-4 rounded-2xl shadow-xl text-gray-800  items-center">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex gap-4 flex-1">
              <Input
                className="px-3 py-2 h-fit"
                placeholder="Search by location"
                name="search"
              />
            </div>

            <div className="flex gap-3 justify-end items-center">
              <Select name="type">
                <SelectTrigger size="md">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Property Type</SelectLabel>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* min price */}
              <Input
                type="number"
                name="minPrice"
                className="px-3 py-2 h-fit"
                placeholder="Min Price"
              />

              {/* max price */}
              <Input
                type="number"
                name="maxPrice"
                className="px-3 py-2 h-fit"
                placeholder="Max Price"
              />
            </div>
            <Button size="lg" type="submit" className="bg-primary">
              <Search className="size-4" /> Search
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
