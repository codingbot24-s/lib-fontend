"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, X, Filter, User, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopicBookFiltersProps {
  className?: string
  activeFilters: {
    scholars: string[]
    languages: string[]
  }
  setActiveFilters: (filters: any) => void
}

export function TopicBookFilters({
  className,
  activeFilters,
  setActiveFilters,
}: TopicBookFiltersProps) {
  const [openSections, setOpenSections] = useState({
    scholars: true,
    languages: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({
      scholars: [],
      languages: [],
    })
  }

  const activeFilterCount = activeFilters.scholars.length + activeFilters.languages.length

  const toggleFilter = (type: "scholars" | "languages", value: string) => {
    setActiveFilters({
      ...activeFilters,
      [type]: activeFilters[type].includes(value)
        ? activeFilters[type].filter((item) => item !== value)
        : [...activeFilters[type], value],
    })
  }

  const scholarOptions = [
    { id: "imam-ghazali", name: "Imam Al-Ghazali" },
    { id: "ibn-taymiyyah", name: "Ibn Taymiyyah" },
    { id: "imam-malik", name: "Imam Malik" },
    { id: "ibn-kathir", name: "Ibn Kathir" },
  ]

  const languageOptions = [
    { id: "arabic", name: "Arabic" },
    { id: "english", name: "English" },
    { id: "urdu", name: "Urdu" },
    { id: "turkish", name: "Turkish" },
  ]

  const FilterSection = ({
    title,
    section,
    icon,
    children,
  }: {
    title: string
    section: keyof typeof openSections
    icon: React.ReactNode
    children: React.ReactNode
  }) => (
    <Collapsible open={openSections[section]} className="w-full">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger
          onClick={() => toggleSection(section)}
          className="flex items-center w-full py-2 text-left font-medium text-emerald-900 dark:text-emerald-100"
        >
          <div className="flex items-center">
            <div className="mr-2 text-emerald-700 dark:text-emerald-400">{icon}</div>
            <span>{title}</span>
          </div>
          {openSections[section] ? (
            <ChevronUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          )}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-2 pb-4">{children}</CollapsibleContent>
    </Collapsible>
  )

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg border p-4", className)}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-emerald-700 dark:text-emerald-400" />
            <h3 className="font-medium text-lg text-emerald-900 dark:text-emerald-100">Filters</h3>
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-emerald-100 text-emerald-800">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-emerald-700 dark:text-emerald-400 h-8 px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Active filters */}
        {activeFilterCount > 0 && (
          <div className="mb-4">
            <div className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.scholars.map((scholar) => (
                <Badge
                  key={scholar}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 pl-2 pr-1 py-1 flex items-center"
                >
                  {scholarOptions.find((s) => s.id === scholar)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilter("scholars", scholar)}
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {activeFilters.languages.map((language) => (
                <Badge
                  key={language}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 pl-2 pr-1 py-1 flex items-center"
                >
                  {languageOptions.find((l) => l.id === language)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilter("languages", language)}
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Scholar filter */}
        <FilterSection title="Scholar" section="scholars" icon={<User className="h-4 w-4" />}>
          <div className="space-y-2">
            {scholarOptions.map((scholar) => (
              <div key={scholar.id} className="flex items-center">
                <Checkbox
                  id={`scholar-${scholar.id}`}
                  checked={activeFilters.scholars.includes(scholar.id)}
                  onCheckedChange={() => toggleFilter("scholars", scholar.id)}
                  className="data-[state=checked]:bg-emerald-700"
                />
                <Label
                  htmlFor={`scholar-${scholar.id}`}
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  {scholar.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator className="my-4" />

        {/* Language filter */}
        <FilterSection title="Language" section="languages" icon={<Globe className="h-4 w-4" />}>
          <div className="grid grid-cols-2 gap-2">
            {languageOptions.map((language) => (
              <div key={language.id} className="flex items-center">
                <Checkbox
                  id={`language-${language.id}`}
                  checked={activeFilters.languages.includes(language.id)}
                  onCheckedChange={() => toggleFilter("languages", language.id)}
                  className="data-[state=checked]:bg-emerald-700"
                />
                <Label
                  htmlFor={`language-${language.id}`}
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  {language.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )
}