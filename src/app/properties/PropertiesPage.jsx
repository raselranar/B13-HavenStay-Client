"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PropertiesCard from "@/components/ui/PropertiesCard";
import FilterProperties from "./filterProperties";

export default function PropertiesPage({ properties }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Cities");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [totalPages, setTotalPages] = useState(
    Math.max(
      1,
      Math.ceil(
        (properties?.total ?? properties?.length ?? properties.length) /
          pageSize,
      ),
    ),
  );

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

  // visible items come from API (already paginated) — stored in `properties`.
  // When API is not available we fall back to client-side sample data.
  const visible = properties;

  const handleDetails = (id) => {
    router.push(`/properties/${id}`);
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Premium Properties</h1>
          <p className="text-sm text-gray-500 mt-2">
            Find your next perfect stay with HavenStay. From urban lofts to
            coastal retreats, browse our curated list of verified properties.
          </p>
        </div>

        <FilterProperties
          query={query}
          setQuery={setQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setPage={setPage}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 h-125 text-center py-20">Loading…</div>
          ) : visible.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              No properties found.
            </div>
          ) : (
            visible.map((property, idx) => (
              <PropertiesCard
                key={property._id}
                property={property}
                idx={idx}
              />
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
