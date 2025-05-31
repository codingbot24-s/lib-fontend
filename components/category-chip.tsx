import { BookOpen, Scroll, Book, Scale, Landmark, User, Heart, Brain, Calendar } from "lucide-react"

interface CategoryChipProps {
  name: string
  icon: string
}

export default function CategoryChip({ name, icon }: CategoryChipProps) {
  const getIcon = () => {
    switch (icon) {
      case "book-open":
        return <BookOpen className="h-4 w-4" />
      case "scroll":
        return <Scroll className="h-4 w-4" />
      case "book":
        return <Book className="h-4 w-4" />
      case "scale":
        return <Scale className="h-4 w-4" />
      case "landmark":
        return <Landmark className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "heart":
        return <Heart className="h-4 w-4" />
      case "brain":
        return <Brain className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      default:
        return <Book className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-shrink-0 flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors cursor-pointer">
      <div className="text-emerald-700 dark:text-emerald-400 mr-2">{getIcon()}</div>
      <span className="text-gray-800 dark:text-gray-200 font-medium">{name}</span>
    </div>
  )
}
