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
      <Suspense fallback={<LibraryLoadingSkeleton />}>
        <IslamicLibraryGrid />
      </Suspense>
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
        />
      ))}
    </div>
  )
}
