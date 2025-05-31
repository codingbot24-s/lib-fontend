import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"

export const metadata: Metadata = {
  title: "Analytics | Admin Dashboard",
  description: "Analytics for the Islamic Digital Library",
}

// Mock data for analytics
const popularBooksData = [
  { name: "Riyadh as-Saliheen", views: 1245 },
  { name: "The Sealed Nectar", views: 982 },
  { name: "Fiqh of Worship", views: 876 },
  { name: "The Quran: English Translation", views: 754 },
  { name: "Purification of the Heart", views: 621 },
  { name: "The Creed of Imam al-Tahawi", views: 543 },
  { name: "Bulugh al-Maram", views: 487 },
]

const userSignupData = [
  { name: "Jan", users: 65 },
  { name: "Feb", users: 78 },
  { name: "Mar", users: 92 },
  { name: "Apr", users: 105 },
  { name: "May", users: 120 },
  { name: "Jun", users: 145 },
  { name: "Jul", users: 168 },
  { name: "Aug", users: 189 },
  { name: "Sep", users: 210 },
  { name: "Oct", users: 232 },
  { name: "Nov", users: 245 },
  { name: "Dec", users: 267 },
]

const searchKeywordsData = [
  { name: "Quran", value: 400 },
  { name: "Hadith", value: 300 },
  { name: "Fiqh", value: 250 },
  { name: "Seerah", value: 200 },
  { name: "Tafsir", value: 150 },
]

const COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444"]

const categoryDistributionData = [
  { name: "Quran", books: 120 },
  { name: "Hadith", books: 95 },
  { name: "Fiqh", books: 85 },
  { name: "Seerah", books: 70 },
  { name: "Aqeedah", books: 65 },
  { name: "Spirituality", books: 55 },
  { name: "History", books: 45 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-emerald-900">Analytics</h1>
        <p className="text-muted-foreground">Insights and statistics for the Islamic Digital Library</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Read Books</CardTitle>
                <CardDescription>Top books by view count</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Chart className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={popularBooksData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 100,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltip>
                                  <ChartTooltipContent>
                                    <div className="font-medium">{payload[0].payload.name}</div>
                                    <div className="text-sm text-muted-foreground">{payload[0].value} views</div>
                                  </ChartTooltipContent>
                                </ChartTooltip>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="views" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Signups</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userSignupData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltip>
                                  <ChartTooltipContent>
                                    <div className="font-medium">{label}</div>
                                    <div className="text-sm text-muted-foreground">{payload[0].value} new users</div>
                                  </ChartTooltipContent>
                                </ChartTooltip>
                              )
                            }
                            return null
                          }}
                        />
                        <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Search Keywords</CardTitle>
                <CardDescription>Most popular search terms</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={searchKeywordsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {searchKeywordsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltip>
                                  <ChartTooltipContent>
                                    <div className="font-medium">{payload[0].name}</div>
                                    <div className="text-sm text-muted-foreground">{payload[0].value} searches</div>
                                  </ChartTooltipContent>
                                </ChartTooltip>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <ChartLegend className="mt-4 justify-center">
                    {searchKeywordsData.map((item, index) => (
                      <ChartLegendItem key={item.name} color={COLORS[index % COLORS.length]} name={item.name} />
                    ))}
                  </ChartLegend>
                </Chart>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Book Categories</CardTitle>
                <CardDescription>Distribution of books by category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Chart className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryDistributionData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltip>
                                  <ChartTooltipContent>
                                    <div className="font-medium">{label}</div>
                                    <div className="text-sm text-muted-foreground">{payload[0].value} books</div>
                                  </ChartTooltipContent>
                                </ChartTooltip>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="books" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Analytics</CardTitle>
              <CardDescription>Detailed analytics for books will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Book analytics content will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed analytics for users will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                User analytics content will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Analytics</CardTitle>
              <CardDescription>Detailed analytics for search will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Search analytics content will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
