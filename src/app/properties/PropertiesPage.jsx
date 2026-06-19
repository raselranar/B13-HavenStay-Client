"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PropertiesPage({ properties: initialProperties }) {
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Cities");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sortBy, setSortBy] = useState("price_asc");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // useEffect(() => {
  //   let cancelled = false;
  //   setLoading(true);
  //   axios
  //     .get("/api/properties")
  //     .then((res) => {
  //       if (cancelled) return;
  //       setProperties(res.data || sampleProperties);
  //     })
  //     .catch(() => {
  //       setProperties(sampleProperties);
  //     })
  //     .finally(() => setLoading(false));

  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  const filtered = useMemo(() => {
    let items = [...properties];
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q),
      );
    }
    if (locationFilter !== "All Cities") {
      items = items.filter((p) =>
        p.location.toLowerCase().includes(locationFilter.toLowerCase()),
      );
    }
    if (typeFilter !== "All Types") {
      items = items.filter((p) => p.type === typeFilter);
    }

    if (sortBy === "price_asc") items.sort((a, b) => a.rent - b.rent);
    if (sortBy === "price_desc") items.sort((a, b) => b.rent - a.rent);

    return items;
  }, [properties, query, locationFilter, typeFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleDetails = (id) => {
    router.push(`/properties/${id}`);
  };

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Premium Properties</h1>
          <p className="text-sm text-gray-500 mt-2">
            Find your next perfect stay with HavenStay. From urban lofts to
            coastal retreats, browse our curated list of verified properties.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr,240px] gap-4 items-center">
          <div className="flex gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, neighborhood, or building..."
              className="flex-1 border rounded-xl px-4 py-3 shadow-sm"
            />
            <button
              onClick={() => setQuery("")}
              className="px-4 py-3 rounded-xl bg-gray-100">
              Clear
            </button>
          </div>

          <div className="flex gap-3 justify-end items-center">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border rounded-xl px-3 py-2">
              <option>All Cities</option>
              <option>Dhaka</option>
              <option>Khulna</option>
              <option>Chattogram</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border rounded-xl px-3 py-2">
              <option>All Types</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Loft</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-xl px-3 py-2">
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-20">Loading…</div>
          ) : visible.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              No properties found.
            </div>
          ) : (
            visible.map((property, idx) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                  <Image
                    src={property.images?.[0] || "/placeholder.jpg"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={300}
                    height={300}
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 line-clamp-1">
                        {property.title}
                      </h3>
                      <span className="text-blue-600 font-semibold text-sm shrink-0">
                        ${property.rent}
                        <span className="text-gray-400 font-normal text-xs">
                          /{property.rentType}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      {property.location}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 mb-6">
                      <span>🛏️ {property.bedrooms} Beds</span>
                      <span>🛁 {property.bathrooms} Baths</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDetails(property._id)}
                    className="w-full text-center bg-primary hover:bg-primary/80 text-white py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-md border">
            Prev
          </button>
          <span className="px-3 py-2 rounded-md">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded-md border">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
