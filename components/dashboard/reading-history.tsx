"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, History, Clock, BookOpen, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ReadingSession {
  id: number
  bookId: number
  title: string
  author: string
  coverUrl: string
  lastRead: string
  duration: string
  pagesRead: number
  currentPage: number
}

interface ReadingHistoryProps {
  history: ReadingSession[]
}

export default function ReadingHistory({ history }: ReadingHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week" | "month">("all")

  // Filter history based on search query and time filter
  const filteredHistory = history.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.author.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesTimeFilter = true
    if (timeFilter === "today") {
      matchesTimeFilter = session.lastRead.includes("Today")
    } else if (timeFilter === "week") {
      matchesTimeFilter =
        session.lastRead.includes("Today") ||
        session.lastRead.includes("Yesterday") ||
        session.lastRead.includes("days ago") ||
        session.lastRead.includes("Last week")
    } else if (timeFilter === "month") {
      matchesTimeFilter = !session.lastRead.includes("Last month") || session.lastRead.includes("months ago")
    }

    return matchesSearch && matchesTimeFilter
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">Reading History</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-md border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none rounded-l-md ${
                timeFilter === "all"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setTimeFilter("all")}
            >
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${
                timeFilter === "today"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setTimeFilter("today")}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${
                timeFilter === "week"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setTimeFilter("week")}
            >
              Week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none rounded-r-md ${
                timeFilter === "month"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setTimeFilter("month")}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <History className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No reading history found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery
              ? `No reading sessions matching "${searchQuery}" found.`
              : "You haven't read any books yet. Start reading to track your progress."}
          </p>
          <Button asChild className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white">
            <Link href="/books">Browse Library</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((session) => (
            <Card
              key={session.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-16 h-24 flex-shrink-0">
                    <Image
                      src={session.coverUrl || "/placeholder.svg"}
                      alt={session.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-bold text-emerald-900 dark:text-emerald-100">{session.title}</h3>
                      <Badge className="w-fit bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                        {session.pagesRead} pages read
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{session.author}</p>

                    <div className="flex flex-wrap justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{session.lastRead}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{session.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>Page {session.currentPage}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white">
                        <Link href={`/books/${session.bookId}`}>Continue Reading</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
