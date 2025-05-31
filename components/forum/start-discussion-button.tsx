"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function StartDiscussionButton() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Start Discussion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-emerald-900 dark:text-emerald-100">Start a New Discussion</DialogTitle>
            <DialogDescription>
              Share your question or topic with the community. Be clear and specific to get the best responses.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-emerald-900 dark:text-emerald-100">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your discussion"
                className="border-gray-300 dark:border-gray-700"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category" className="text-emerald-900 dark:text-emerald-100">
                Category
              </Label>
              <Select>
                <SelectTrigger id="category" className="border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="quran">Quran</SelectItem>
                  <SelectItem value="hadith">Hadith</SelectItem>
                  <SelectItem value="fiqh">Fiqh</SelectItem>
                  <SelectItem value="aqeedah">Aqeedah</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags" className="text-emerald-900 dark:text-emerald-100">
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="Add tags separated by commas (e.g., prayer, beginner, advice)"
                className="border-gray-300 dark:border-gray-700"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tags help others find your discussion. Add up to 5 relevant tags.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content" className="text-emerald-900 dark:text-emerald-100">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Describe your question or topic in detail..."
                className="min-h-[200px] border-gray-300 dark:border-gray-700"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white">
              Post Discussion
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
