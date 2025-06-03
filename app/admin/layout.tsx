import type React from "react"
import type { Metadata } from "next"
import { AdminLayout } from "@/components/admin/admin-layout"

export const metadata: Metadata = {
  title: "Admin Dashboard | Bayt al-Kutub",
  description: "Admin dashboard for the Islamic Digital Library",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}

