"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import SearchFilters from "@/components/search/search-filters"
import { Badge } from "@/components/ui/badge"

interface MobileFilterDrawerProps {
  activeFilters: {
    scholars: string[]
    topics: string[]
    languages: string[]
    timePeriod: string
    categories: string[]
  }
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      scholars: string[]
      topics: string[]
      languages: string[]
      timePeriod: string
      categories: string[]
    }>
  >
}

export default function MobileFilterDrawer({ activeFilters, setActiveFilters }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false)

  // Count active filters
  const activeFilterCount =
    activeFilters.scholars.length +
    activeFilters.topics.length +
    activeFilters.languages.length +
    (activeFilters.timePeriod ? 1 : 0) +
    activeFilters.categories.length

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-emerald-200 dark:border-emerald-800"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge className="ml-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
        <div className="h-full overflow-y-auto p-6 bg-[#f8f5f0] dark:bg-gray-900">
          <SearchFilters
            isMobile={true}
            onClose={() => setOpen(false)}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
