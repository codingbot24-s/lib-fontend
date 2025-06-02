"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Globe, Calendar, Volume2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Book {
  id: number
  title: string
  arabicTitle?: string
  author: string
  language: string
  topic: string
  edition: string
  coverUrl: string
  volumes: number
  pages: number
  publishYear: number
  rating: number
  description: string
}

interface ResponsiveBookCardProps {
  book: Book
}

export default function ResponsiveBookCard({ book }: ResponsiveBookCardProps) {
  const hasMultipleVolumes = book.volumes > 1

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Book Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={book.coverUrl || "/placeholder.svg"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Overlay with quick info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-xs sm:text-sm font-medium mb-1">{book.pages} pages</p>
            <p className="text-xs text-gray-200">{book.edition}</p>
          </div>
        </div>

        {/* Language Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm text-xs">
            <Globe className="h-3 w-3 mr-1" />
            {book.language}
          </Badge>
        </div>

        {/* Volume Badge */}
        {hasMultipleVolumes && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-emerald-600 text-white text-xs">
              <Volume2 className="h-3 w-3 mr-1" />
              {book.volumes} Vol{book.volumes !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-grow">
        {/* Title and Arabic Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-100 line-clamp-2 leading-tight text-sm sm:text-base">
            {book.title}
          </h3>
          {book.arabicTitle && (
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-arabic leading-relaxed line-clamp-1">
              {book.arabicTitle}
            </p>
          )}
        </div>

        {/* Author */}
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium line-clamp-1">{book.author}</p>

        {/* Topic and Rating */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs flex-shrink-0"
          >
            {book.topic}
          </Badge>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{book.rating}</span>
          </div>
        </div>

        {/* Publication Year */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Published {book.publishYear}</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0 space-y-2">
        {hasMultipleVolumes ? (
          <div className="w-full space-y-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 text-xs sm:text-sm"
            >
              <Link href={`/library/books/${book.id}/volumes`}>
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View Volumes
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm"
            >
              <Link href={`/library/books/${book.id}`}>View Details</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full">
            <Button
              asChild
              size="sm"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm"
            >
              <Link href={`/library/books/${book.id}`}>
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Read Now
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
