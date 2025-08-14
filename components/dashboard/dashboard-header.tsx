import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Book, Clock, FileText, BookOpen } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    name: string
    email: string
    joinDate: string
    avatar: string
    readingStats: {
      booksRead: number
      pagesRead: number
      hoursRead: number
      currentlyReading: number
    }
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-emerald-200 dark:border-emerald-800">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{user.name}&apos;s Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Member since {user.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
              <Book className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Books Read</p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{user.readingStats.booksRead}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pages Read</p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{user.readingStats.pagesRead}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours Read</p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{user.readingStats.hoursRead}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Currently Reading</p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                {user.readingStats.currentlyReading}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
