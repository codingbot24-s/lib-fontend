"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useClickAway } from "@/hooks/use-click-away"
import SearchResults from "@/components/search/search-results"
import { searchLibrary } from "@/lib/search-utils"
import { cn } from "@/lib/utils"

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  type SearchResultsShape = {
    books: Array<{ id: number; title: string; author: string; arabicTitle?: string; coverUrl?: string }>
    scholars: Array<{ id: number; name: string; arabicName?: string; era?: string; imageUrl?: string }>
    topics: Array<{ id: number; name: string; description?: string; count?: number }>
  } | null
  const [results, setResults] = useState<SearchResultsShape>(null)
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useClickAway(
    
    searchRef as React.RefObject<HTMLElement>,
    () => {
      setIsOpen(false)
    }
  )

  // Handle search query changes
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults(null)
      setIsOpen(false)
      return
    }

    const delayDebounceFn = setTimeout(() => {
      setLoading(true)
      // Simulate API call with our utility function
      searchLibrary(query)
        .then((data) => {
          setResults(data)
          setIsOpen(true)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Search error:", error)
          setLoading(false)
        })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If dropdown is not open, don't handle keyboard navigation
    if (!isOpen || !results) return

    // Count total items across all categories
    const totalItems = results.books.length + results.scholars.length + results.topics.length

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex < totalItems - 1 ? prevIndex + 1 : prevIndex))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelectResult(getItemAtIndex(selectedIndex))
        } else {
          handleSearch()
        }
        break
      case "Escape":
        e.preventDefault()
        setIsOpen(false)
        break
    }
  }

  // Get the item at the current selected index
  type SelectResult = { type: "book" | "scholar" | "topic"; item: { id: number } }
  const getItemAtIndex = (index: number): SelectResult | null => {
    if (!results) return null
    let currentIndex = 0

    // Check in books
    for (let i = 0; i < results.books.length; i++) {
      if (currentIndex === index) {
        return { type: "book", item: results.books[i] }
      }
      currentIndex++
    }

    // Check in scholars
    for (let i = 0; i < results.scholars.length; i++) {
      if (currentIndex === index) {
        return { type: "scholar", item: results.scholars[i] }
      }
      currentIndex++
    }

    // Check in topics
    for (let i = 0; i < results.topics.length; i++) {
      if (currentIndex === index) {
        return { type: "topic", item: results.topics[i] }
      }
      currentIndex++
    }

    return null
  }

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  // Handle selecting a result
  const handleSelectResult = (result: { type: "book" | "scholar" | "topic"; item: { id: number } } | null) => {
    if (!result) return

    let url = ""
    switch (result.type) {
      case "book":
        url = `/books/${result.item.id}`
        break
      case "scholar":
        url = `/scholars/${result.item.id}`
        break
      case "topic":
        url = `/topics/${result.item.id}`
        break
    }

    if (url) {
      router.push(url)
      setQuery("")
      setIsOpen(false)
    }
  }

  // Clear search input
  const clearSearch = () => {
    setQuery("")
    setResults(null)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search
            className={cn(
              "h-5 w-5 transition-colors duration-200",
              loading ? "text-emerald-500 animate-pulse" : "text-gray-400 dark:text-gray-500",
            )}
          />
        </div>

        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search books, scholars, topics..."
          className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-base"
          aria-label="Search the library"
        />

        {query && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-8 w-8 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top-2">
          <SearchResults results={results} query={query} selectedIndex={selectedIndex} onSelect={handleSelectResult} />

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={handleSearch}
              variant="ghost"
              className="w-full justify-between text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              <span>See all results for &quot;{query}&quot;</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
