"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardShell({ children, role = null }) {
  const pathname = usePathname();

  const tenantMenuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", href: "/dashboard/my-bookings", icon: BookOpen },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const menuItems = tenantMenuItems;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#fcfdff] flex text-gray-900 font-sans">
        {/* Sidebar Trigger for small screens */}
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <SidebarTrigger />
        </div>

        <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
          <SidebarContent>
            <div className="p-4 flex flex-col gap-6 h-full">
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2">
                  <span className="text-xl font-bold text-primary tracking-tight">
                    HavenStay
                  </span>
                </div>
              </SidebarHeader>

              <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100/60">
                <div className="size-10 bg-primary text-white font-bold rounded-full flex items-center justify-center text-sm">
                  JD
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">John Doe</h4>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    Premium Member
                  </p>
                </div>
              </div>

              <nav className="flex-1">
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <Link href={item.href} legacyBehavior passHref>
                          <a className={`no-underline`}>
                            <SidebarMenuButton asChild isActive={isActive}>
                              <div
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide ${
                                  isActive
                                    ? "bg-primary text-white shadow-xs"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}>
                                <Icon className="size-4 shrink-0" />
                                <span>{item.name}</span>
                              </div>
                            </SidebarMenuButton>
                          </a>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </nav>

              <SidebarFooter>
                <div className="space-y-1 pt-4 border-t border-gray-100">
                  <Link
                    href="/help"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    <HelpCircle className="size-4" />
                    Help
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-left cursor-pointer">
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </SidebarFooter>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 w-full lg:overflow-y-auto p-6 lg:p-10 pt-20 lg:pt-10">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
