"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Grid3X3, List, BookOpen, Clock, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReadingProgressBar from "@/components/dashboard/reading-progress-bar"

interface Book {
  id: number
  title: string
  author: string
  coverUrl: string
  progress: number
  lastRead: string
  totalPages: number
  currentPage: number
}

interface BookmarksListProps {
  books: Book[]
}

export default function BookmarksList({ books }: BookmarksListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">My Bookmarked Books</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-md border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none rounded-l-md ${
                viewMode === "grid"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none rounded-r-md ${
                viewMode === "list"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Bookmark className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No bookmarks found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery
              ? `No books matching "${searchQuery}" found in your bookmarks.`
              : "You haven't bookmarked any books yet. Browse the library to find books to bookmark."}
          </p>
          <Button asChild className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white">
            <Link href="/books">Browse Library</Link>
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                    {book.progress}%
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-100 line-clamp-1">{book.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{book.author}</p>

                <ReadingProgressBar progress={book.progress} />

                <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>
                      {book.currentPage}/{book.totalPages}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{book.lastRead}</span>
                  </div>
                </div>

                <Button asChild className="w-full mt-3 bg-emerald-700 hover:bg-emerald-800 text-white">
                  <Link href={`/books/${book.id}`}>Continue Reading</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-24 h-36 flex-shrink-0">
                    <Image
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-bold text-emerald-900 dark:text-emerald-100">{book.title}</h3>
                      <Badge className="w-fit bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                        {book.progress}%
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{book.author}</p>

                    <div className="mt-2">
                      <ReadingProgressBar progress={book.progress} />
                    </div>

                    <div className="flex flex-wrap justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>
                          Page {book.currentPage} of {book.totalPages}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last read {book.lastRead}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white">
                        <Link href={`/books/${book.id}`}>Continue Reading</Link>
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
