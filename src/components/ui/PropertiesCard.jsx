"use client";
import Image from "next/image";
import { Button } from "./button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card } from "./card";
import Link from "next/link";

const MotionCard = motion(Card);
const PropertiesCard = ({ property, idx, hideButton = null }) => {
  const router = useRouter();

  //   const handleDetailsRedirect = (id) => {
  //     if (!session) {
  //       router.push("/login");
  //     } else {
  //       router.push(`/properties/${id}`);
  //     }
  //   };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      // Combines shadcn layout with your hover scale triggers
      className="group overflow-hidden pt-0 shadow-xs hover:shadow-md transition-shadow flex flex-col h-full rounded-2xl">
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Details */}
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
          <p className="text-xs text-gray-400 mb-4">{property.location}</p>
          <div className="flex gap-4 text-xs text-gray-500 mb-6">
            <span>🛏️ {property.bedrooms} Beds</span>
            <span>🛁 {property.bathrooms} Baths</span>
          </div>
        </div>
        {!hideButton && (
          <Button className={"py-4 text-sm"} asChild>
            <Link href={`/properties/${property._id}`}>View Details</Link>
          </Button>
        )}
      </div>
    </MotionCard>
  );
};
export default PropertiesCard;
