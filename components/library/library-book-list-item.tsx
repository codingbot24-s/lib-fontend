"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Globe, Calendar, FileText } from "lucide-react"
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
  rating?: number
  publishYear?: number
  
}


interface BookListItemProps {
  book: Book
}

export default function LibraryBookListItem({ book }: BookListItemProps) {
  const hasMultipleVolumes = (book.volumes ?? 0) > 1

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Book Cover */}
          <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
            <Image
              unoptimized
              priority
              src={book.coverimage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Volume Badge */}
            {hasMultipleVolumes && (
              <div className="absolute top-1 left-1">
                <Badge variant="secondary" className="bg-emerald-600 text-white text-xs px-1 py-0">
                  {book.volumes}V
                </Badge>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-3">
            {/* Title and Arabic Title */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 leading-tight">{book.title}</h3>
              {book.arabicTitle && (
                <p className="text-amber-700 dark:text-amber-400 font-arabic text-lg leading-relaxed">
                  {book.arabicTitle}
                </p>
              )}
            </div>

            {/* Author */}
            <p className="text-gray-700 dark:text-gray-300 font-medium">by {book.scholar}</p>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{book.description}</p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{book.language}</span>
              </div>

              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{book.pages} pages</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{book.publishYear}</span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{book.rating}</span>
              </div>
            </div>

            {/* Tags and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
                >
                  {book.topic}
                </Badge>

                <Badge variant="secondary" className="text-xs">
                  {book.edition}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                {hasMultipleVolumes && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  >
                    <Link href={`/library/books/${book.id}/volumes`}>View Volumes</Link>
                  </Button>
                )}

                <Button asChild size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white">
                  <Link href={`/library/books/${book.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    {hasMultipleVolumes ? "View Details" : "Read Now"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
