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

export const metadata: Metadata = {
  title: "Books Management | Admin Dashboard",
  description: "Manage books in the Islamic Digital Library",
}

// Mock data for books
const books = [
  {
    id: 1,
    title: "Riyadh as-Saliheen",
    author: "Imam an-Nawawi",
    category: "Hadith",
    language: "Arabic/English",
    status: "Published",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 2,
    title: "The Sealed Nectar",
    author: "Safiur-Rahman Mubarakpuri",
    category: "Seerah",
    language: "English",
    status: "Published",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 3,
    title: "Fiqh of Worship",
    author: "Ibn Qudamah al-Maqdisi",
    category: "Fiqh",
    language: "Arabic/English",
    status: "Draft",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 4,
    title: "The Quran: English Translation",
    author: "Abdullah Yusuf Ali",
    category: "Quran",
    language: "English",
    status: "Published",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 5,
    title: "Purification of the Heart",
    author: "Hamza Yusuf",
    category: "Spirituality",
    language: "English",
    status: "Published",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 6,
    title: "The Creed of Imam al-Tahawi",
    author: "Imam al-Tahawi",
    category: "Aqeedah",
    language: "Arabic/English",
    status: "Draft",
    cover: "/placeholder.svg?height=60&width=40",
  },
  {
    id: 7,
    title: "Bulugh al-Maram",
    author: "Ibn Hajar al-Asqalani",
    category: "Hadith",
    language: "Arabic/English",
    status: "Published",
    cover: "/placeholder.svg?height=60&width=40",
  },
]

export default function BooksManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900">Books Management</h1>
          <p className="text-muted-foreground">Manage all books in the Islamic Digital Library</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Books Library</CardTitle>
            <div className="flex items-center gap-2">
              <Input placeholder="Search books..." className="w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="relative h-12 w-8 overflow-hidden rounded border">
                      <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.language}</TableCell>
                  <TableCell>
                    <Badge
                      variant={book.status === "Published" ? "default" : "outline"}
                      className={book.status === "Published" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
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
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Book</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Book</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
