import { Suspense } from "react"
import { Metadata } from "next"
import FilteredLibraryContent from "@/components/library/filtered-library-content"

export const metadata: Metadata = {
  title: "All Books - Islamic Digital Library",
  description: "Browse our complete collection of Islamic books across all categories"
}

export default function AllBooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        <FilteredLibraryContent topicId="all-books" />
      </Suspense>
    </div>
  )
}