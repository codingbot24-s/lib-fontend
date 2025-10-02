"use client"

import { TopicBooks } from "./topic-books"

interface FilteredLibraryContentProps {
  topicId: string
}

export default function FilteredLibraryContent({ topicId }: FilteredLibraryContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <TopicBooks topicId={topicId} />
        </div>
      </div>
    </div>
  )
}
