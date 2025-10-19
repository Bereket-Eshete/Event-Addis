"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Ticket,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  BarChart3,
  Menu,
  X,
  Bell,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Bookings", href: "/dashboard/bookings", icon: Ticket },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Profile", href: "/dashboard/profile", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full border-r bg-surface border-muted">
            <div className="flex items-center justify-between h-16 px-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-primary">
                  EventAddis
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} suppressHydrationWarning>
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>
            <nav className="px-4 mt-8 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-surface hover:text-accent"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r bg-surface border-muted">
          <div className="flex items-center h-16 px-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-primary">EventAddis</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 mt-8 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-surface hover:text-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 border-b bg-surface border-muted sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 transition-colors rounded-lg lg:hidden hover:bg-surface"
            suppressHydrationWarning
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            <button className="relative p-2 transition-colors rounded-lg hover:bg-surface" suppressHydrationWarning>
              <Bell className="w-5 h-5 text-primary" />
              <span className="absolute w-3 h-3 bg-red-500 rounded-full -top-1 -right-1"></span>
            </button>
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <span className="text-sm font-medium text-white">B</span>
              </div>
              <span className="hidden font-medium text-primary sm:block">
                Bereket
              </span>
            </div>
            <button className="p-2 transition-colors rounded-lg hover:bg-surface" suppressHydrationWarning>
              <LogOut className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
