"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
      <div className="rounded-md border border-emerald-100 dark:border-emerald-900/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-emerald-50 dark:bg-emerald-900/30">
            <TableRow className="hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40">
              <TableHead className="w-[80px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Topic</TableHead>
              <TableHead className="hidden md:table-cell">Scholar</TableHead>
              <TableHead className="hidden lg:table-cell">Language</TableHead>
              <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} className="hover:bg-emerald-50 dark:hover:bg-emerald-900/10">
                <TableCell>
                  <div className="relative h-12 w-8 overflow-hidden rounded border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
                    <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-emerald-900 dark:text-emerald-50">{book.title}</p>
                    <p className="text-xs text-muted-foreground font-arabic">{book.arabicTitle}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
                  >
                    {book.topic}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{book.scholar}</TableCell>
                <TableCell className="hidden lg:table-cell">{book.language}</TableCell>
                <TableCell className="hidden lg:table-cell">{formatDate(book.uploadDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{(currentPage - 1) * booksPerPage + 1}</span> to{" "}
          <span className="font-medium">{Math.min(currentPage * booksPerPage, books.length)}</span> of{" "}
          <span className="font-medium">{books.length}</span> books
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-emerald-100 dark:border-emerald-900/50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-emerald-100 dark:border-emerald-900/50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
