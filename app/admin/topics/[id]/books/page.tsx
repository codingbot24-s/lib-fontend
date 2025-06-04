"use client"

import type { Metadata } from "next"
import Image from "next/image"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Book } from "@/types/book"


export default function BooksManagementPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const topicId = params.id // Get ID from route params instead of search params

  useEffect(() => {
    const fetchBooks = async () => {
      if (!topicId) return
      
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:8000/api/topics/${topicId}/books`)
        setBooks(response.data.books)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [topicId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 sm:space-y-6 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-50 sm:text-3xl lg:text-4xl">
            Books Management
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage all books in the Islamic Digital Library
          </p>
        </div>
        <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="sm:inline">Add New Book</span>
          <span className="inline sm:hidden">Add Book</span>
        </Button>
      </div>

      {/* Books Table Card */}
      <Card>
        <CardHeader className="space-y-4 sm:flex sm:items-center sm:justify-between sm:space-y-0 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Books Library</CardTitle>
          <div className="w-full sm:w-auto">
            <Input 
              placeholder="Search books..." 
              className="w-full sm:w-[250px]"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Language</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="w-[60px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="p-2 sm:p-4">
                      <div className="relative h-10 w-7 sm:h-12 sm:w-8 overflow-hidden rounded border">
                        <Image
                          src={book.coverimage || "/placeholder.svg"}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm sm:text-base line-clamp-1">
                          {book.title}
                        </p>
                        <p className="text-xs text-muted-foreground md:hidden">
                          {book.scholar}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm sm:text-base">
                      {book.scholar}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {book.topic.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm sm:text-base">
                      {book.language}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={book.status === "Published" ? "default" : "outline"}
                        className={`text-xs sm:text-sm ${
                          book.status === "Published" 
                            ? "bg-emerald-600 hover:bg-emerald-700" 
                            : ""
                        }`}
                      >
                        {book.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel className="text-xs sm:text-sm">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            Edit Book
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 text-xs sm:text-sm">
                            Delete Book
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
