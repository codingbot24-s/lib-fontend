import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, Flag } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface ReplyListProps {
  replies: {
    id: number
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
    createdAt: string
    likes: number
    isLiked: boolean
  }[]
}

export default function ReplyList({ replies }: ReplyListProps) {
  return (
    <div className="space-y-6">
      {replies.map((reply) => (
        <Card key={reply.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Author sidebar */}
              <div className="w-full md:w-48 flex md:flex-col items-center md:items-start gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center cursor-pointer">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-800">
                          {reply.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-2 text-center">
                        <div className="font-medium text-emerald-900 dark:text-emerald-100">{reply.author.name}</div>
                        <Badge className="mt-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                          {reply.author.badge}
                        </Badge>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-800">
                          {reply.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{reply.author.name}</h4>
                        <div className="flex items-center pt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Reputation: {reply.author.reputation}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Posts: {reply.author.posts}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Joined: {reply.author.joinDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              {/* Reply content */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{reply.createdAt}</div>

                <div
                  className="prose dark:prose-invert prose-emerald max-w-none prose-sm prose-headings:text-emerald-900 dark:prose-headings:text-emerald-100 prose-a:text-emerald-700 dark:prose-a:text-emerald-400"
                  dangerouslySetInnerHTML={{ __html: reply.content }}
                />

                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant={reply.isLiked ? "default" : "outline"}
                    size="sm"
                    className={
                      reply.isLiked
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                        : "text-emerald-700 dark:text-emerald-400"
                    }
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{reply.likes}</span>
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                      Quote
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
