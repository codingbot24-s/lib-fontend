"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Globe, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Book {
  id: number
  title: string
  arabicTitle?: string
  description: string
  scholar: string
  topic: string
  language: string
  publisher: string
  edition: string
  coverimage: string
  viewpdfurl: string
  download_url: string
  created_at: string
  updated_at: string
  volumes?: number
  pages?: number
  rating? : number
  publishYear?: number
}

interface BookCardProps {
  book: Book
  onClick?: () => void
}

export default function LibraryBookCard({ book, onClick }: BookCardProps) {
  const hasMultipleVolumes = (book.volumes ?? 0) > 1

  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      {/* Book Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          unoptimized
          priority
          src={book.coverimage || "/placeholder.svg"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay with quick info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-sm font-medium mb-1">{book.pages} pages</p>
            <p className="text-xs text-gray-200">{book.edition}</p>
          </div>
        </div>

        {/* Language Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm">
            <Globe className="h-3 w-3 mr-1" />
            {book.language}
          </Badge>
        </div>

        {/* Volume Badge */}
        {hasMultipleVolumes && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-emerald-600 text-white">
              {book.volumes} Vol{book.volumes !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title and Arabic Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-100 line-clamp-2 leading-tight">{book.title}</h3>
          {book.arabicTitle && (
            <p className="text-sm text-amber-700 dark:text-amber-400 font-arabic leading-relaxed">{book.arabicTitle}</p>
          )}
        </div>

        {/* Author */}
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{book.scholar}</p>

        {/* Topic and Rating */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
          >
            {book.topic}
          </Badge>

          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{book.rating}</span>
          </div>
        </div>

        {/* Publication Year */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Published {book.publishYear}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        {hasMultipleVolumes ? (
          <div className="w-full space-y-2">
            <Button
              asChild
              variant="outline"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
            >
              <Link href={`/library/books/${book.id}/volumes`}>
                <BookOpen className="h-4 w-4 mr-2" />
                View Volumes
              </Link>
            </Button>
            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
              <Link href={`/library/books/${book.id}`}>View Details</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
              <Link href={`/library/books/${book.id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Read Now
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
