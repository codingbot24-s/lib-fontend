import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"

interface BookCardProps {
  title: string
  author: string
  coverUrl: string
  description?: string
  arabicTitle?: string
  category?: string
  tags?: string[]
  rating?: number
}

export default function BookCard({
  title,
  author,
  coverUrl,
  description,
  arabicTitle = "",
  category = "Book",
  tags = [],
  rating = 4.5,
}: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={coverUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h4 className="text-white font-bold">{title}</h4>
            <p className="text-emerald-200 text-sm">{author}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} className="bg-emerald-700 hover:bg-emerald-800 text-white">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-emerald-900 dark:text-white">{title}</h3>
            {arabicTitle && <p className="text-xs text-gold dark:text-gray-300 font-arabic">{arabicTitle}</p>}
          </div>
          {category && (
            <Badge
              variant="outline"
              className="border-emerald-200 text-emerald-700 dark:border-gray-600 dark:text-white"
            >
              {category}
            </Badge>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{author}</p>
        {description && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>}
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gold fill-gold" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black">Read Now</Button>
      </CardFooter>
    </Card>
  )
}
