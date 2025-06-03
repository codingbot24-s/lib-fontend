"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-[#f8f7f2] dark:bg-gray-950">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 p-6 pt-0 overflow-auto">
          <main className="mx-auto max-w-7xl">
            {/* Islamic Pattern Divider */}
            <div className="h-3 w-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 mb-6 rounded-b-md opacity-80 shadow-sm"></div>

            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
