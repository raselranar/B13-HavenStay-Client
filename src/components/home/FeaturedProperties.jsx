"use client";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";
import PropertiesCard from "../ui/PropertiesCard";

export default function FeaturedProperties({ featuredProperties }) {
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
          className="text-primary hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
          View All <MoveRightIcon />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProperties &&
          featuredProperties.map((property, idx) => (
            <PropertiesCard key={property._id} idx={idx} property={property} />
          ))}
      </div>
    </section>
  );
}
