"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, FileText, Plus, Book, Calendar, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface Note {
  id: number
  bookId: number
  bookTitle: string
  content: string
  page: number
  createdAt: string
}

interface BookType {
  id: number
  title: string
  author: string
  coverUrl: string
  progress: number
  lastRead: string
  totalPages: number
  currentPage: number
}

interface NotesProps {
  notes: Note[]
  books: BookType[]
}

export default function NotesSection({ notes: initialNotes, books }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({
    bookId: 0,
    content: "",
    page: 1,
  })

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Add a new note
  const handleAddNote = () => {
    if (newNote.bookId && newNote.content) {
      const selectedBook = books.find((book) => book.id === newNote.bookId)
      if (!selectedBook) return

      const newNoteObj: Note = {
        id: notes.length + 1,
        bookId: newNote.bookId,
        bookTitle: selectedBook.title,
        content: newNote.content,
        page: newNote.page,
        createdAt: new Date().toISOString(),
      }

      setNotes([...notes, newNoteObj])
      setNewNote({ bookId: 0, content: "", page: 1 })
      setIsAddNoteOpen(false)
    }
  }

  // Edit an existing note
  const handleEditNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...selectedNote, createdAt: new Date().toISOString() } : note,
      )
      setNotes(updatedNotes)
      setSelectedNote(null)
      setIsEditNoteOpen(false)
    }
  }

  // Delete a note
  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d, yyyy 'at' h:mm a")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">My Notes</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-md border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>

          <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogDescription>Create a new note for your reading material.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="book">Book</Label>
                  <Select
                    value={newNote.bookId.toString()}
                    onValueChange={(value) => setNewNote({ ...newNote, bookId: Number.parseInt(value) })}
                  >
                    <SelectTrigger id="book">
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((book) => (
                        <SelectItem key={book.id} value={book.id.toString()}>
                          {book.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="page">Page Number</Label>
                  <Input
                    id="page"
                    type="number"
                    min={1}
                    value={newNote.page}
                    onChange={(e) => setNewNote({ ...newNote, page: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Note Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your note here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="min-h-[150px]"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddNote} className="bg-emerald-700 hover:bg-emerald-800 text-white">
                  Save Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditNoteOpen} onOpenChange={setIsEditNoteOpen}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogDescription>Update your note for {selectedNote?.bookTitle}.</DialogDescription>
              </DialogHeader>

              {selectedNote && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-page">Page Number</Label>
                    <Input
                      id="edit-page"
                      type="number"
                      min={1}
                      value={selectedNote.page}
                      onChange={(e) => setSelectedNote({ ...selectedNote, page: Number.parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-content">Note Content</Label>
                    <Textarea
                      id="edit-content"
                      placeholder="Write your note here..."
                      value={selectedNote.content}
                      onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditNoteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditNote} className="bg-emerald-700 hover:bg-emerald-800 text-white">
                  Update Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <FileText className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No notes found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery
              ? `No notes matching "${searchQuery}" found.`
              : "You haven't created any notes yet. Add notes while reading to keep track of important insights."}
          </p>
          <Button
            onClick={() => setIsAddNoteOpen(true)}
            className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Note
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Book className="h-5 w-5 text-emerald-700 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-emerald-900 dark:text-emerald-100">{note.bookTitle}</h3>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="mr-3">Page {note.page}</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
                      onClick={() => {
                        setSelectedNote(note)
                        setIsEditNoteOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-700 dark:text-gray-400 dark:hover:text-red-400"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{note.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
