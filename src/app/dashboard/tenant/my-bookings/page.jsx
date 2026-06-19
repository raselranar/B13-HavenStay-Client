import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MyBookingPage = () => {
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

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-xs p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          My Bookings
        </h2>
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
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
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
  );
};
export default MyBookingPage;
