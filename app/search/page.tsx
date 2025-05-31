"use client"

import { useState } from "react"
import Header from "@/components/header"
import SearchBar from "@/components/search/search-bar"
import SearchFilters from "@/components/search/search-filters"
import MobileFilterDrawer from "@/components/search/mobile-filter-drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, User, Tag, Search } from "lucide-react"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ""

  // State for active filters
  const [activeFilters, setActiveFilters] = useState({
    scholars: [],
    topics: [],
    languages: [],
    timePeriod: "",
    categories: [],
  })

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-6">Search Results</h1>

          <div className="mb-8">
            <SearchBar />
          </div>

          {query ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing results for{" "}
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">"{query}"</span>
                </p>

                {/* Mobile filter button */}
                <div className="md:hidden">
                  <MobileFilterDrawer activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Filters sidebar - desktop only */}
                <div className="hidden md:block w-64 flex-shrink-0">
                  <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                    <SearchFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
                  </div>
                </div>

                {/* Search results */}
                <div className="flex-1">
                  <Tabs defaultValue="all" className="mb-6">
                    <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="books"
                        className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20"
                      >
                        <Book className="h-4 w-4 mr-2" />
                        Books
                      </TabsTrigger>
                      <TabsTrigger
                        value="scholars"
                        className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Scholars
                      </TabsTrigger>
                      <TabsTrigger
                        value="topics"
                        className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20"
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        Topics
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <Book className="h-16 w-16 mx-auto text-emerald-200 dark:text-emerald-800 mb-4" />
                        <h2 className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
                          Search results would appear here
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                          This is a demonstration of the search interface. In a real implementation, this page would
                          display the search results from the database.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto text-emerald-200 dark:text-emerald-800 mb-4" />
                  <h2 className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
                    Enter a search term
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Use the search bar above to find books, scholars, topics, and more in our Islamic library.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
