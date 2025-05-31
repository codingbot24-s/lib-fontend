import { cn } from "@/lib/utils"

interface ChartLegendItemProps {
  color: string
  name: string
  className?: string
}

export function ChartLegendItem({ color, name, className }: ChartLegendItemProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  )
}
