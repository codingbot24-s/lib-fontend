"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Topic {
  id: number
  name: string
  description: string
}

// Update the form schema to match backend field names
const bookFormSchema = z.object({
  archiveId: z.string().min(1, "Archive ID is required"),
  title: z.string().min(1, "Title is required"),
  arabictitle: z.string().min(1, "Arabic Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  TopicID: z.number().min(1, "Topic is required"), // Changed from topic to TopicID
  language: z.string().min(1, "Language is required"),
  publisher: z.string().min(1, "Publisher is required"),
  Edition: z.string().min(1, "Edition is required"), // Changed from edition to Edition
})

type BookFormValues = z.infer<typeof bookFormSchema>

interface AdminQuickUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AdminQuickUploadModal({ open, onOpenChange, onSuccess }: AdminQuickUploadModalProps) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      Edition: "", // Changed from edition to Edition
    },
  })

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/topics')
        setTopics(response.data.topics)
      } catch (error) {
        console.error('Error fetching topics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopics()
  }, [])

  // Update the onSubmit function to match the backend expectations
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
        Edition: data.Edition
      }

      const response = await axios.post('http://localhost:8000/api/books', formattedData)

      if (response.status === 201) {
        toast.success('Book created successfully')
        onOpenChange(false)
        form.reset()
        onSuccess?.() // Call the success callback if provided
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Failed to create book: ${error.response?.data?.message || 'Unknown error'}`)
      } else {
        toast.error('Failed to create book')
      }
      console.error('Error creating book:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>Fill in the details to add a new book to the library.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="archiveid">Archive ID</Label>
              <Input
                {...form.register("archiveId")}
                placeholder="Enter archive.org ID"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
              {form.formState.errors.archiveId && (
                <p className="text-sm text-red-500">{form.formState.errors.archiveId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                {...form.register("title")}
                placeholder="Enter book title"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="arabicTitle">Arabic Title</Label>
              <Input
                {...form.register("arabictitle")}
                placeholder="أدخل عنوان الكتاب بالعربية"
                className="border-emerald-100 dark:border-emerald-900/50 font-arabic text-right"
                dir="rtl"
              />
              {form.formState.errors.arabictitle && (
                <p className="text-sm text-red-500">{form.formState.errors.arabictitle.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topicid">Topic</Label>
                {/* Update the Select component for topics */}
                <Select
                  onValueChange={(value) => {
                    if (value && value !== "loading") {
                      form.setValue("TopicID", parseInt(value)) // Changed from topic to TopicID
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>Loading...</SelectItem>
                    ) : topics.length === 0 ? (
                      <SelectItem value="no-topics" disabled>No topics available</SelectItem>
                    ) : (
                      topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id.toString()}>
                          {topic.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {form.formState.errors.TopicID && (
                  <p className="text-sm text-red-500">{form.formState.errors.TopicID.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select onValueChange={(value) => form.setValue("language", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic-english">Arabic/English</SelectItem>
                    <SelectItem value="urdu">Urdu</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.language && (
                  <p className="text-sm text-red-500">{form.formState.errors.language.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                {...form.register("author")}
                placeholder="Enter author name"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
              {form.formState.errors.author && (
                <p className="text-sm text-red-500">{form.formState.errors.author.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                {...form.register("publisher")}
                placeholder="Enter publisher name"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
              {form.formState.errors.publisher && (
                <p className="text-sm text-red-500">{form.formState.errors.publisher.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="Edition">Edition</Label>
              <Input
                {...form.register("Edition")} // Changed from edition to Edition
                placeholder="Enter edition"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
              {form.formState.errors.Edition && (
                <p className="text-sm text-red-500">{form.formState.errors.Edition.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...form.register("description")}
                placeholder="Enter book description"
                className="border-emerald-100 dark:border-emerald-900/50"
                rows={3}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Adding..." : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
