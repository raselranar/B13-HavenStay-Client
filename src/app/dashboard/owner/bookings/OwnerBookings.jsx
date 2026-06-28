"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";

export default function OwnerBookings({ initialBookings = [] }) {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [loadingId, setLoadingId] = useState(null);

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    try {
      // Assumes backend has an owner bookings route to update status
      const res = await serverMutate("/api/owner/bookings", "PUT", {
        id,
        bookingStatus: status,
      });
      if (res) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, bookingStatus: status } : b)),
        );
        toast.success(`Booking ${status}`);
      } else {
        toast.error("Failed to update booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating booking");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <th className="py-3 px-4">Tenant</th>
              <th className="py-3 px-4">Property</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Booking Date</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
            {bookings.map((row) => (
              <tr
                key={row._id}
                className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-semibold">
                    {row.userName || row.tenantName || row.user?.name || "—"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {row.userEmail || row.user?.email || ""}
                  </div>
                </td>
                <td className="py-3.5 px-4 font-bold text-gray-900">
                  {row.title || row.propertyTitle || "—"}
                </td>
                <td className="py-3.5 px-4 font-semibold text-gray-900">
                  ${row.rent}
                </td>
                <td className="py-3.5 px-4 text-gray-500">
                  {new Date(row.createdAt).toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`capitalize px-2.5 py-1 ${row.bookingStatus === "approved" ? "text-emerald-600" : row.bookingStatus === "rejected" ? "text-red-600" : "text-amber-600"}`}>
                    {row.bookingStatus || "pending"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateStatus(row._id, "approved")}
                      disabled={
                        loadingId === row._id ||
                        row.bookingStatus === "approved"
                      }>
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(row._id, "rejected")}
                      disabled={
                        loadingId === row._id ||
                        row.bookingStatus === "rejected"
                      }>
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400 text-xs sm:text-sm">
                  No booking requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
