import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Admin Dashboard | Bayt al-Kutub Islamic Library",
  description: "Admin dashboard for managing the Islamic Digital Library",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-[#f8f7f2]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
