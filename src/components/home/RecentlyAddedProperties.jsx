"use client";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";
import PropertiesCard from "../ui/PropertiesCard";

export default function RecentlyAddedProperties({ recentProperties }) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recently Added Properties
          </h2>
          <p className="text-gray-500 text-sm">
            Check out our latest additions to the portfolio.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recentProperties &&
          recentProperties.map((property, idx) => (
            <PropertiesCard
              key={property._id}
              idx={idx}
              property={property}
              hideButton={true}
            />
          ))}
      </div>
    </section>
  );
}
