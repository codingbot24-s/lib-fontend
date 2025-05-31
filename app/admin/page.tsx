import type { Metadata } from "next"
import { BookOpen, Users, UserCheck, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MetricsCards from "@/components/admin/metrics-cards"
import RecentActivityList from "@/components/admin/recent-activity-list"
import PopularBooksTable from "@/components/admin/popular-books-table"

export const metadata: Metadata = {
  title: "Admin Dashboard | Bayt al-Kutub",
  description: "Admin dashboard for the Islamic Digital Library",
}

export default function AdminDashboardPage() {
  // Mock data for metrics
  const metrics = [
    {
      title: "Total Books",
      value: "1,284",
      description: "+12 this week",
      icon: BookOpen,
      color: "text-emerald-700",
      trend: "up",
    },
    {
      title: "Total Users",
      value: "8,642",
      description: "+124 this month",
      icon: Users,
      color: "text-amber-600",
      trend: "up",
    },
    {
      title: "Active Users",
      value: "2,845",
      description: "32% of total users",
      icon: UserCheck,
      color: "text-blue-600",
      trend: "up",
    },
    {
      title: "Recent Activity",
      value: "342",
      description: "Actions in last 24h",
      icon: Clock,
      color: "text-purple-600",
      trend: "down",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Islamic Digital Library</p>
      </div>

      <MetricsCards metrics={metrics} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from users and admins</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
            <CardDescription>Most viewed books this week</CardDescription>
          </CardHeader>
          <CardContent>
            <PopularBooksTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
