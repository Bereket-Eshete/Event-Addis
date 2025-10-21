'use client'

import { Bell, User, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function UserHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-surface border-b border-muted px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-primary">EventAddis</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button type="button" className="p-2 rounded-lg hover:bg-surface transition-colors relative">
          <Bell className="h-5 w-5 text-primary" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        <ThemeToggle />
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
          </div>
          <span className="text-primary font-medium hidden sm:block">
            {user?.fullName || 'User'}
          </span>
        </div>
        <button 
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-surface transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5 text-primary" />
        </button>
      </div>
    </header>
  )
}