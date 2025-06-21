"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, Users, Settings, BookMarked, GraduationCap, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface AdminSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const links = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/books", label: "Books", icon: BookOpen },
    { href: "/admin/topics", label: "Topics", icon: BookMarked },
    { href: "/admin/scholars", label: "Scholars", icon: GraduationCap },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-emerald-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-emerald-100 dark:border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
              <BookMarked className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-emerald-900 dark:text-white">Bayt al-Kutub</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400"></span>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="py-4 px-2">
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href || 
                (link.href !== "/admin" && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-50 text-emerald-900 dark:bg-gray-900 dark:text-white"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">v1.0.0</span>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
