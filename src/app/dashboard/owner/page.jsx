"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Cartogrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  Banknote,
  Building,
  CalendarCheck,
  Loader2,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function OwnerAnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardMetrics() {
      try {
        setLoading(true);
        // Backend filtering and JWT protection wrapper required in your Axios instance setup
        const response = await axios.get("/api/owner/analytics");
        setMetrics(response.data);
      } catch (err) {
        console.error("Failed fetching dashboard metrics:", err);
        setError(
          "Could not parse statistical values from the marketplace engine.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardMetrics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium text-sm">
          Parsing revenue metrics and listings records...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-white text-red-700 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
          Retry Request
        </button>
      </div>
    );
  }

  const cardConfig = [
    {
      title: "Total Earnings",
      value: `$${metrics?.totalEarnings?.toLocaleString() || "0"}`,
      subtext: "Sum of all successful rental windows",
      icon: Banknote,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Total Properties",
      value: metrics?.totalProperties || 0,
      subtext: "Properties created by your account",
      icon: Building,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      title: "Total Bookings",
      value: metrics?.totalBookings || 0,
      subtext: "Confirmed occupancy schedules",
      icon: CalendarCheck,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Header Layout */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Performance Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Track transaction pipelines, inventory states, and operational active
          occupancy data.
        </p>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardConfig.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between">
              <div className="space-y-3">
                <span className="text-sm font-semibold text-slate-400 tracking-wide block uppercase">
                  {card.title}
                </span>
                <span className="text-3xl font-bold text-slate-800 tracking-tight block">
                  {card.value}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  {card.subtext}
                </span>
              </div>
              <div className={`p-3.5 rounded-xl border ${card.color}`}>
                <Icon size={24} strokeWidth={2.2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Line Chart Section for Monthly Earnings */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" />
              Monthly Earnings Overview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rolling 12-month payment analytics pipeline data
            </p>
          </div>
          <span className="mt-2 sm:mt-0 px-3 py-1 bg-slate-50 rounded-lg text-xs font-semibold text-slate-500 border border-slate-100 self-start">
            Currency: USD ($)
          </span>
        </div>

        <div className="h-[340px] w-full pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={metrics?.monthlyEarnings || []}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                }}
                labelStyle={{
                  fontWeight: "600",
                  color: "#1e293b",
                  fontSize: "13px",
                }}
                itemStyle={{
                  color: "#4f46e5",
                  fontSize: "13px",
                  padding: "2px 0",
                }}
                formatter={(value) => [
                  `$${value.toLocaleString()}`,
                  "Earnings",
                ]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 7, strokeWidth: 0, fill: "#4f46e5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
