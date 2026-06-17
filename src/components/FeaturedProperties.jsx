// src/components/FeaturedProperties.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import axios from "axios";
import { Heart } from "lucide-react";

export default function FeaturedProperties() {
  const { data: session } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("/api/properties/featured") // API returns exactly 6 approved properties
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDetailsRedirect = (id) => {
    if (!session) {
      router.push("/login");
    } else {
      router.push(`/properties/${id}`);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Properties
          </h2>
          <p className="text-gray-500 text-sm">
            Our hand-picked selection of the most exclusive stays.
          </p>
        </div>
        <Link
          href="/properties"
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((property, idx) => (
          <motion.div
            key={property._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-xs text-gray-600 hover:text-red-500 transition-colors shadow-xs">
                <Heart className="size-4" />
              </button>
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
                onClick={() => handleDetailsRedirect(property._id)}
                className="w-full text-center bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
