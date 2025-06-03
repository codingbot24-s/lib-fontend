"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react"

interface ResponsiveLibrarySidebarProps {
  selectedLanguages: string[]
  selectedTopics: string[]
  selectedScholars: string[]
  onLanguagesChange: (languages: string[]) => void
  onTopicsChange: (topics: string[]) => void
  onScholarsChange: (scholars: string[]) => void
  onClearFilters: () => void
  hideTopicFilter?: boolean
}

const languages = [
  { id: "Arabic", name: "Arabic", count: 847 },
  { id: "English", name: "English", count: 324 },
  { id: "Urdu", name: "Urdu", count: 76 },
  { id: "French", name: "French", count: 23 },
  { id: "Spanish", name: "Spanish", count: 12 },
]

const topics = [
  { id: "Quran", name: "Quran", count: 234 },
  { id: "Hadith", name: "Hadith", count: 189 },
  { id: "Fiqh", name: "Fiqh", count: 156 },
  { id: "Tafsir", name: "Tafsir", count: 134 },
  { id: "Seerah", name: "Seerah", count: 98 },
  { id: "Aqeedah", name: "Aqeedah", count: 87 },
  { id: "Tasawwuf", name: "Tasawwuf", count: 76 },
  { id: "History", name: "Islamic History", count: 65 },
  { id: "Arabic Language", name: "Arabic Language", count: 54 },
  { id: "Dua", name: "Dua", count: 43 },
]

const scholars = [
  { id: "Ibn Taymiyyah", name: "Ibn Taymiyyah", count: 45 },
  { id: "Imam An-Nawawi", name: "Imam An-Nawawi", count: 38 },
  { id: "Imam Al-Ghazali", name: "Imam Al-Ghazali", count: 32 },
  { id: "Ibn Kathir", name: "Ibn Kathir", count: 29 },
  { id: "Imam Bukhari", name: "Imam Bukhari", count: 25 },
  { id: "Imam Malik", name: "Imam Malik", count: 23 },
  { id: "Hamza Yusuf", name: "Hamza Yusuf", count: 18 },
  { id: "Abdullah Yusuf Ali", name: "Abdullah Yusuf Ali", count: 15 },
  { id: "Safiur-Rahman Al-Mubarakpuri", name: "Safiur-Rahman Al-Mubarakpuri", count: 12 },
  { id: "Hamza Andreas Tzortzis", name: "Hamza Andreas Tzortzis", count: 8 },
]

export default function ResponsiveLibrarySidebar({
  selectedLanguages,
  selectedTopics,
  selectedScholars,
  onLanguagesChange,
  onTopicsChange,
  onScholarsChange,
  onClearFilters,
  hideTopicFilter = false,
}: ResponsiveLibrarySidebarProps) {
  const [scholarSearch, setScholarSearch] = useState("")
  const [languageOpen, setLanguageOpen] = useState(true)
  const [topicOpen, setTopicOpen] = useState(true)
  const [scholarOpen, setScholarOpen] = useState(true)

  const filteredScholars = scholars.filter((scholar) =>
    scholar.name.toLowerCase().includes(scholarSearch.toLowerCase()),
  )

  const handleLanguageChange = (languageId: string, checked: boolean) => {
    if (checked) {
      onLanguagesChange([...selectedLanguages, languageId])
    } else {
      onLanguagesChange(selectedLanguages.filter((id) => id !== languageId))
    }
  }

  const handleTopicChange = (topicId: string, checked: boolean) => {
    if (checked) {
      onTopicsChange([...selectedTopics, topicId])
    } else {
      onTopicsChange(selectedTopics.filter((id) => id !== topicId))
    }
  }

  const handleScholarChange = (scholarId: string, checked: boolean) => {
    if (checked) {
      onScholarsChange([...selectedScholars, scholarId])
    } else {
      onScholarsChange(selectedScholars.filter((id) => id !== scholarId))
    }
  }

  const totalActiveFilters = selectedLanguages.length + selectedTopics.length + selectedScholars.length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
          {totalActiveFilters > 0 && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            >
              {totalActiveFilters}
            </Badge>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs sm:text-sm"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Language Filter */}
      <Card>
        <Collapsible open={languageOpen} onOpenChange={setLanguageOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Language</CardTitle>
                {languageOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3 pt-0">
              {languages.map((language) => (
                <div key={language.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`language-${language.id}`}
                      checked={selectedLanguages.includes(language.id)}
                      onCheckedChange={(checked) => handleLanguageChange(language.id, checked as boolean)}
                    />
                    <Label
                      htmlFor={`language-${language.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {language.name}
                    </Label>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{language.count}</span>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Topic Filter - conditionally rendered */}
      {!hideTopicFilter && (
        <Card>
          <Collapsible open={topicOpen} onOpenChange={setTopicOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Topic</CardTitle>
                  {topicOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-0">
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {topics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic.id}`}
                          checked={selectedTopics.includes(topic.id)}
                          onCheckedChange={(checked) => handleTopicChange(topic.id, checked as boolean)}
                        />
                        <Label
                          htmlFor={`topic-${topic.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {topic.name}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{topic.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}

      {/* Scholar Filter */}
      <Card>
        <Collapsible open={scholarOpen} onOpenChange={setScholarOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Scholar</CardTitle>
                {scholarOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3 pt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search scholars..."
                  value={scholarSearch}
                  onChange={(e) => setScholarSearch(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
                {scholarSearch && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setScholarSearch("")}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {filteredScholars.map((scholar) => (
                  <div key={scholar.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`scholar-${scholar.id}`}
                        checked={selectedScholars.includes(scholar.id)}
                        onCheckedChange={(checked) => handleScholarChange(scholar.id, checked as boolean)}
                      />
                      <Label
                        htmlFor={`scholar-${scholar.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {scholar.name}
                      </Label>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{scholar.count}</span>
                  </div>
                ))}
                {filteredScholars.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">No scholars found</p>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  )
}
