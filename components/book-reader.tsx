"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Search,
  Share2,
  Highlighter,
  StickyNote,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BookReader() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(253)
  const [fontSize, setFontSize] = useState(16)
  const [nightMode, setNightMode] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const toggleNightMode = () => {
    setNightMode(!nightMode)
  }

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 1)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Reader toolbar */}
      <div className={`p-4 border-b ${nightMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={currentPage === 1}
              className={nightMode ? "border-gray-700 text-gray-300" : ""}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className={`text-sm ${nightMode ? "text-gray-300" : "text-gray-700"}`}>
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={nightMode ? "border-gray-700 text-gray-300" : ""}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleBookmark}
                    className={isBookmarked ? "text-gold-500" : nightMode ? "text-gray-300" : ""}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bookmark this page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleNightMode}
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    {nightMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle night mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 12}
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Decrease font size</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseFontSize}
                    disabled={fontSize >= 24}
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Increase font size</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search in book</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    <Highlighter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Highlight text</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    <StickyNote className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add note</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={nightMode ? "text-gray-300" : ""}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
\
