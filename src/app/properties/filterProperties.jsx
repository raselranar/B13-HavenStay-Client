"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function FilterProperties({
  query,
  setQuery,
  sortBy,
  setSortBy,
  setPage,
  typeFilter,
  setTypeFilter,
}) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (sortBy) params.set("sort", sortBy);
    if (typeFilter) params.set("type", typeFilter);
    router.push(`/properties?${params.toString()}`);
  }, [query, sortBy, typeFilter]);

  return (
    <div className="mb-8 flex flex-wrap gap-4 justify-center items-center">
      <div className="flex gap-4 flex-1">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 h-fit"
          placeholder="Search by location"
        />
      </div>

      <div className="flex gap-3 justify-end items-center">
        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value);
            setPage(1);
          }}>
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
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setPage(1);
          }}>
          <SelectTrigger size="md">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="">Default</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={() => {
          setQuery("");
          setPage(1);
        }}
        className="px-4 py-3 rounded-xl bg-gray-100">
        Clear
      </button>
    </div>
  );
}
