import Image from "next/image"
import { cn } from "@/lib/utils"

// Mock data for popular books
const popularBooks = [
  {
    id: 1,
    title: "Riyadh as-Saliheen",
    author: "Imam an-Nawawi",
    views: 1245,
    cover: "/placeholder.svg?height=60&width=40",
    trend: "up",
  },
  {
    id: 2,
    title: "The Sealed Nectar",
    author: "Safiur-Rahman Mubarakpuri",
    views: 982,
    cover: "/placeholder.svg?height=60&width=40",
    trend: "up",
  },
  {
    id: 3,
    title: "Fiqh of Worship",
    author: "Ibn Qudamah al-Maqdisi",
    views: 876,
    cover: "/placeholder.svg?height=60&width=40",
    trend: "down",
  },
  {
    id: 4,
    title: "The Quran: English Translation",
    author: "Abdullah Yusuf Ali",
    views: 754,
    cover: "/placeholder.svg?height=60&width=40",
    trend: "up",
  },
  {
    id: 5,
    title: "Purification of the Heart",
    author: "Hamza Yusuf",
    views: 621,
    cover: "/placeholder.svg?height=60&width=40",
    trend: "neutral",
  },
]

export default function PopularBooksTable() {
  return (
    <div className="space-y-4">
      {popularBooks.map((book) => (
        <div key={book.id} className="flex items-center gap-4">
          <div className="relative h-16 w-12 overflow-hidden rounded border">
            <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium text-sm">{book.title}</p>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xs font-medium",
                book.trend === "up" && "text-emerald-600",
                book.trend === "down" && "text-red-600",
                book.trend === "neutral" && "text-amber-600",
              )}
            >
              {book.trend === "up" && "↑"}
              {book.trend === "down" && "↓"}
              {book.trend === "neutral" && "→"}
            </span>
            <span className="text-sm font-medium">{book.views.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
