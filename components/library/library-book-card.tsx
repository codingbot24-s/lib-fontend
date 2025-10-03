"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {  BookOpen, Globe, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Book } from "@/types/book"

interface LibraryBookCardProps {
  book: Book
}

export default function LibraryBookCard({ book }: LibraryBookCardProps) {
  const hasMultipleVolumes = book.volume && book.volume > 1
  const publishedYear = new Date(book.created_at).getFullYear()

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      {/* Book Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={book.coverimage || "/placeholder.png"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay with quick info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white">
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
              {book.volume} Vol{book.volume !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title and Arabic Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-emerald-900 dark:text-white line-clamp-2 leading-tight">{book.title}</h3>
          {book.arabictitle && (
            <p className="text-sm text-amber-700 dark:text-gray-300 font-arabic leading-relaxed">{book.arabictitle}</p>
          )}
        </div>

        {/* Author */}
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{book.scholar}</p>

        {/* Topic and Rating */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 dark:border-gray-600 dark:text-white"
          >
            {book.topic.name}
          </Badge>
        </div>

        {/* Publication Year */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Published {publishedYear}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        {hasMultipleVolumes ? (
          <div className="w-full space-y-2">
            <Button
              asChild
              variant="outline"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <Link href={`/library/books/${book.id}/volumes`}>
                <BookOpen className="h-4 w-4 mr-2" />
                View Volumes
              </Link>
            </Button>
            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black">
              <Link href={`/library/books/${book.id}`}>View Details</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black">
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
