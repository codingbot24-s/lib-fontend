import { Badge } from "@/components/ui/badge"

interface UserBadgeProps {
  type: string
}

export default function UserBadge({ type }: UserBadgeProps) {
  let badgeClass = ""

  switch (type.toLowerCase()) {
    case "admin":
      badgeClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      break
    case "moderator":
      badgeClass = "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      break
    case "scholar":
      badgeClass = "bg-gold-100 text-gold-800 dark:bg-gold-900/30 dark:text-gold-300"
      break
    case "contributor":
      badgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      break
    case "new member":
      badgeClass = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      break
    default:
      badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
      break
  }

  return <Badge className={badgeClass}>{type}</Badge>
}
