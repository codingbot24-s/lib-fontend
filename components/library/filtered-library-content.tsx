"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ResponsiveLibrarySidebar from "./responsive-library-sidebar"
import ResponsiveBookCard from "./responsive-book-card"
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { Book } from "@/types/book"
import { ApiResponse } from "@/types/book"
// Mock data for books (same as before but with topic filtering)
const mockBooks = [
  {
    id: 1,
    title: "The Sealed Nectar",
    arabicTitle: "الرحيق المختوم",
    author: "Safiur-Rahman Al-Mubarakpuri",
    language: "English",
    topic: "Seerah",
    edition: "2nd Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 1,
    pages: 624,
    publishYear: 2002,
    rating: 4.8,
    description: "A complete authoritative book on the life of Prophet Muhammad (Peace Be Upon Him).",
  },
  {
    id: 2,
    title: "Riyadh as-Saliheen",
    arabicTitle: "رياض الصالحين",
    author: "Imam An-Nawawi",
    language: "Arabic",
    topic: "Hadith",
    edition: "1st Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 3,
    pages: 1200,
    publishYear: 1999,
    rating: 4.9,
    description: "A collection of authentic hadith compiled by Imam An-Nawawi.",
  },
  {
    id: 3,
    title: "Ihya Ulum al-Din",
    arabicTitle: "إحياء علوم الدين",
    author: "Imam Al-Ghazali",
    language: "Arabic",
    topic: "Tasawwuf",
    edition: "3rd Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 4,
    pages: 2400,
    publishYear: 2001,
    rating: 4.7,
    description: "A comprehensive work on Islamic spirituality and religious sciences.",
  },
  {
    id: 4,
    title: "The Quran: English Translation",
    arabicTitle: "القرآن الكريم",
    author: "Abdullah Yusuf Ali",
    language: "English",
    topic: "Quran",
    edition: "Revised Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 1,
    pages: 1200,
    publishYear: 2005,
    rating: 4.9,
    description: "A widely respected English translation of the Holy Quran.",
  },
  {
    id: 5,
    title: "Tafsir Ibn Kathir",
    arabicTitle: "تفسير ابن كثير",
    author: "Ibn Kathir",
    language: "Arabic",
    topic: "Tafsir",
    edition: "Complete Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 10,
    pages: 4800,
    publishYear: 1998,
    rating: 4.8,
    description: "One of the most respected and comprehensive commentaries on the Quran.",
  },
  {
    id: 6,
    title: "Sahih al-Bukhari",
    arabicTitle: "صحيح البخاري",
    author: "Imam Bukhari",
    language: "Arabic",
    topic: "Hadith",
    edition: "Complete Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 9,
    pages: 3600,
    publishYear: 1997,
    rating: 4.9,
    description: "The most authentic collection of hadith in Islamic literature.",
  },
  {
    id: 7,
    title: "Al-Aqidah al-Tahawiyyah",
    arabicTitle: "العقيدة الطحاوية",
    author: "Imam At-Tahawi",
    language: "Arabic",
    topic: "Aqeedah",
    edition: "1st Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 1,
    pages: 180,
    publishYear: 2000,
    rating: 4.6,
    description: "A fundamental text on Islamic creed and belief.",
  },
  {
    id: 8,
    title: "Fiqh us-Sunnah",
    author: "Sayyid Sabiq",
    language: "English",
    topic: "Fiqh",
    edition: "2nd Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 5,
    pages: 2000,
    publishYear: 2003,
    rating: 4.7,
    description: "A comprehensive guide to Islamic jurisprudence based on Quran and Sunnah.",
  },
]

const BOOKS_PER_PAGE = 12

interface FilteredLibraryContentProps {
  topic: string
  topicName: string
}

export default function FilteredLibraryContent({ topic, topicName }: FilteredLibraryContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedScholars, setSelectedScholars] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [books, setBooks] = useState<Book[]>([])

  // Filter books by the selected topic and other filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // First filter by the main topic
      const topicMatch =
        book.topic.toLowerCase() === topicName.toLowerCase() ||
        book.topic.toLowerCase().replace(/\s+/g, "-") === topic

      if (!topicMatch) return false

      // Then apply other filters
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.scholar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.arabicTitle && book.arabicTitle.includes(searchQuery))

      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(book.language)
      const matchesScholar = selectedScholars.length === 0 || selectedScholars.includes(book.scholar)

      return matchesSearch && matchesLanguage && matchesScholar
    })
  }, [topic, topicName, searchQuery, selectedLanguages, selectedScholars, books])

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<ApiResponse>("http://localhost:8000/api/books")
        setBooks(response.data.books)
      } catch (error) {
        console.error("Error fetching books:", error)
        setBooks([])
      }
    }

    fetchBooks()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE)

  // Reset pagination when filters change
  const handleFiltersChange = () => {
    setCurrentPage(1)
  }

  const activeFiltersCount = selectedLanguages.length + selectedScholars.length

  const sidebarProps = {
    selectedLanguages,
    selectedTopics: [], // Don't show topic filter since we're already filtered by topic
    selectedScholars,
    onLanguagesChange: (languages: string[]) => {
      setSelectedLanguages(languages)
      handleFiltersChange()
    },
    onTopicsChange: () => {}, // No-op since topic is fixed
    onScholarsChange: (scholars: string[]) => {
      setSelectedScholars(scholars)
      handleFiltersChange()
    },
    onClearFilters: () => {
      setSelectedLanguages([])
      setSelectedScholars([])
      handleFiltersChange()
    },
    hideTopicFilter: true, // Hide topic filter since we're already filtered
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/library" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                  <ArrowLeft className="h-4 w-4" />
                  Library
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100 font-medium">{topicName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header Section */}
      <div className="space-y-6 mb-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 dark:text-emerald-100">
            {topicName} Books
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Explore our collection of {topicName.toLowerCase()} books and scholarly works
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={`Search ${topicName.toLowerCase()} books...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-base rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Results Summary and Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {filteredBooks.length.toLocaleString()}
              </span>{" "}
              {topicName.toLowerCase()} books found
            </p>

            {activeFiltersCount > 0 && (
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              >
                <Filter className="h-3 w-3 mr-1" />
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
              </Badge>
            )}
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-emerald-600" />
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="px-6 pb-6">
                  <ResponsiveLibrarySidebar {...sidebarProps} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-6">
            <ResponsiveLibrarySidebar {...sidebarProps} />
          </div>
        </div>

        {/* Books Grid */}
        <div className="flex-1 space-y-6">
          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {paginatedBooks.map((book) => (
              <ResponsiveBookCard
                key={book.id}
                book={{
                  ...book,
                  coverimage: book.coverimage || "/placeholder.svg",
                  scholar: book.scholar,
                  viewpdfurl: book.viewpdfurl,
                  download_url: book.download_url,
                }}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No {topicName.toLowerCase()} books found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-1 overflow-x-auto">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[40px] ${currentPage === pageNum ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
