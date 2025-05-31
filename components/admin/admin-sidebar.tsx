"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, BookOpen, Home, Settings, Users, BookMarked } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <Sidebar className="border-r border-[border]">
      <SidebarHeader className="py-4">
        <div className="flex items-center px-4">
          <BookMarked className="h-6 w-6 text-emerald-700" />
          <span className="ml-2 text-lg font-semibold text-emerald-800">Bayt al-Kutub</span>
          <span className="ml-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Admin</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin")}>
              <Link href="/admin">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/books")}>
              <Link href="/admin/books">
                <BookOpen className="h-5 w-5" />
                <span>Books Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
              <Link href="/admin/users">
                <Users className="h-5 w-5" />
                <span>Users Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/analytics")}>
              <Link href="/admin/analytics">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
              <Link href="/admin/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="px-4 py-2">
          <div className="text-xs text-muted-foreground">Bayt al-Kutub Admin v1.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
