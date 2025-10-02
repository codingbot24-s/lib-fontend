"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
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
import { Loader2 } from "lucide-react"

interface Topic {
  id: number
  name: string
  description: string
}

// Update the form schema to include volumes
const volumeSchema = z.object({
  volume_number: z.number().min(1, "Volume number is required"),
  archive_id: z.string().min(1, "Archive ID is required"),
})

// Update the form schema to make volumes truly optional
const bookFormSchema = z.object({
  archiveId: z.string().min(1, "Archive ID is required"),
  title: z.string().min(1, "Title is required"),
  arabictitle: z.string().min(1, "Arabic Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.string().min(1, "Author is required"),
  TopicIDs: z.array(z.number()).min(1, "At least one topic is required"),
  language: z.string().min(1, "Language is required"),
  publisher: z.string().min(1, "Publisher is required"),
  Edition: z.string().min(1, "Edition is required"),
  volumes: z.array(volumeSchema),
}).transform(data => ({
  ...data,
  volumes: data.volumes ?? []
}))

type BookFormValues = z.infer<typeof bookFormSchema>

interface AdminQuickUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AdminQuickUploadModal({ open, onOpenChange, onSuccess }: AdminQuickUploadModalProps) {
  const [, setIsLoading] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([])
  const [volumeCount, setVolumeCount] = useState(0)
  const [selectedTopics, setSelectedTopics] = useState<number[]>([])

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      archiveId: "",
      title: "",
      arabictitle: "",
      description: "",
      author: "",
      TopicIDs: [],
      language: "",
      publisher: "",
      Edition: "",
      volumes: [],
    },
  })

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/topics')
        setTopics(response.data.topics)
      } catch (error) {
        console.error('Error fetching topics:', error)
        toast.error('Failed to load topics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopics()
  }, [])

  // Update the onSubmit function
  const onSubmit = async (data: BookFormValues) => {
    try {
      setIsLoading(true)
      const formattedData = {
        archiveId: data.archiveId,
        title: data.title,
        arabictitle: data.arabictitle,
        description: data.description,
        author: data.author,
        topics: data.TopicIDs,
        language: data.language,
        publisher: data.publisher,
        Edition: data.Edition,
        // Only include volumes if they exist
        ...(data.volumes && data.volumes.length > 0 && {
          volumes: data.volumes.map(vol => ({
            volume_number: vol.volume_number,
            archive_id: vol.archive_id
          }))
        })
      }
      console.log("formatted data", formattedData)
      const response = await axios.post('http://localhost:8000/api/books', formattedData)

      if (response.status === 201) {
        toast.success('Book created successfully')
        onOpenChange(false)
        form.reset()
        setVolumeCount(0)
        setSelectedTopics([])
        onSuccess?.()
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
      <DialogTrigger asChild>
        <Button 
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => onOpenChange(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Quick Book Upload</span>
          <span className="inline sm:hidden">Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[95vw] max-w-[600px] sm:max-w-[900px] md:max-w-[1200px] h-[95vh] sm:h-[90vh] p-0">
        {/* Fixed Header - More compact on mobile */}
        <DialogHeader className="flex-shrink-0 p-4 sm:p-6 md:p-8 border-b">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-100">
            Add New Book
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Fill in the details to add a new book to the library.
          </DialogDescription>
        </DialogHeader>
        
        {/* Scrollable Content - Responsive and with max height */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-h-[70vh]">
          <form onSubmit={form.handleSubmit(onSubmit)} id="book-form" className="space-y-6 sm:space-y-8">
            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Archive ID Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="archiveid" className="text-sm font-medium">
                  Archive ID
                </Label>
                <Input
                  {...form.register("archiveId")}
                  placeholder="Enter archive.org ID"
                  className="h-10 text-sm border-emerald-100 dark:border-emerald-900/50 w-full"
                />
                {form.formState.errors.archiveId && (
                  <p className="text-xs text-red-500">{form.formState.errors.archiveId.message}</p>
                )}
              </div>

              {/* Title Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="title" className="text-sm font-medium">
                  Book Title
                </Label>
                <Input
                  {...form.register("title")}
                  placeholder="Enter book title"
                  className="h-10 text-sm border-emerald-100 dark:border-emerald-900/50 w-full"
                />
                {form.formState.errors.title && (
                  <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Arabic Title Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="arabictitle" className="text-sm">Arabic Title</Label>
                <Input
                  {...form.register("arabictitle")}
                  placeholder="أدخل عنوان الكتاب بالعربية"
                  className="h-10 text-sm border-emerald-100 dark:border-emerald-900/50 font-arabic text-right w-full"
                  dir="rtl"
                />
                {form.formState.errors.arabictitle && (
                  <p className="text-xs text-red-500">{form.formState.errors.arabictitle.message}</p>
                )}
              </div>

              {/* Topic Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="topicid" className="text-sm">Topic</Label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Button
                      key={topic.id}
                      type="button"
                      variant={selectedTopics.includes(topic.id) ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${
                        selectedTopics.includes(topic.id)
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      }`}
                      onClick={() => {
                        const newSelectedTopics = selectedTopics.includes(topic.id)
                          ? selectedTopics.filter(id => id !== topic.id)
                          : [...selectedTopics, topic.id]
                        setSelectedTopics(newSelectedTopics)
                        form.setValue("TopicIDs", newSelectedTopics)
                      }}
                    >
                      {topic.name}
                    </Button>
                  ))}
                </div>
                {form.formState.errors.TopicIDs && (
                  <p className="text-xs text-red-500">{form.formState.errors.TopicIDs.message}</p>
                )}
              </div>

              {/* Language Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="language" className="text-sm">Language</Label>
                <Select onValueChange={(value) => form.setValue("language", value)}>
                  <SelectTrigger className="w-full">
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
                  <p className="text-xs text-red-500">{form.formState.errors.language.message}</p>
                )}
              </div>

              {/* Author Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="author" className="text-sm">Author</Label>
                <Input
                  {...form.register("author")}
                  placeholder="Enter author name"
                  className="h-10 text-sm border-emerald-100 dark:border-emerald-900/50 w-full"
                />
                {form.formState.errors.author && (
                  <p className="text-xs text-red-500">{form.formState.errors.author.message}</p>
                )}
              </div>

              {/* Publisher Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="publisher" className="text-sm">Publisher</Label>
                <Input
                  {...form.register("publisher")}
                  placeholder="Enter publisher name"
                  className="h-10 text-sm border-emerald-100 dark:border-emerald-900/50 w-full"
                />
                {form.formState.errors.publisher && (
                  <p className="text-xs text-red-500">{form.formState.errors.publisher.message}</p>
                )}
              </div>

              {/* Edition Field */}
              <div className="space-y-2 col-span-1">
                <Label htmlFor="Edition" className="text-sm">Edition</Label>
                <Input
                  {...form.register("Edition")}
                  placeholder="Enter edition"
                  className="h-10 text-sm border-emerald-100 dark:border-emerald-900/50 w-full"
                />
                {form.formState.errors.Edition && (
                  <p className="text-xs text-red-500">{form.formState.errors.Edition.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2 col-span-1 sm:col-span-2 lg:col-span-3">
                <Label htmlFor="description" className="text-sm">Description</Label>
                <Textarea
                  {...form.register("description")}
                  placeholder="Enter book description"
                  className="min-h-[80px] text-sm border-emerald-100 dark:border-emerald-900/50 w-full"
                  rows={3}
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Volumes Section - Responsive */}
            <div className="border-t pt-4 sm:pt-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                      <Label className="text-sm sm:text-base">Volumes (Optional)</Label>
                      <p className="text-xs text-muted-foreground">
                        Add volumes if the book has multiple parts
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setVolumeCount(prev => prev + 1)}
                      className="text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Volume
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {volumeCount > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: volumeCount }).map((_, index) => (
                          <div key={index} className="p-4 border rounded-lg space-y-3 bg-white dark:bg-gray-900/30">
                            {/* Volume fields with responsive sizing */}
                            <div className="space-y-2">
                              <Label htmlFor={`volumes.${index}.volume_number`} className="text-xs sm:text-sm">
                                Volume Number
                              </Label>
                              <Input
                                type="number"
                                {...form.register(`volumes.${index}.volume_number` as const, {
                                  valueAsNumber: true,
                                })}
                                placeholder="Enter volume number"
                                className="h-9 text-xs sm:text-sm w-full"
                              />
                              {form.formState.errors.volumes?.[index]?.volume_number && (
                                <p className="text-xs text-red-500">
                                  {form.formState.errors.volumes[index]?.volume_number?.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`volumes.${index}.archive_id`} className="text-xs sm:text-sm">
                                Volume Archive ID
                              </Label>
                              <Input
                                {...form.register(`volumes.${index}.archive_id` as const)}
                                placeholder="Enter volume archive ID"
                                className="h-9 text-xs sm:text-sm w-full"
                              />
                              {form.formState.errors.volumes?.[index]?.archive_id && (
                                <p className="text-xs text-red-500">
                                  {form.formState.errors.volumes[index]?.archive_id?.message}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8">
                        <p className="text-sm">No volumes added yet.</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click &quot;Add Volume&quot; to add volumes to this book.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer - Compact on mobile */}
        <DialogFooter className="flex-shrink-0 p-4 sm:p-6 md:p-8 border-t bg-background">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto h-10 text-sm"
            >
              Cancel
            </Button>
            <Button
              form="book-form"
              type="submit"
              className="w-full sm:w-auto h-10 text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="sm:inline">Adding...</span>
                  <span className="inline sm:hidden">...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span className="sm:inline">Add Book</span>
                  <span className="inline sm:hidden">Add</span>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
