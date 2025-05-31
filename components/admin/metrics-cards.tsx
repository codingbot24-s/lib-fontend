import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  color: string
  trend: "up" | "down" | "neutral"
}

export default function MetricsCards({ metrics }: { metrics: MetricCardProps[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={cn("h-4 w-4", metric.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <CardDescription className="flex items-center text-xs">
              {metric.trend === "up" && <span className="text-emerald-600 mr-1">↑</span>}
              {metric.trend === "down" && <span className="text-red-600 mr-1">↓</span>}
              {metric.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
