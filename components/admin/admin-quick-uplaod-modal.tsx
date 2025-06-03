"use client"

import type React from "react"

import { useState } from "react"
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

export function AdminQuickUploadModal() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    // send the request for adding a new book on the server on local host 
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Quick Upload Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] border-emerald-100 dark:border-emerald-900/50">
        <DialogHeader>
          <DialogTitle className="text-emerald-900 dark:text-emerald-50">Add New Book</DialogTitle>
          <DialogDescription>Fill in the details to add a new book to the library.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title (English)</Label>
              <Input
                id="title"
                placeholder="Enter book title"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arabicTitle">Book Title (Arabic)</Label>
              <Input
                id="arabicTitle"
                placeholder="Enter Arabic title"
                dir="rtl"
                className="border-emerald-100 dark:border-emerald-900/50 font-arabic"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select>
                  <SelectTrigger className="border-emerald-100 dark:border-emerald-900/50">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tafsir">Tafsir</SelectItem>
                    <SelectItem value="hadith">Hadith</SelectItem>
                    <SelectItem value="fiqh">Fiqh</SelectItem>
                    <SelectItem value="seerah">Seerah</SelectItem>
                    <SelectItem value="aqeedah">Aqeedah</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="quran">Quran</SelectItem>
                    <SelectItem value="tasawwuf">Tasawwuf</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger className="border-emerald-100 dark:border-emerald-900/50">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic-english">Arabic/English</SelectItem>
                    <SelectItem value="urdu">Urdu</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scholar">Scholar</Label>
              <Input
                id="scholar"
                placeholder="Enter scholar name"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverUrl">Cover Image URL</Label>
              <Input
                id="coverUrl"
                placeholder="Enter image URL or upload"
                className="border-emerald-100 dark:border-emerald-900/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter book description"
                className="border-emerald-100 dark:border-emerald-900/50"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-emerald-100 dark:border-emerald-900/50"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Add Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
