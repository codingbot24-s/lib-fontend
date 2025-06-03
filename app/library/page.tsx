import { Suspense } from "react"
import IslamicLibraryGrid from "@/components/library/islamic-library-grid"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Library - Islamic Digital Library",
  description: "Explore our comprehensive collection of Islamic knowledge organized by traditional categories",
}

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="islamic-pattern"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-emerald-900 dark:text-emerald-100 tracking-wide">
                Bayt al-Kutub
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-gray-700 dark:text-gray-300">
                Islamic Digital Library
              </h2>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 mx-auto rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-serif">
              Discover the treasures of Islamic knowledge through our carefully curated collection of classical and
              contemporary works
            </p>
          </div>

          <Suspense fallback={<LibraryLoadingSkeleton />}>
            <IslamicLibraryGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function LibraryLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg animate-pulse"
        >
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-500 rounded-full mx-auto"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-500 rounded mx-auto w-32"></div>
            </div>
            <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded mx-auto w-20"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
