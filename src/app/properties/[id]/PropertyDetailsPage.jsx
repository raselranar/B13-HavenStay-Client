"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  Sparkles,
  Shield,
  Clock,
  Heart,
  Star,
  Calendar,
  Phone,
  FileText,
  X,
} from "lucide-react";
import Image from "next/image";

export default function PropertyDetailsPage({ propertyData }) {
  const [activeImage, setActiveImage] = useState(propertyData.images[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // React Hook Form for validation matching your system criteria
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Dynamic review mock instances fulfilling standard display formatting rules
  const [reviews, setReviews] = useState([
    {
      name: "David Mitchell",
      email: "david@example.com",
      date: "June 14, 2026",
      rating: 5,
      comment:
        "Absolutely breathtaking views. The private elevator and pool setup executed flawlessly.",
    },
  ]);

  const handleAddToFavorites = async () => {
    setIsFavorite(!isFavorite);
    // Dynamic database injection hook triggers here
  };

  const onBookingSubmit = async (data) => {
    setIsSubmittingBooking(true);
    try {
      // Simulate Stripe redirection / Gateway dispatch workflows
      console.log("Processing booking request payload: ", data);
      setBookingModalOpen(false);
      alert("Redirecting securely to Stripe checkout gateway...");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto text-gray-900">
      {/* Title Header Block */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 text-primary text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
            {propertyData.propertyType}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-2">
            {propertyData.title}
          </h1>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1.5 font-medium">
            <MapPin className="size-4 text-indigo-500" />
            <span>{propertyData.location}</span>
          </div>
        </div>

        <button
          onClick={handleAddToFavorites}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isFavorite
              ? "bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}>
          <Heart className={`size-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Added to Favorites" : "Save to Favorites"}
        </button>
      </div>

      {/* Grid Multi-Image Matrix Showcase UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2 h-[420px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
          <Image
            width={400}
            height={400}
            src={activeImage}
            alt={propertyData.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-fit lg:h-[420px]">
          {propertyData.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(img)}
              className={`h-48 lg:h-[202px] rounded-2xl overflow-hidden bg-gray-100 border-2 cursor-pointer transition-all ${
                activeImage === img
                  ? "border-primary"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}>
              <Image
                src={img}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Structural Information Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side Content Container Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Specification Badges Row */}
          <div className="grid grid-cols-3 gap-4 bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-xs">
            <div className="flex flex-col items-center justify-center p-2 border-r border-gray-50">
              <BedDouble className="size-5 text-indigo-500 mb-1" />
              <span className="text-xs text-gray-400 font-medium">
                Bedrooms
              </span>
              <span className="text-sm font-bold text-gray-900 mt-0.5">
                {propertyData.bedrooms}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-r border-gray-50">
              <Bath className="size-5 text-indigo-500 mb-1" />
              <span className="text-xs text-gray-400 font-medium">
                Bathrooms
              </span>
              <span className="text-sm font-bold text-gray-900 mt-0.5">
                {propertyData.bathrooms}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <Square className="size-4 text-indigo-500 mb-1.5" />
              <span className="text-xs text-gray-400 font-medium">
                Property Size
              </span>
              <span className="text-sm font-bold text-gray-900 mt-0.5">
                {propertyData.propertySize}
              </span>
            </div>
          </div>

          {/* Description Block Layout Container */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              About the Property
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
              {propertyData.description}
            </p>
          </div>

          {/* Core Amenities Fieldset Selection Mapping */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Included Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {propertyData.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 p-3.5 rounded-xl flex items-center gap-2.5 shadow-xs">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-gray-700">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Features Layout Content Zone */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Extra Specifications
            </h3>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-start gap-3 shadow-xs">
              <Sparkles className="size-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {propertyData.extraFeatures}
              </p>
            </div>
          </div>

          {/* Reviews Rendering Form Section */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Reviews & Discussion{" "}
            </h3>

            {/* Displaying Live Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">
                        {rev.name}
                      </h5>
                      <span className="text-xs text-gray-400 font-medium">
                        {rev.email} • {rev.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="size-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Control Sidebar Container Sticky Card Layout */}
        <div className="space-y-6 lg:sticky lg:top-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
            {/* Dynamic Rent Price Module */}
            <div className="flex justify-between items-baseline border-b border-gray-50 pb-4">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Pricing Context
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-gray-900">
                  ${propertyData.rent}
                </span>
                <span className="text-xs text-gray-400 font-bold ml-1">
                  / {propertyData.rentType}
                </span>
              </div>
            </div>

            {/* Verification Badges Overview Wrapper */}
            <div className="space-y-2.5 text-xs text-gray-500 font-semibold bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/50">
              <div className="flex items-center gap-2">
                <Shield className="size-3.5 text-emerald-500" />
                <span>Verified Clean HavenStay Property Listing </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-indigo-500" />
                <span>Instant Confirmation Booking Flow </span>
              </div>
            </div>

            {/* Primary Action Button Execution Zone  */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/80 text-white font-bold text-xs py-3 rounded-xl transition-colors tracking-wider uppercase cursor-pointer">
              Book Property Now
            </button>
          </div>

          {/* Owner Accountability Contact Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center gap-3">
            <div className="size-9 rounded-full bg-indigo-50 flex items-center justify-center font-black text-xs text-primary">
              {propertyData.ownerInfo.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Listed By Owner
              </p>
              <h4 className="text-xs font-bold text-gray-900">
                {propertyData.ownerInfo.name}
              </h4>
              <p className="text-xs text-gray-400 font-medium">
                {propertyData.ownerInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Dialog Modal Context */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 border border-gray-100 relative space-y-4">
            {/* Modal Exit Header Action Row */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-wide">
                  Confirm Booking Reservation
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {propertyData.title}
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-lg">
                <X className="size-4" />
              </button>
            </div>

            {/* Dynamic Form Controller Hook Integration  */}
            <form
              onSubmit={handleSubmit(onBookingSubmit)}
              className="space-y-4">
              {/* Move-in date operational field input  */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Move-In Date
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 text-gray-400 size-4" />
                  <input
                    type="date"
                    {...register("moveInDate", {
                      required: "Move-in selection date is required",
                    })}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
                {errors.moveInDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.moveInDate.message}
                  </p>
                )}
              </div>

              {/* Contact number data input field line item  */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Contact Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 text-gray-400 size-4" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register("contactNumber", {
                      required: "Contact cellular identity is required",
                    })}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary"
                  />
                </div>
                {errors.contactNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Extra details textbox area element  */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Additional Booking Notes
                </label>
                <div className="relative flex items-start">
                  <FileText className="absolute left-3 top-3 text-gray-400 size-4" />
                  <textarea
                    rows={3}
                    placeholder="Enter any specific arrangement parameters requested..."
                    {...register("additionalNotes")}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Transaction Processing CTA Button Action  */}
              <button
                type="submit"
                disabled={isSubmittingBooking}
                className="w-full bg-primary hover:bg-primary/80 disabled:bg-indigo-300 text-white font-bold text-xs py-2.5 rounded-xl tracking-wider uppercase transition-colors pt-3 cursor-pointer">
                {isSubmittingBooking
                  ? "Routing Connection..."
                  : "Proceed to Stripe Payment Gateway →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
