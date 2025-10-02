"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, ChevronUp, X, Filter, User, Tag, Globe, Clock, BookText } from "lucide-react"
import { cn } from "@/lib/utils"
import FilterPattern from "@/components/search/filter-pattern"

interface SearchFiltersProps {
  className?: string
  isMobile?: boolean
  onClose?: () => void
  activeFilters: {
    scholars: string[]
    topics: string[]
    languages: string[]
    timePeriod: string
    categories: string[]
  }
  setActiveFilters: (filters: {
    scholars: string[]
    topics: string[]
    languages: string[]
    timePeriod: string
    categories: string[]
  }) => void
}

export default function SearchFilters({
  className,
  isMobile = false,
  onClose,
  activeFilters,
  setActiveFilters,
}: SearchFiltersProps) {
  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    scholars: true,
    topics: true,
    languages: true,
    timePeriod: true,
    categories: true,
  })

  // Toggle a section's open state
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      scholars: [],
      topics: [],
      languages: [],
      timePeriod: "",
      categories: [],
    })
  }

  // Count active filters
  const activeFilterCount =
    activeFilters.scholars.length +
    activeFilters.topics.length +
    activeFilters.languages.length +
    (activeFilters.timePeriod ? 1 : 0) +
    activeFilters.categories.length

  // Toggle a checkbox filter
  const toggleFilter = (type: "scholars" | "topics" | "languages" | "categories", value: string) => {
    setActiveFilters({
      ...activeFilters,
      [type]: activeFilters[type].includes(value)
        ? activeFilters[type].filter((item) => item !== value)
        : [...activeFilters[type], value],
    })
  }

  // Set a radio filter
  const setRadioFilter = (type: "timePeriod", value: string) => {
    setActiveFilters({
      ...activeFilters,
      [type]: activeFilters[type] === value ? "" : value,
    })
  }

  // Sample data for filters
  const scholarOptions = [
    { id: "imam-ghazali", name: "Imam Al-Ghazali" },
    { id: "ibn-taymiyyah", name: "Ibn Taymiyyah" },
    { id: "imam-malik", name: "Imam Malik" },
    { id: "ibn-kathir", name: "Ibn Kathir" },
    { id: "imam-bukhari", name: "Imam Bukhari" },
    { id: "imam-nawawi", name: "Imam An-Nawawi" },
    { id: "ibn-qayyim", name: "Ibn Qayyim Al-Jawziyyah" },
    { id: "imam-shafi", name: "Imam Ash-Shafi'i" },
  ]

  const topicOptions = [
    { id: "tafsir", name: "Tafsir" },
    { id: "fiqh", name: "Fiqh" },
    { id: "seerah", name: "Seerah" },
    { id: "aqeedah", name: "Aqeedah" },
    { id: "hadith", name: "Hadith Sciences" },
    { id: "tasawwuf", name: "Tasawwuf" },
    { id: "usul", name: "Usul" },
    { id: "arabic", name: "Arabic Grammar" },
  ]

  const languageOptions = [
    { id: "arabic", name: "Arabic" },
    { id: "english", name: "English" },
    { id: "urdu", name: "Urdu" },
    { id: "turkish", name: "Turkish" },
    { id: "malay", name: "Malay" },
    { id: "french", name: "French" },
    { id: "spanish", name: "Spanish" },
  ]

  const timePeriodOptions = [
    { id: "classical", name: "Classical (7th-13th century)" },
    { id: "medieval", name: "Medieval (13th-18th century)" },
    { id: "modern", name: "Modern (18th-20th century)" },
    { id: "contemporary", name: "Contemporary (20th century-present)" },
  ]

  const categoryOptions = [
    { id: "quran", name: "Quran" },
    { id: "hadith", name: "Hadith" },
    { id: "history", name: "Islamic History" },
    { id: "biography", name: "Biography" },
    { id: "philosophy", name: "Philosophy" },
    { id: "modern-issues", name: "Modern Issues" },
    { id: "spirituality", name: "Spirituality" },
    { id: "comparative", name: "Comparative Religion" },
  ]

  // Filter section component
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

  const content = (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <FilterPattern />
      </div>

      <div className="relative z-10">
        {/* Header with clear filters button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-emerald-700 dark:text-emerald-400" />
            <h3 className="font-medium text-lg text-emerald-900 dark:text-emerald-100">Filters</h3>
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
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
          {isMobile && onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="ml-2 h-8 w-8 p-0">
              <X className="h-5 w-5" />
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
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 pl-2 pr-1 py-1 flex items-center"
                >
                  {scholarOptions.find((s) => s.id === scholar)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilter("scholars", scholar)}
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 dark:text-emerald-400 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {activeFilters.topics.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 pl-2 pr-1 py-1 flex items-center"
                >
                  {topicOptions.find((t) => t.id === topic)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilter("topics", topic)}
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 dark:text-emerald-400 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {activeFilters.languages.map((language) => (
                <Badge
                  key={language}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 pl-2 pr-1 py-1 flex items-center"
                >
                  {languageOptions.find((l) => l.id === language)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilter("languages", language)}
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 dark:text-emerald-400 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {activeFilters.timePeriod && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 pl-2 pr-1 py-1 flex items-center"
                >
                  {timePeriodOptions.find((t) => t.id === activeFilters.timePeriod)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRadioFilter("timePeriod", activeFilters.timePeriod)}
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 dark:text-emerald-400 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {activeFilters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 pl-2 pr-1 py-1 flex items-center"
                >
                  {categoryOptions.find((c) => c.id === category)?.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilter("categories", category)}
                    className="h-4 w-4 p-0 ml-1 text-emerald-700 dark:text-emerald-400 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4 bg-emerald-200/50 dark:bg-emerald-800/50" />

        {/* Scholar filter */}
        <FilterSection title="Scholar" section="scholars" icon={<User className="h-4 w-4" />}>
          <Select>
            <SelectTrigger className="w-full border-emerald-200 dark:border-emerald-800">
              <SelectValue placeholder="Select scholars" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Classical Scholars</SelectLabel>
                {scholarOptions.slice(0, 5).map((scholar) => (
                  <SelectItem key={scholar.id} value={scholar.id} onSelect={() => toggleFilter("scholars", scholar.id)}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`scholar-${scholar.id}`}
                        checked={activeFilters.scholars.includes(scholar.id)}
                        className="mr-2 data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                      />
                      {scholar.name}
                    </div>
                  </SelectItem>
                ))}
                <SelectLabel className="mt-2">Later Scholars</SelectLabel>
                {scholarOptions.slice(5).map((scholar) => (
                  <SelectItem key={scholar.id} value={scholar.id} onSelect={() => toggleFilter("scholars", scholar.id)}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`scholar-${scholar.id}`}
                        checked={activeFilters.scholars.includes(scholar.id)}
                        className="mr-2 data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                      />
                      {scholar.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-2">
            {scholarOptions.slice(0, 4).map((scholar) => (
              <div key={scholar.id} className="flex items-center">
                <Checkbox
                  id={`scholar-list-${scholar.id}`}
                  checked={activeFilters.scholars.includes(scholar.id)}
                  onCheckedChange={() => toggleFilter("scholars", scholar.id)}
                  className="data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                />
                <Label
                  htmlFor={`scholar-list-${scholar.id}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {scholar.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator className="my-4 bg-emerald-200/50 dark:bg-emerald-800/50" />

        {/* Topic filter */}
        <FilterSection title="Topic" section="topics" icon={<Tag className="h-4 w-4" />}>
          <div className="flex flex-wrap gap-2">
            {topicOptions.map((topic) => (
              <Badge
                key={topic.id}
                variant="outline"
                className={cn(
                  "cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
                  activeFilters.topics.includes(topic.id)
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700"
                    : "bg-white dark:bg-gray-800",
                )}
                onClick={() => toggleFilter("topics", topic.id)}
              >
                {topic.name}
              </Badge>
            ))}
          </div>
        </FilterSection>

        <Separator className="my-4 bg-emerald-200/50 dark:bg-emerald-800/50" />

        {/* Language filter */}
        <FilterSection title="Language" section="languages" icon={<Globe className="h-4 w-4" />}>
          <div className="grid grid-cols-2 gap-2">
            {languageOptions.map((language) => (
              <div key={language.id} className="flex items-center">
                <Checkbox
                  id={`language-${language.id}`}
                  checked={activeFilters.languages.includes(language.id)}
                  onCheckedChange={() => toggleFilter("languages", language.id)}
                  className="data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                />
                <Label
                  htmlFor={`language-${language.id}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {language.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator className="my-4 bg-emerald-200/50 dark:bg-emerald-800/50" />

        {/* Time Period filter */}
        <FilterSection title="Time Period" section="timePeriod" icon={<Clock className="h-4 w-4" />}>
          <RadioGroup
            value={activeFilters.timePeriod}
            onValueChange={(value) => setRadioFilter("timePeriod", value)}
            className="space-y-2"
          >
            {timePeriodOptions.map((period) => (
              <div key={period.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={period.id}
                  id={`time-${period.id}`}
                  className="text-emerald-700 border-emerald-700 data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                />
                <Label
                  htmlFor={`time-${period.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {period.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        <Separator className="my-4 bg-emerald-200/50 dark:bg-emerald-800/50" />

        {/* Category filter */}
        <FilterSection title="Category" section="categories" icon={<BookText className="h-4 w-4" />}>
          <div className="space-y-2">
            {categoryOptions.map((category) => (
              <div key={category.id} className="flex items-center">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={activeFilters.categories.includes(category.id)}
                  onCheckedChange={() => toggleFilter("categories", category.id)}
                  className="data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )

  return content
}
