"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Bold, Italic, List, ListOrdered, Quote, LinkIcon, ImageIcon, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ReplyForm() {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Submitting reply:", content)
    // Reset form after submission
    setContent("")
  }

  const insertFormatting = (format: string) => {
    let prefix = ""
    let suffix = ""
    let placeholder = ""

    switch (format) {
      case "bold":
        prefix = "**"
        suffix = "**"
        placeholder = "bold text"
        break
      case "italic":
        prefix = "*"
        suffix = "*"
        placeholder = "italic text"
        break
      case "list":
        prefix = "\n- "
        suffix = ""
        placeholder = "list item"
        break
      case "ordered-list":
        prefix = "\n1. "
        suffix = ""
        placeholder = "list item"
        break
      case "quote":
        prefix = "> "
        suffix = ""
        placeholder = "quoted text"
        break
      case "link":
        prefix = "["
        suffix = "](https://example.com)"
        placeholder = "link text"
        break
      case "image":
        prefix = "!["
        suffix = "](https://example.com/image.jpg)"
        placeholder = "image description"
        break
      default:
        break
    }

    const textarea = document.getElementById("reply-content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const text = selectedText || placeholder

    const newContent = content.substring(0, start) + prefix + text + suffix + content.substring(end)

    setContent(newContent)

    // Focus back on textarea and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + prefix.length + text.length + suffix.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("bold")}
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("italic")}
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("ordered-list")}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("quote")}
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quote</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("link")}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Link</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => insertFormatting("image")}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Image</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="ml-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => window.open("/forum/markdown-guide", "_blank")}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Markdown Help</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Textarea
          id="reply-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts or knowledge..."
          className="min-h-[200px] border-0 rounded-none focus-visible:ring-0 resize-y"
          required
        />

        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">You can use Markdown formatting</div>
          <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white">
            Post Reply
          </Button>
        </div>
      </div>
    </form>
  )
}
