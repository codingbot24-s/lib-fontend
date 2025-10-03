"use client"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

import { use } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import ResponsiveBookCard from "@/components/library/responsive-book-card"
import { useState, useEffect } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { TopicBookFilters } from "@/components/library/topic-book-filters"
import { Book } from "@/types/book"
 
interface TopicPageProps {
  params: Promise<{
    id: string
  }>
}




export default function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = use(params)
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [activeFilters, setActiveFilters] = useState({
    scholars: [] as string[],
    languages: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTopicBooks = async () => {
      try {
        setIsLoading(true)
        
        const response = await axios.get(`${BACKEND_URL}/api/topics/${resolvedParams.id}/books`)
        setBooks(response.data.books)
        setFilteredBooks(response.data.books)
      } catch (err) {
        console.error("Failed to fetch books:", err)
        setError("Failed to load books")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopicBooks()
  }, [resolvedParams.id])

  useEffect(() => {
    let filtered = [...books]

    if (activeFilters.scholars.length > 0) {
      filtered = filtered.filter(book => activeFilters.scholars.includes(book.scholar))
    }

    if (activeFilters.languages.length > 0) {
      filtered = filtered.filter(book => activeFilters.languages.includes(book.language.toLowerCase()))
    }

    setFilteredBooks(filtered)
  }, [books, activeFilters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-black dark:to-black">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/library">Library</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Topic Books</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Filters sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <TopicBookFilters
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>

          {/* Books grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-500">{error}</p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <p className="text-lg text-muted-foreground text-center">
                  No books found matching your filters.
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  Try adjusting your filters or check back later for new additions.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                {filteredBooks.map((book) => (
                  console.log(book),
                  <ResponsiveBookCard 
                    key={book.id} 
                    book={book}
                    compact={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}