"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Eye, Trash2, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"
import { Book } from "@/types/book"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import axios from "axios"

interface AdminRecentBooksTableProps {
  books : Book[]
  isLoading: boolean
}

export function AdminRecentBooksTable({
  books,
  isLoading,
}: AdminRecentBooksTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
   
  const booksPerPage = 5
  const totalPages = Math.ceil(books.length / booksPerPage)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }


  const deleteBook = async (bookId: number) => {
    try {
      const resposne = await axios.delete(`http://localhost:8000/api/books/${bookId}`)
      if (resposne.status === 200) {
        toast.success('Book deleted successfully')
        
      }     
      console.log(`Book with ID ${bookId} deleted`)
    } catch (error) {
      console.error("Failed to delete book:", error)
    }
  }   


  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading recent books...
        </div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">No recent books found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-emerald-100 dark:border-emerald-900/50">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50 dark:bg-emerald-900/30">
              <TableRow className="hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40">
                <TableHead className="w-[80px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Language</TableHead>
                
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
                      <p className="text-xs text-muted-foreground font-arabic line-clamp-1">
                        {book.arabictitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {book.scholar}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {book.topic.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {book.language}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Book
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600"
                            onClick={() => {
                              deleteBook(book.id)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Book
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination - Mobile optimized */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <div className="text-xs text-muted-foreground sm:text-sm">
          Showing {Math.min(currentPage * booksPerPage, books.length)} of{" "}
          {books.length} books
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.max(1, prev - 1))
            }
            disabled={currentPage === 1}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
