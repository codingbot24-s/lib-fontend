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

// Mock data for books
const books = [
  {
    id: 1,
    title: "Riyadh as-Saliheen",
    arabicTitle: "رياض الصالحين",
    topic: "Hadith",
    scholar: "Imam an-Nawawi",
    language: "Arabic/English",
    uploadDate: "2023-05-15",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 2,
    title: "The Sealed Nectar",
    arabicTitle: "الرحيق المختوم",
    topic: "Seerah",
    scholar: "Safiur-Rahman Mubarakpuri",
    language: "English",
    uploadDate: "2023-05-12",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 3,
    title: "Fiqh of Worship",
    arabicTitle: "فقه العبادات",
    topic: "Fiqh",
    scholar: "Ibn Qudamah al-Maqdisi",
    language: "Arabic/English",
    uploadDate: "2023-05-10",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 4,
    title: "The Quran: English Translation",
    arabicTitle: "القرآن الكريم",
    topic: "Quran",
    scholar: "Abdullah Yusuf Ali",
    language: "English",
    uploadDate: "2023-05-08",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 5,
    title: "Purification of the Heart",
    arabicTitle: "تزكية النفس",
    topic: "Spirituality",
    scholar: "Hamza Yusuf",
    language: "English",
    uploadDate: "2023-05-05",
    cover: "/placeholder.svg?height=60&width=40",
  },
]

export function AdminRecentBooksTable() {
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-emerald-100 dark:border-emerald-900/50">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50 dark:bg-emerald-900/30">
              <TableRow className="hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40">
                <TableHead className="w-[80px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Topic</TableHead>
                <TableHead className="hidden md:table-cell">Scholar</TableHead>
                <TableHead className="hidden lg:table-cell">Language</TableHead>
                <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="p-2">
                    <div className="relative h-12 w-8 sm:h-14 sm:w-10">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-xs sm:text-sm line-clamp-1">
                        {book.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-arabic line-clamp-1">
                        {book.arabicTitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {book.topic}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs sm:text-sm">{book.scholar}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-xs sm:text-sm">{book.language}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-xs sm:text-sm">
                      {formatDate(book.uploadDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Book
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400 text-xs sm:text-sm"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
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
