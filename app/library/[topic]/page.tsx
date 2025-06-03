import { Suspense } from "react"
import { notFound } from "next/navigation"
import FilteredLibraryContent from "@/components/library/filtered-library-content"  
import type { Metadata } from "next"

const validTopics = [
  "tafsir",
  "hadith",
  "fiqh",
  "seerah",
  "aqeedah",
  "history",
  "quran",
  "tasawwuf",
  "arabic-language",
  "dua",
]

const topicDisplayNames: Record<string, string> = {
  tafsir: "Tafsir",
  hadith: "Hadith",
  fiqh: "Fiqh",
  seerah: "Seerah",
  aqeedah: "Aqeedah",
  history: "Islamic History",
  quran: "Quran",
  tasawwuf: "Tasawwuf",
  "arabic-language": "Arabic Language",
  dua: "Dua & Supplications",
}

interface LibraryTopicPageProps {
  params: {
    topic: string
  }
}

export async function generateMetadata({ params }: LibraryTopicPageProps): Promise<Metadata> {
  const topicName = topicDisplayNames[params.topic] || params.topic

  return {
    title: `${topicName} Books - Islamic Digital Library`,
    description: `Browse our collection of ${topicName} books and scholarly works`,
  }
}

export default function LibraryTopicPage({ params }: LibraryTopicPageProps) {
  if (!validTopics.includes(params.topic)) {
    notFound()
  }

  const topicName = topicDisplayNames[params.topic] || params.topic

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <Suspense fallback={<FilteredLibraryLoadingSkeleton topicName={topicName} />}>
        <FilteredLibraryContent topic={params.topic} topicName={topicName} />
      </Suspense>
    </div>
  )
}

function FilteredLibraryLoadingSkeleton({ topicName }: { topicName: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded max-w-2xl"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-80 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
