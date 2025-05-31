import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Eye, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface ThreadViewProps {
  thread: {
    id: number
    title: string
    content: string
    author: {
      id: number
      name: string
      avatar: string
      badge: string
      joinDate: string
      posts: number
      reputation: number
    }
    category: string
    tags: string[]
    createdAt: string
    replies: number
    views: number
  }
}

export default function ThreadView({ thread }: ThreadViewProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{thread.title}</h1>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 flex-wrap gap-x-2 gap-y-1">
            <Badge variant="outline" className="px-2 py-0.5 h-auto text-xs font-normal">
              {thread.category}
            </Badge>
            <span>•</span>
            <span>{thread.createdAt}</span>
            <span>•</span>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{thread.replies}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{thread.views}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Author sidebar */}
          <div className="w-full md:w-48 flex md:flex-col items-center md:items-start gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center cursor-pointer">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={thread.author.avatar || "/placeholder.svg"} alt={thread.author.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xl">
                      {thread.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-2 text-center">
                    <div className="font-medium text-emerald-900 dark:text-emerald-100">{thread.author.name}</div>
                    <Badge className="mt-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                      {thread.author.badge}
                    </Badge>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={thread.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800">
                      {thread.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{thread.author.name}</h4>
                    <div className="flex items-center pt-1">
                      <Award className="h-4 w-4 text-gold mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Reputation: {thread.author.reputation}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-emerald-700 dark:text-emerald-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Posts: {thread.author.posts}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-emerald-700 dark:text-emerald-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Joined: {thread.author.joinDate}</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <div className="hidden md:block w-full space-y-3 mt-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Joined {thread.author.joinDate}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {thread.author.posts} posts
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {thread.author.reputation} reputation
              </div>
            </div>
          </div>

          {/* Thread content */}
          <div className="flex-1 min-w-0">
            <div
              className="prose dark:prose-invert prose-emerald max-w-none prose-headings:text-emerald-900 dark:prose-headings:text-emerald-100 prose-a:text-emerald-700 dark:prose-a:text-emerald-400"
              dangerouslySetInnerHTML={{ __html: thread.content }}
            />

            <div className="flex items-center mt-6 flex-wrap gap-2">
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

            <div className="flex justify-end mt-6">
              <Button variant="outline" size="sm" className="text-emerald-700 dark:text-emerald-400">
                Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
