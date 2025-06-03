import type { Metadata } from "next"
import Link from "next/link"
import { Users, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminStatCards } from "@/components/admin/admin-stats-card"
import { AdminRecentBooksTable } from "@/components/admin/admin-recent-book-table"
import { AdminTopicGrid } from "@/components/admin/admin-topic-grid"
import { AdminQuickUploadModal } from "@/components/admin/admin-quick-uplaod-modal"

export const metadata: Metadata = {
  title: "Admin Dashboard | Bayt al-Kutub",
  description: "Admin dashboard for the Islamic Digital Library",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-50">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Bayt al-Kutub Islamic Library Administration</p>
        </div>
        <AdminQuickUploadModal />
      </div>

      {/* Stats Cards */}
      <AdminStatCards />

      {/* Main Content Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
          <TabsTrigger value="recent">Recent Books</TabsTrigger>
          <TabsTrigger value="topics">Books by Topic</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        {/* Recent Books Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recently Added Books</CardTitle>
                  <CardDescription>Manage and review recently added books</CardDescription>
                </div>
                <Link href="/admin/books">
                  <Button variant="outline" size="sm" className="text-emerald-700 dark:text-emerald-400">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <AdminRecentBooksTable />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Books by Topic Tab */}
        <TabsContent value="topics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Books by Topic</CardTitle>
              <CardDescription>Overview of books categorized by Islamic topics</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminTopicGrid />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions by administrators and users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {/* Activity Items */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-4 border-b last:border-0 border-dashed border-emerald-100 dark:border-emerald-900/50"
                  >
                    <Avatar className="h-9 w-9 border-2 border-emerald-100 dark:border-emerald-800">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36&text=U${i}`} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        U{i}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Admin User {i}</span>{" "}
                        {i % 2 === 0 ? "added a new book" : "updated book details"}{" "}
                        <span className="font-medium text-emerald-700 dark:text-emerald-400">
                          {i % 2 === 0 ? "Riyadh as-Saliheen" : "Bulugh al-Maram"}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i} hour{i !== 1 ? "s" : ""} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Stats */}
        <Card className="overflow-hidden border-emerald-200 dark:border-emerald-800">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">2,845</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">↑ 12% from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Books Read</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">12,456</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">↑ 8% from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">New Signups</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">342</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">↑ 24% from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">18:24</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">↑ 3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Scholars */}
        <Card className="border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle>Popular Scholars</CardTitle>
            <CardDescription>Most viewed scholars this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Imam an-Nawawi", books: 42, views: 1245 },
                { name: "Ibn Taymiyyah", books: 38, views: 982 },
                { name: "Ibn Kathir", books: 29, views: 876 },
                { name: "Ibn al-Qayyim", books: 35, views: 754 },
              ].map((scholar, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-emerald-100 dark:border-emerald-800">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${scholar.name.charAt(0)}`} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        {scholar.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{scholar.name}</p>
                      <p className="text-xs text-muted-foreground">{scholar.books} books</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/30">
                    {scholar.views.toLocaleString()} views
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
