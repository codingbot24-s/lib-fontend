"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { QuickUploadButton } from "@/components/admin/quick-upload-button"
import { Book } from "@/types/book"

interface Topic {
  id: number
  name: string
  description: string
}

// Update the form schema to match backend expectations
const bookFormSchema = z.object({
  archiveId: z.string().min(1, "Archive ID is required"),
  title: z.string().min(1, "Title is required"),
  arabictitle: z.string().min(1, "Arabic Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  TopicID: z.number().min(1, "Topic is required"), // Changed from topic to TopicID
  language: z.string().min(1, "Language is required"),
  publisher: z.string().min(1, "Publisher is required"),
  edition: z.string().min(1, "Edition is required"),
})

type BookFormValues = z.infer<typeof bookFormSchema>

// Update the component to be client-side
export default function BooksManagementPage() {
  const [open, setOpen] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState<Book[]>([])

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      archiveId: "",
      title: "",
      arabictitle: "",
      description: "",
      author: "",
      TopicID: 0, // Changed from topic to TopicID
      language: "",
      publisher: "",
      edition: "",
    },
  })

  const onSubmit = async (data: BookFormValues) => {
    try {
      setIsLoading(true)
      
      const formattedData = {
        archiveId: data.archiveId,
        title: data.title,
        arabictitle: data.arabictitle,
        description: data.description,
        author: data.author,
        topic: Number(data.TopicID), 
        language: data.language,
        publisher: data.publisher,
        edition: data.edition
      }

      const response = await axios.post('http://localhost:8000/api/books', formattedData)
      
      if (response.status === 201) {
        const newBook = response.data
        toast.success('Book created successfully')
        // Add the new book to your books list if needed
        // setBooks(prev => [...prev, newBook])
        setOpen(false)
        form.reset()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Failed to create book: ${error.response?.data?.error || 'Unknown error'}`)
      } else {
        toast.error('Failed to create book')
      }
      console.error('Error creating book:', error)
    } finally {
      setIsLoading(false)
    }
  }


  // Add this useEffect for fetching topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:8000/api/topics')
        setTopics(response.data.topics)
      } catch (error) {
        toast.error('Failed to fetch topics')
        console.error('Error fetching topics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopics()
  }, [])


  useEffect(() => {

    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:8000/api/books')
        setBooks(response.data.books)
      } catch (error) {
        toast.error('Failed to fetch books')
        console.error('Error fetching books:', error)
      }

    }
    fetchBooks()
  },[])

  const handleBookCreated = () => {
    // Show a generic success message
    toast.success("Book created successfully")
  }

  const deleteBook = async (bookId: number) => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`http://localhost:8000/api/books/${bookId}`)
      if (response.status === 200) {
        toast.success('Book deleted successfully')
        // Optionally, remove the book from the state
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
      }
    } catch (error) {
      toast.error('Failed to delete book')
      console.error('Error deleting book:', error)
    } finally {
      setIsLoading(false)
    }
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
        <div className="w-full sm:w-auto">
          <QuickUploadButton onSuccess={handleBookCreated} />
        </div>
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
                        <p className="font-medium text-sm sm:text-base line-clamp-1">{book.title}</p>
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
                        className={`text-xs sm:text-sm ${book.status === "Published" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
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
                          <DropdownMenuLabel className="text-xs sm:text-sm">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 text-xs sm:text-sm"
                            onClick={() => deleteBook(book.id)}
                          >
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
