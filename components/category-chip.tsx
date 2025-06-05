import { BookOpen, Scroll, Book, Scale, Landmark, User, Heart, Brain, Calendar } from "lucide-react"
import Link from "next/link"

interface CategoryChipProps {
  name: string
  id: number
}

export default function CategoryChip({ name, id }: CategoryChipProps) {
  return (
    <Link 
      href={`/library/topic/${id}`}
      className="flex-shrink-0 flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
    >
      <span className="text-gray-800 dark:text-gray-200 font-medium">{name}</span>
    </Link>
  )
}
