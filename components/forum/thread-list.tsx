import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Eye, Pin } from "lucide-react"
import Link from "next/link"

interface ThreadListProps {
  threads: {
    id: number
    title: string
    preview: string
    author: {
      name: string
      avatar: string
      badge: string
    }
    category: string
    tags: string[]
    createdAt: string
    replies: number
    views: number
    isSticky?: boolean
  }[]
}

export default function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Card
          key={thread.id}
          className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
            thread.isSticky
              ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          }`}
        >
          <CardContent className="p-0">
            <Link href={`/forum/${thread.id}`} className="block p-4">
              <div className="flex items-start gap-4">
                <div className="hidden sm:block">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800">
                      {thread.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {thread.isSticky && <Pin className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />}
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 line-clamp-1">
                      {thread.title}
                    </h3>
                  </div>

                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 flex-wrap gap-x-2 gap-y-1">
                    <span>{thread.author.name}</span>
                    <span>•</span>
                    <span>{thread.createdAt}</span>
                    <span>•</span>
                    <Badge variant="outline" className="px-1.5 py-0 h-auto text-xs font-normal">
                      {thread.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">{thread.preview}</p>

                  <div className="flex items-center mt-3 flex-wrap gap-2">
                    {thread.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{thread.replies}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{thread.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
