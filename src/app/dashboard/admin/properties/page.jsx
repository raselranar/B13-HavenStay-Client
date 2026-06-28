"use client";

import React, { useState } from "react";
import { Check, X, ShieldAlert, MessageSquarePlus } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";

export default function AdminPropertiesPage({ initialProperties = [] }) {
  const [items, setItems] = useState(initialProperties);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApprove = async (item) => {
    const targetId = item.propertyId || item._id;
    try {
      await serverMutate(`/api/admin/properties/${targetId}/status`, "PATCH", {
        status: "approved",
      });
      setItems((prev) =>
        prev.map((p) =>
          (p.propertyId || p._id) === targetId
            ? { ...p, status: "approved" }
            : p,
        ),
      );
      toast.success("Listing application successfully approved");
    } catch {
      toast.error("Failed to execute status update");
    }
  };

  const openRejectModal = (item) => {
    setRejectTarget(item);
    setFeedbackText("");
  };

  const handleRejectSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.error("Rejection feedback description text is mandatory");
      return;
    }

    setLoading(true);
    const targetId = rejectTarget.propertyId || rejectTarget._id;

    try {
      await serverMutate(`/api/admin/properties/${targetId}/status`, "PATCH", {
        status: "rejected",
        rejectionFeedback: feedbackText,
      });

      setItems((prev) =>
        prev.map((p) =>
          (p.propertyId || p._id) === targetId
            ? { ...p, status: "rejected", rejectionFeedback: feedbackText }
            : p,
        ),
      );

      toast.success("Listing rejected and structural feedback submitted");
      setRejectTarget(null);
    } catch {
      toast.error("Failed to record structural changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Manage Properties
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Moderation interface for rental listings asset verification loops.
        </p>
      </div>

      <hr className="border-gray-200" />

      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Asset Details</th>
              <th className="px-6 py-4 font-semibold">Owner Profile</th>
              <th className="px-6 py-4 font-semibold">Pricing Structure</th>
              <th className="px-6 py-4 font-semibold">Status Parameters</th>
              <th className="px-6 py-4 font-semibold text-right">
                Moderation Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {items.map((item) => {
              const itemId = item.propertyId || item._id;
              const statusNormalized = item.status?.toLowerCase() || "pending";

              return (
                <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] && (
                        <Image
                          height={100}
                          width={100}
                          src={item.images[0]}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover bg-gray-100"
                          unoptimized
                        />
                      )}
                      <div>
                        <div className="font-bold text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">
                      {item.ownerInfo?.ownerName || "Unknown Owner"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.ownerInfo?.ownerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${item.rent}{" "}
                    <span className="text-xs font-normal text-gray-400">
                      / {item.rentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${statusNormalized === "approved" ? "bg-emerald-50 text-emerald-700" : ""}
                      ${statusNormalized === "pending" ? "bg-amber-50 text-amber-700" : ""}
                      ${statusNormalized === "rejected" ? "bg-red-50 text-red-700" : ""}
                    `}>
                      {statusNormalized}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {statusNormalized === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(item)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-2.5">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openRejectModal(item)}
                          className="h-8 px-2.5">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : statusNormalized === "rejected" &&
                      item.rejectionFeedback ? (
                      <div
                        className="text-xs text-red-500 max-w-xs ml-auto line-clamp-1 italic"
                        title={item.rejectionFeedback}>
                        &quot;{item.rejectionFeedback}&quot;
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Resolved
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No active properties require moderation.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rejection Feedback Entry Modal Frame */}
      <Dialog open={!!rejectTarget} onOpenChange={() => setRejectTarget(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <ShieldAlert className="h-5 w-5" />
              Reject Property Listing
            </DialogTitle>
            <DialogDescription>
              Specify the structural issues found with **{rejectTarget?.title}
              **. The owner will see this feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <MessageSquarePlus className="h-3.5 w-3.5 text-gray-400" />
              Rejection Reasons / Explanatory Notes
            </label>
            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g., Image documentation links are invalid, pricing bounds mismatch, or verification records insufficient..."
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm focus:border-red-500 focus:outline-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setRejectTarget(null)}
              disabled={loading}>
              Cancel Allocation
            </Button>
            <Button
              onClick={handleRejectSubmit}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white">
              {loading ? "Recording..." : "Reject Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
