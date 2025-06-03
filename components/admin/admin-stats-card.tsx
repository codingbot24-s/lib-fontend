import { BookOpen, Users, BookMarked, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AdminStatCards() {
  const stats = [
    {
      title: "Total Books",
      value: "1,284",
      change: "+12 this week",
      icon: BookOpen,
      trend: "up",
    },
    {
      title: "Total Topics",
      value: "24",
      change: "+2 this month",
      icon: BookMarked,
      trend: "up",
    },
    {
      title: "Total Users",
      value: "8,642",
      change: "+124 this month",
      icon: Users,
      trend: "up",
    },
    {
      title: "Recent Uploads",
      value: "32",
      change: "Last 7 days",
      icon: Clock,
      trend: "neutral",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="overflow-hidden border-emerald-100 dark:border-emerald-900/50">
          <div className="islamic-pattern-top h-1.5 w-full"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">{stat.value}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs flex items-center">
                {stat.trend === "up" && <span className="text-emerald-600 mr-1">↑</span>}
                {stat.trend === "down" && <span className="text-red-600 mr-1">↓</span>}
                <span
                  className={
                    stat.trend === "up" ? "text-emerald-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"
                  }
                >
                  {stat.change}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
