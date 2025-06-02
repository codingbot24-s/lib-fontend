"use client"

import { Search, Filter, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface LibraryHeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  totalBooks?: number
  activeFilters?: number
  viewMode?: "grid" | "list"
  onViewModeChange?: (mode: "grid" | "list") => void
}

export default function LibraryHeader({
  searchQuery = "",
  onSearchChange,
  totalBooks = 1247,
  activeFilters = 0,
  viewMode = "grid",
  onViewModeChange,
}: LibraryHeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const handleSearchChange = (value: string) => {
    setLocalSearch(value)
    onSearchChange?.(value)
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-emerald-900 dark:text-emerald-100">Islamic Library</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Results Summary and View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{totalBooks.toLocaleString()}</span>{" "}
            books found
          </p>

          {activeFilters > 0 && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              <Filter className="h-3 w-3 mr-1" />
              {activeFilters} filter{activeFilters !== 1 ? "s" : ""} active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">View:</span>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange?.("grid")}
              className={`rounded-none ${
                viewMode === "grid"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange?.("list")}
              className={`rounded-none ${
                viewMode === "list"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
