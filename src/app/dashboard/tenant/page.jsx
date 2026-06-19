// src/app/dashboard/page.js
"use client";
import { ArrowUpRight, Heart, Calendar, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TenantDashboard() {
  // Mock data arrays matching database entries for real-time visualization mapping
  const analyticsData = [
    {
      label: "Active Bookings",
      value: "3",
      sub: "Properties booked",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      label: "Saved Places",
      value: "12",
      sub: "Homes in favorites",
      icon: Heart,
      color: "text-pink-600",
    },
    {
      label: "Total Spent",
      value: "$4,280",
      sub: "Past 12 months",
      icon: CreditCard,
      color: "text-indigo-600",
    },
  ];

  const recentBookings = [
    {
      name: "Skyline Penthouse",
      date: "Oct 12 - Oct 15, 2024",
      amount: "$1,200.00",
      status: "Approved",
    },
    {
      name: "Modern Lake Cabin",
      date: "Nov 02 - Nov 08, 2024",
      amount: "$850.00",
      status: "Pending",
    },
    {
      name: "Urban Loft Studio",
      date: "Dec 20 - Dec 24, 2024",
      amount: "$450.00",
      status: "Rejected",
    },
  ];

  const favoritesPreview = [
    {
      name: "Coastal Retreat",
      location: "Malibu, California",
      price: "$245",
      beds: 3,
      baths: 2,
      sqft: 1200,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Pine Forest Cabin",
      location: "Aspen, Colorado",
      price: "$180",
      beds: 2,
      baths: 1,
      sqft: 850,
      img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Modern City Loft",
      location: "Brooklyn, New York",
      price: "$310",
      beds: 1,
      baths: 1,
      sqft: 728,
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Dynamic Salutation Heading Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Good Morning, John
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage your upcoming stays and favorite destinations.
        </p>
      </div>

      {/* Grid Dashboard Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyticsData.map((card, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs relative flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <card.icon className={`size-4 ${card.color}`} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                {card.value}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Section Layout Table Component [cite: 40] */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-900 tracking-wide">
            My Bookings
          </h2>
          <Link
            href="/dashboard/bookings"
            className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
            View History <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-4">Property Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
              {recentBookings.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{row.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">
                    {row.amount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        row.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : row.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                      }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Favorites Preview Matrix Container Grid [cite: 41, 61] */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold text-gray-900 tracking-wide">
            Favorites
          </h2>
          <Link
            href="/dashboard/favorites"
            className="text-xs text-primary font-bold flex items-center gap-1 hover:underline">
            Manage All <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoritesPreview.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs group">
              <div className="h-44 relative bg-gray-100 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  width={300}
                  height={300}
                />
                <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full text-red-500 border border-gray-100 shadow-xs cursor-pointer">
                  <Heart className="size-3.5 fill-current" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium">
                      {item.location}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {item.price}
                    <span className="text-[10px] text-gray-400 font-normal">
                      /night
                    </span>
                  </span>
                </div>
                <div className="flex gap-3 text-[10px] text-gray-400 font-bold border-t border-gray-50 pt-2">
                  <span>🛏️ {item.beds} Beds</span>
                  <span>🛁 {item.baths} Baths</span>
                  <span>📐 {item.sqft} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
