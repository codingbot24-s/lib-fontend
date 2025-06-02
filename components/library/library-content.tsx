"use client"

import { useState, useMemo } from "react"
import LibraryHeader from "./library-header"
import LibrarySidebar from "./library-sidebar"
import LibraryBookCard from "./library-book-card"
import LibraryBookListItem from "./library-book-list-item"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
]

const BOOKS_PER_PAGE = 12

export default function LibraryContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedScholars, setSelectedScholars] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

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

  return (
    <div className="space-y-8">
      {/* <LibraryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalBooks={filteredBooks.length}
        activeFilters={activeFiltersCount}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      /> */}

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <LibrarySidebar
            selectedLanguages={selectedLanguages}
            selectedTopics={selectedTopics}
            selectedScholars={selectedScholars}
            onLanguagesChange={(languages) => {
              setSelectedLanguages(languages)
              handleFiltersChange()
            }}
            onTopicsChange={(topics) => {
              setSelectedTopics(topics)
              handleFiltersChange()
            }}
            onScholarsChange={(scholars) => {
              setSelectedScholars(scholars)
              handleFiltersChange()
            }}
            onClearFilters={() => {
              setSelectedLanguages([])
              setSelectedTopics([])
              setSelectedScholars([])
              handleFiltersChange()
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Books Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedBooks.map((book) => (
                <LibraryBookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedBooks.map((book) => (
                <LibraryBookListItem key={book.id} book={book} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
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
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-1">
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
                      className={currentPage === pageNum ? "bg-emerald-600 hover:bg-emerald-700" : ""}
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
                className="flex items-center gap-2"
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
