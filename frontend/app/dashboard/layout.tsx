"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  LogOut
} from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Ticket },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/dashboard/profile', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-muted">
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-primary">EventAddis</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-primary" />
              </button>
            </div>
            <nav className="mt-8 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'text-primary hover:bg-surface hover:text-accent'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-surface border-r border-muted">
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-primary">EventAddis</span>
            </Link>
          </div>
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-primary hover:bg-surface hover:text-accent'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-surface border-b border-muted px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
          >
            <Menu className="h-6 w-6 text-primary" />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <button className="p-2 rounded-lg hover:bg-surface transition-colors relative">
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">B</span>
              </div>
              <span className="text-primary font-medium hidden sm:block">Bereket</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-surface transition-colors">
              <LogOut className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}