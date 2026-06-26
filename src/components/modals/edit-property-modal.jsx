"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImagePlus, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditPropertyModal({
  isOpen,
  onClose,
  property,
  onUpdate,
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Reset values when the selected property switches or opens
  useEffect(() => {
    if (property) {
      reset({
        title: property.title || "",
        location: property.location || "",
        propertyType: property.propertyType || "Apartment",
        rent: property.rent || "",
        rentType: property.rentType || "Monthly",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        propertySize: property.propertySize || "",
        description: property.description || "",
        extraFeatures: property.extraFeatures || "",
        // Convert data arrays back into viewable strings for editing fields
        amenities: Array.isArray(property.amenities)
          ? property.amenities.join(", ")
          : "",
        images: Array.isArray(property.images)
          ? property.images.join("\n")
          : "",
      });
    }
  }, [property, reset]);

  const onSubmit = async (data) => {
    const targetId = property._id;

    // Build lists safely parsing multi-line URLs and comma arrays
    const imageUrls = data.images
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const amenityList = data.amenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const payload = {
      ...property, // Preserve structural parameters like ownerInfo or dates
      ...data,
      amenities: amenityList,
      images: imageUrls,
      status: "pending", // Reset status back to pending after changes per rules
    };

    try {
      // Dynamic fallback updates matching framework paradigms
      const response = await serverMutate(
        `/api/owner/properties/${targetId}`,
        "PUT",
        payload,
      );
      if (response?.modifiedCount < 1) {
        toast.success("Property updated successfully. Awaiting review.");
        onUpdate();
      }

      onClose();
    } catch (error) {
      toast.error("Failed to update property modifications.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property Listing</DialogTitle>
          <DialogDescription>
            Modify your property fields. Submitting resets validation to
            Pending.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Core Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Property Title
              </label>
              <Input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="mt-1"
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Location Address
              </label>
              <Input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="mt-1"
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Financials & Type configuration selectors */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Property Type
              </label>
              <Controller
                name="propertyType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Penthouse">Penthouse</SelectItem>
                      <SelectItem value="Cabin">Cabin</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Rent Price ($)
              </label>
              <Input
                type="number"
                {...register("rent", { required: "Price is required", min: 1 })}
                className="mt-1"
              />
              {errors.rent && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.rent.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Rent Window
              </label>
              <Controller
                name="rentType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Window" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Dimensional specs fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Bedrooms
              </label>
              <Input
                type="number"
                {...register("bedrooms", { required: true, min: 0 })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Bathrooms
              </label>
              <Input
                type="number"
                {...register("bathrooms", { required: true, min: 0 })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Size (sq ft)
              </label>
              <Input
                type="number"
                {...register("propertySize", { required: true, min: 1 })}
                className="mt-1"
              />
            </div>
          </div>

          {/* Details text area parsing */}
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Detailed Description
            </label>
            <textarea
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Amenities details line formats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Amenities (Comma separated)
              </label>
              <Input
                type="text"
                {...register("amenities", { required: true })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Extra Features
              </label>
              <Input
                type="text"
                {...register("extraFeatures")}
                className="mt-1"
              />
            </div>
          </div>

          {/* Image lines area array tracking */}
          <div>
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <ImagePlus className="h-3 w-3 text-gray-400" />
              Property Images URLs (One URL per line)
            </label>
            <textarea
              rows={3}
              {...register("images", { required: "Image links required" })}
              className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-emerald-500 focus:outline-none font-mono text-xs"
            />
          </div>

          {/* Execution triggers row action */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
