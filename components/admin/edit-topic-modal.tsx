"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Topic } from "@/types/topics"

interface EditTopicModalProps {
  isOpen: boolean
  onClose: () => void
  topic: Topic
  onEditTopic: (topic: Topic) => void
}

export function EditTopicModal({ isOpen, onClose, topic, onEditTopic }: EditTopicModalProps) {
  const [name, setName] = useState(topic.name)
  const [description, setDescription] = useState(topic.description)
  const [error, setError] = useState("")

  // Update form when topic changes
  useEffect(() => {
    setName(topic.name)
    setDescription(topic.description)
    setError("")
  }, [topic])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Topic name is required")
      return
    }

    onEditTopic({
      ...topic,
      name: name.trim(),
    description: description?.trim(),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Edit Topic</DialogTitle>
            <DialogDescription className="text-center">Update the details for this topic category</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name" className="text-right">
                Topic Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                className="border-gray-300 focus-visible:ring-emerald-500"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description" className="text-right">
                Description (optional)
              </Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
