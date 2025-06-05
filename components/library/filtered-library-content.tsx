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
import { ApiResponse } from "@/types/book"
import { TopicBooks } from "./topic-books"


// Update the Topic interface to match API response
interface Topic {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Update the Book interface to match API response
interface Book {
  id: number;
  title: string;
  arabictitle: string;
  scholar: string;
  topic_id: number;
  topic: Topic;
  language: string;
  publisher: string;
  edition: string;
  coverimage: string;
  viewpdfurl: string;
  download_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const BOOKS_PER_PAGE = 12

interface FilteredLibraryContentProps {
  topicId: string
}

export default function FilteredLibraryContent({ topicId }: FilteredLibraryContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedScholars, setSelectedScholars] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [books, setBooks] = useState<Book[]>([])

  // Modify the filter logic
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Don't filter by topic if we're showing all books
      const topicMatch = topicId === "all-books" ? true : 
        book.topic?.name.toLowerCase() === topicId.toLowerCase() || 
        book.topic?.name.toLowerCase().replace(/\s+/g, "-") === topicId;

      if (!topicMatch) return false;

      // Then apply other filters
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.scholar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.arabictitle && book.arabictitle.includes(searchQuery))

      const matchesLanguage = selectedLanguages.length === 0 || 
        selectedLanguages.includes(book.language);
      const matchesScholar = selectedScholars.length === 0 || 
        selectedScholars.includes(book.scholar);

      return matchesSearch && matchesLanguage && matchesScholar
    })
  }, [books, topicId, searchQuery, selectedLanguages, selectedScholars])

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<ApiResponse>("http://localhost:8000/api/books")
        console.log("Fetched books:", response.data.books)
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <TopicBooks topicId={topicId} />
        </div>
      </div>
    </div>
  )
}
