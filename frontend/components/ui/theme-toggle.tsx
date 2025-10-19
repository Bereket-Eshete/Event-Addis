"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"



export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 p-0 flex items-center justify-center hover:bg-surface rounded-lg transition-colors relative cursor-pointer">
        <Sun className="h-4 w-4 text-primary" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 p-0 flex items-center justify-center hover:bg-surface rounded-lg transition-colors relative cursor-pointer"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-primary transition-all" />
      ) : (
        <Sun className="h-4 w-4 text-primary transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}