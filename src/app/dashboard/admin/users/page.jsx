"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ArrowUpDown,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { serverMutate } from "@/lib/core/server";
import { toast } from "sonner";

export default function AllUsersPage({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = async (user, newRole) => {
    const userId = user.userId || user._id;

    try {
      // Backend implementation hook via your standard mutation payload structure
      await serverMutate(`/api/admin/users/${userId}/role`, "PATCH", {
        role: newRole,
      });

      setUsers((prev) =>
        prev.map((u) =>
          (u.userId || u._id) === userId ? { ...u, role: newRole } : u,
        ),
      );

      toast.success(`User role successfully updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to execute user role change mutation.");
    }
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-600" />;
      case "owner":
        return <ShieldCheck className="h-4 w-4 text-blue-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          All Registered Users
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage system accessibility parameters, authorize platform role
          modifications, and track account permissions.
        </p>
      </div>

      <hr className="border-gray-200" />

      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">User Identity</th>
              <th className="px-6 py-4 font-semibold">Email Reference</th>
              <th className="px-6 py-4 font-semibold">Current Role</th>
              <th className="px-6 py-4 font-semibold text-right">
                Modify Permission Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user) => {
              const userId = user.userId || user._id;
              const currentRole = user.role || "Tenant";

              return (
                <tr key={userId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      {user.photo ? (
                        <img
                          src={user.photo}
                          alt=""
                          className="h-9 w-9 rounded-full object-cover border border-gray-200 bg-gray-50"
                          onError={(e) => {
                            e.target.src = ""; // Fallback gracefully if direct image links break
                            e.target.className = "hidden";
                          }}
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                      <div className="font-bold text-gray-900">
                        {user.name || "Anonymous User"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${currentRole.toLowerCase() === "admin" ? "bg-red-50 text-red-700" : ""}
                      ${currentRole.toLowerCase() === "owner" ? "bg-blue-50 text-blue-700" : ""}
                      ${currentRole.toLowerCase() === "tenant" ? "bg-gray-100 text-gray-700" : ""}
                    `}>
                      {getRoleIcon(currentRole)}
                      {currentRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="w-40 ml-auto">
                      <Select
                        defaultValue={currentRole}
                        onValueChange={(value) =>
                          handleRoleChange(user, value)
                        }>
                        <SelectTrigger className="h-8 w-full text-xs">
                          <SelectValue placeholder="Change Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tenant">Tenant</SelectItem>
                          <SelectItem value="Owner">Owner</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                </tr>
              );
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  No registered system profiles located.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
