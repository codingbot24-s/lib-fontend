"use client"

import { Book, User, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import HighlightedText from "@/components/search/highlighted-text"

interface SearchResultsProps {
  results: {
    books: any[]
    scholars: any[]
    topics: any[]
  }
  query: string
  selectedIndex: number
  onSelect: (result: any) => void
}

export default function SearchResults({ results, query, selectedIndex, onSelect }: SearchResultsProps) {
  // Track the current index for keyboard navigation
  let currentIndex = 0

  // Check if we have any results
  const hasResults = results.books.length > 0 || results.scholars.length > 0 || results.topics.length > 0

  if (!hasResults) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">No results found for &quot;{query}&quot;</div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      {/* Books Section */}
      {results.books.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
              <Book className="h-4 w-4 mr-2" />
              Books
            </h3>
          </div>
          <ul>
            {results.books.map((book, index) => {
              const isSelected = currentIndex === selectedIndex
              const itemIndex = currentIndex++

              return (
                <li key={book.id}>
                  <button
                    className={cn(
                      "w-full text-left px-4 py-3 flex items-start hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors",
                      isSelected && "bg-emerald-50 dark:bg-emerald-900/20",
                    )}
                    onClick={() => onSelect({ type: "book", item: book })}
                    onMouseEnter={() => {
                      /* Could update selectedIndex here */
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-14 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden mr-3 border border-gray-200 dark:border-gray-700">
                      {book.coverUrl ? (
                        <img
                          src={book.coverUrl || "/placeholder.svg"}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Book className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        <HighlightedText text={book.title} highlight={query} />
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <HighlightedText text={book.author} highlight={query} />
                      </div>
                      {book.arabicTitle && <div className="text-sm text-gold font-arabic mt-1">{book.arabicTitle}</div>}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Scholars Section */}
      {results.scholars.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Scholars
            </h3>
          </div>
          <ul>
            {results.scholars.map((scholar, index) => {
              const isSelected = currentIndex === selectedIndex
              const itemIndex = currentIndex++

              return (
                <li key={scholar.id}>
                  <button
                    className={cn(
                      "w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors",
                      isSelected && "bg-emerald-50 dark:bg-emerald-900/20",
                    )}
                    onClick={() => onSelect({ type: "scholar", item: scholar })}
                    onMouseEnter={() => {
                      /* Could update selectedIndex here */
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mr-3 border border-gray-200 dark:border-gray-700">
                      {scholar.imageUrl ? (
                        <img
                          src={scholar.imageUrl || "/placeholder.svg"}
                          alt={scholar.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        <HighlightedText text={scholar.name} highlight={query} />
                      </div>
                      {scholar.arabicName && <div className="text-sm text-gold font-arabic">{scholar.arabicName}</div>}
                      {scholar.era && <div className="text-sm text-gray-500 dark:text-gray-400">{scholar.era}</div>}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Topics Section */}
      {results.topics.length > 0 && (
        <div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Topics
            </h3>
          </div>
          <ul>
            {results.topics.map((topic, index) => {
              const isSelected = currentIndex === selectedIndex
              const itemIndex = currentIndex++

              return (
                <li key={topic.id}>
                  <button
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors",
                      isSelected && "bg-emerald-50 dark:bg-emerald-900/20",
                    )}
                    onClick={() => onSelect({ type: "topic", item: topic })}
                    onMouseEnter={() => {
                      /* Could update selectedIndex here */
                    }}
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      <HighlightedText text={topic.name} highlight={query} />
                    </div>
                    {topic.description && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        <HighlightedText text={topic.description} highlight={query} />
                      </div>
                    )}
                    {topic.count && (
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{topic.count} resources</div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
