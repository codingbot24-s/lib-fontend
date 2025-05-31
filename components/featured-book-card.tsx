import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Image from "next/image"

interface FeaturedBookCardProps {
  title: string
  author: string
  coverUrl: string
}

export default function FeaturedBookCard({ title, author, coverUrl }: FeaturedBookCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="relative h-64">
        <Image
          src={coverUrl || "/placeholder.svg"}
          alt={`Cover of ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
              <BookOpen className="h-4 w-4 mr-2" /> Read Now
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">{title}</h3>
        <p className="text-emerald-700 dark:text-emerald-400 text-sm">{author}</p>
      </div>
    </div>
  )
}
