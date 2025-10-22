"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Search, 
  Ticket, 
  CreditCard, 
  MessageSquare, 
  User,
  Menu,
  X,
  Calendar,
  Heart,
  Bell
} from 'lucide-react'
import UserHeader from '@/components/layout/UserHeader'

const navigation = [
  { name: 'Dashboard', href: '/user', icon: Home },
  { name: 'Browse Events', href: '/user/browse', icon: Search },
  { name: 'My Tickets', href: '/user/tickets', icon: Ticket },
  { name: 'Favorites', href: '/user/favorites', icon: Heart },
  { name: 'Payments', href: '/user/payments', icon: CreditCard },
  { name: 'Notifications', href: '/user/notifications', icon: Bell },
  { name: 'Profile', href: '/user/profile', icon: User },
]

export default function UserDashboardLayout({
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
        <UserHeader />
        
        {/* Mobile menu button */}
        <div className="lg:hidden px-4 py-2 border-b border-muted">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
          >
            <Menu className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}