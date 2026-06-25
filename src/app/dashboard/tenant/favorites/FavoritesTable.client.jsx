"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FavoritesTable({ initialFavorites = [], userId }) {
  const [favorites, setFavorites] = useState(initialFavorites || []);
  const [loadingId, setLoadingId] = useState(null);
  console.log(initialFavorites);

  const getId = (item) => {
    return (
      item.propertyId || item.property?._id || item.id || item._id || item._id
    );
  };

  const handleRemove = async (item) => {
    const id = getId(item);
    if (!confirm("Remove this property from your favorites?")) return;
    setLoadingId(id);
    try {
      const res = await fetch("/api/properties/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, propertyId: id }),
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => getId(f) !== id));
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err?.message || "Failed to remove favorite");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to remove favorite");
    } finally {
      setLoadingId(null);
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">You have no favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl p-4">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase">
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Location</th>
            <th className="px-3 py-2">Price</th>
            <th className="px-3 py-2">Beds</th>
            <th className="px-3 py-2">Baths</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {favorites.map((item) => {
            const id = getId(item);
            const prop = item.property || item;
            const img =
              prop.img || prop.image || prop.photos?.[0] || prop.cover;

            return (
              <tr key={id} className="align-top">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    {img ? (
                      <div className="w-16 h-12 relative rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={img}
                          alt={prop.name || "property"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
                        —
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {prop.name}
                      </div>
                      <div className="text-xs text-gray-500">ID: {id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3">
                  {prop.location || prop.city || "—"}
                </td>
                <td className="px-3 py-3">{prop.price || prop.rent || "—"}</td>
                <td className="px-3 py-3">{prop.beds ?? "—"}</td>
                <td className="px-3 py-3">{prop.baths ?? "—"}</td>
                <td className="px-3 py-3">{prop.sqft ?? "—"}</td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(item)}
                      disabled={loadingId === id}
                      className="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100">
                      {loadingId === id ? "Removing…" : "Remove Favorite"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
