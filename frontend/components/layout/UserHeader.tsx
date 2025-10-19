'use client'

import { Bell, User, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function UserHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-surface border-b border-muted px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-primary">EventAddis</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-surface transition-colors relative">
          <Bell className="h-5 w-5 text-primary" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        <ThemeToggle />
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">M</span>
          </div>
          <span className="text-primary font-medium hidden sm:block">Meron</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-surface transition-colors">
          <LogOut className="h-5 w-5 text-primary" />
        </button>
      </div>
    </header>
  )
}