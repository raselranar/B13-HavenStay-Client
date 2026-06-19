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

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Dynamic Salutation Heading Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Good Morning, John
        </h1>
        <p className="text-gray-500 mt-0.5">
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
              <span className=" font-bold text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <card.icon className={`size-4 ${card.color}`} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                {card.value}
              </h3>
              <p className=" text-gray-400 font-medium mt-0.5">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
