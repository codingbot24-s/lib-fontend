"use client"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

import { useState, useEffect } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface Book {
  id: number
  title: string
  arabictitle: string
  coverimage: string
  scholar: string
  language: string
}

interface TopicBooksProps {
  topicId: string
}

export function TopicBooks({ topicId }: TopicBooksProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTopicBooks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${BACKEND_URL}/api/topics/${topicId}/books`)
        setBooks(response.data.books)
      } catch (error) {
        console.error('Error fetching topic books:', error)
        setError("Failed to fetch books")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopicBooks()
  }, [topicId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-lg text-muted-foreground text-center">
          No books found for this topic yet.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          Check back later for new additions.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {books.map((book) => (
        <Card key={book.id} className="overflow-hidden">
          <div className="aspect-[3/4] relative">
            <Image
              src={book.coverimage || "/placeholder.png"}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground font-arabic text-right line-clamp-1">
              {book.arabictitle}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}