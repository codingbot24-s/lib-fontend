"use client"

import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Book, ApiResponse } from "@/types/book"
import LibrarySidebar from "./library-sidebar"
import LibraryBookCard from "./library-book-card"


const BOOKS_PER_PAGE = 12

export default function UnifiedLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedScholars, setSelectedScholars] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Single fetch for books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get<ApiResponse>('http://localhost:8000/api/books')
        setBooks(response.data.books)
      } catch (error) {
        console.error('Error fetching books:', error)
        setBooks([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Unified filter logic
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.scholar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.topic.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(book.language)
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(book.topic.name)
      const matchesScholar = selectedScholars.length === 0 || selectedScholars.includes(book.scholar)

      return matchesSearch && matchesLanguage && matchesTopic && matchesScholar
    })
  }, [searchQuery, selectedLanguages, selectedTopics, selectedScholars, books])

  // Pagination logic
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE)

  const activeFiltersCount = selectedLanguages.length + selectedTopics.length + selectedScholars.length

  const sidebarProps = {
    selectedLanguages,
    selectedTopics,
    selectedScholars,
    onLanguagesChange: (languages: string[]) => {
      setSelectedLanguages(languages)
      setCurrentPage(1)
    },
    onTopicsChange: (topics: string[]) => {
      setSelectedTopics(topics)
      setCurrentPage(1)
    },
    onScholarsChange: (scholars: string[]) => {
      setSelectedScholars(scholars)
      setCurrentPage(1)
    },
    onClearFilters: () => {
      setSelectedLanguages([])
      setSelectedTopics([])
      setSelectedScholars([])
      setCurrentPage(1)
    },
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Header Section - Same for both mobile and desktop */}
      <div className="space-y-6 mb-8">
        {/* Title and Search - renders on all devices */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 dark:text-emerald-100">
            Islamic Library
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Discover our comprehensive collection of Islamic books
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search by title, author, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 sm:py-6 text-base sm:text-lg rounded-full"
            />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <LibrarySidebar {...sidebarProps} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-6">
            <LibrarySidebar {...sidebarProps} />
          </div>
        </div>

        {/* Books Grid */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {paginatedBooks.map((book) => (
              <LibraryBookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          {/* ... existing pagination code ... */}
        </div>
      </div>
    </div>
  )
}