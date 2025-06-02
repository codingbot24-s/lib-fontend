"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import ResponsiveLibrarySidebar from "./responsive-library-sidebar"
import ResponsiveBookCard from "./responsive-book-card"
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for books
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
    title: "Purification of the Heart",
    author: "Hamza Yusuf",
    language: "English",
    topic: "Tasawwuf",
    edition: "1st Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 1,
    pages: 256,
    publishYear: 2012,
    rating: 4.6,
    description: "Signs, symptoms and cures of the spiritual diseases of the heart.",
  },
  {
    id: 6,
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
    id: 7,
    title: "The Divine Reality",
    author: "Hamza Andreas Tzortzis",
    language: "English",
    topic: "Aqeedah",
    edition: "1st Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 1,
    pages: 320,
    publishYear: 2016,
    rating: 4.5,
    description: "God, Islam and the mirage of atheism - a compelling case for Islamic theism.",
  },
  {
    id: 8,
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
    id: 9,
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
  {
    id: 10,
    title: "The History of Islam",
    author: "Akbar Shah Najeebabadi",
    language: "English",
    topic: "History",
    edition: "1st Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 3,
    pages: 1800,
    publishYear: 2000,
    rating: 4.4,
    description: "A detailed account of Islamic history from the time of Prophet Muhammad.",
  },
  {
    id: 11,
    title: "Al-Bidaya wa'l-Nihaya",
    arabicTitle: "البداية والنهاية",
    author: "Ibn Kathir",
    language: "Arabic",
    topic: "History",
    edition: "Complete Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 14,
    pages: 7000,
    publishYear: 1995,
    rating: 4.8,
    description: "A comprehensive work on Islamic history from creation to the end times.",
  },
  {
    id: 12,
    title: "Fortress of the Muslim",
    arabicTitle: "حصن المسلم",
    author: "Sa'id ibn Wahf al-Qahtani",
    language: "English",
    topic: "Dua",
    edition: "3rd Edition",
    coverUrl: "/placeholder.svg?height=400&width=300",
    volumes: 1,
    pages: 200,
    publishYear: 2010,
    rating: 4.6,
    description: "A collection of authentic supplications from the Quran and Sunnah.",
  },
]

const BOOKS_PER_PAGE = 12

export default function ResponsiveLibraryContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedScholars, setSelectedScholars] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Filter and search logic
  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.arabicTitle && book.arabicTitle.includes(searchQuery))

      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(book.language)
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(book.topic)
      const matchesScholar = selectedScholars.length === 0 || selectedScholars.includes(book.author)

      return matchesSearch && matchesLanguage && matchesTopic && matchesScholar
    })
  }, [searchQuery, selectedLanguages, selectedTopics, selectedScholars])

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE)

  // Reset pagination when filters change
  const handleFiltersChange = () => {
    setCurrentPage(1)
  }

  const activeFiltersCount = selectedLanguages.length + selectedTopics.length + selectedScholars.length

  const sidebarProps = {
    selectedLanguages,
    selectedTopics,
    selectedScholars,
    onLanguagesChange: (languages: string[]) => {
      setSelectedLanguages(languages)
      handleFiltersChange()
    },
    onTopicsChange: (topics: string[]) => {
      setSelectedTopics(topics)
      handleFiltersChange()
    },
    onScholarsChange: (scholars: string[]) => {
      setSelectedScholars(scholars)
      handleFiltersChange()
    },
    onClearFilters: () => {
      setSelectedLanguages([])
      setSelectedTopics([])
      setSelectedScholars([])
      handleFiltersChange()
    },
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Header Section */}
      <div className="space-y-6 mb-8">
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 dark:text-emerald-100">
            Islamic Library
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Discover our comprehensive collection of Islamic books, scholarly works, and classical texts
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search by title, author, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 sm:py-6 text-base sm:text-lg rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
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
              books found
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
              <ResponsiveBookCard key={book.id} book={book} />
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No books found</h3>
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
