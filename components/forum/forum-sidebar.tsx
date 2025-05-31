import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, TrendingUp, Tag, HelpCircle, BookOpen } from "lucide-react"
import Link from "next/link"

interface ForumSidebarProps {
  trendingDiscussions: {
    id: number
    title: string
    replies: number
  }[]
  popularTags: {
    id: number
    name: string
    count: number
  }[]
  featuredQuestion: {
    id: number
    title: string
    author: {
      name: string
      badge: string
      avatar: string
    }
  }
}

export default function ForumSidebar({ trendingDiscussions, popularTags, featuredQuestion }: ForumSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Trending Discussions */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-emerald-900 dark:text-emerald-100">
            <TrendingUp className="h-5 w-5 mr-2 text-emerald-700 dark:text-emerald-400" />
            Trending Discussions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {trendingDiscussions.map((discussion) => (
              <li key={discussion.id}>
                <Link
                  href={`/forum/${discussion.id}`}
                  className="block text-sm hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  <div className="font-medium text-gray-800 dark:text-gray-200">{discussion.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {discussion.replies} replies
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-emerald-900 dark:text-emerald-100">
            <Tag className="h-5 w-5 mr-2 text-emerald-700 dark:text-emerald-400" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
              >
                {tag.name}
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({tag.count})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ask a Scholar */}
      <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-emerald-900 dark:text-emerald-100">
            <HelpCircle className="h-5 w-5 mr-2 text-emerald-700 dark:text-emerald-400" />
            Ask a Scholar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={featuredQuestion.author.avatar || "/placeholder.svg"}
                alt={featuredQuestion.author.name}
              />
              <AvatarFallback className="bg-emerald-100 text-emerald-800">
                {featuredQuestion.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                {featuredQuestion.author.name}
              </div>
              <Badge className="mt-1 bg-gold-500/20 text-gold-700 dark:bg-gold-500/10 dark:text-gold-400 border-gold-500/30">
                {featuredQuestion.author.badge}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-emerald-800 dark:text-emerald-200">{featuredQuestion.title}</p>
          <Link
            href={`/forum/${featuredQuestion.id}`}
            className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center mt-2 hover:underline"
          >
            View Question
            <BookOpen className="h-3 w-3 ml-1" />
          </Link>
        </CardContent>
      </Card>

      {/* Forum Guidelines */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <h3 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">Forum Guidelines</h3>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Be respectful and kind to other members</li>
            <li>• Provide evidence for claims when possible</li>
            <li>• Stay on topic and avoid unnecessary debates</li>
            <li>• No spam or self-promotion</li>
          </ul>
          <Link
            href="/forum/guidelines"
            className="text-xs text-emerald-700 dark:text-emerald-400 mt-2 inline-block hover:underline"
          >
            Read Full Guidelines
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
