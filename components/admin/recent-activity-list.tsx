import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    user: {
      name: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AH",
    },
    action: "added a new book",
    target: "Fiqh of Worship",
    time: "2 minutes ago",
    type: "book",
  },
  {
    id: 2,
    user: {
      name: "Fatima Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FA",
    },
    action: "updated user profile",
    target: "Yusuf Khan",
    time: "45 minutes ago",
    type: "user",
  },
  {
    id: 3,
    user: {
      name: "Omar Farooq",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "OF",
    },
    action: "deleted a book",
    target: "Introduction to Hadith",
    time: "2 hours ago",
    type: "book",
  },
  {
    id: 4,
    user: {
      name: "Aisha Rahman",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AR",
    },
    action: "approved a new user",
    target: "Zaynab Malik",
    time: "5 hours ago",
    type: "user",
  },
  {
    id: 5,
    user: {
      name: "Bilal Mahmood",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "BM",
    },
    action: "updated system settings",
    target: "Email notifications",
    time: "Yesterday",
    type: "system",
  },
]

export default function RecentActivityList() {
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback className="bg-emerald-100 text-emerald-800">{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> <span>{activity.action}</span>{" "}
              <span
                className={cn(
                  "font-medium",
                  activity.type === "book" && "text-emerald-700",
                  activity.type === "user" && "text-blue-600",
                  activity.type === "system" && "text-amber-600",
                )}
              >
                {activity.target}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
