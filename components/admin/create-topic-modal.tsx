"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateTopicModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTopic: (topic: { name: string; description?: string }) => void // Updated interface
}

export function CreateTopicModal({ isOpen, onClose, onCreateTopic }: CreateTopicModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onCreateTopic({
      name: name.trim(), // Changed from 'name' to 'Name'
      description: description.trim() || undefined, // Changed from 'description' to 'Description'
    })

    // Reset form
    setName("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Create New Topic</DialogTitle>
            <DialogDescription className="text-center">
              Add a new topic category to the Islamic Digital Library
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-right">
                Topic Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Tafsir, Hadith, Fiqh"
                className="border-gray-300 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-right">
                Description (optional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this topic category"
                className="border-gray-300 focus-visible:ring-emerald-500"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Topic
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
