import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, X } from "lucide-react"

interface SidebarProps {
  selectedLanguages: string[]
  selectedTopics: string[]
  selectedScholars: string[]
  onLanguagesChange: (languages: string[]) => void
  onTopicsChange: (topics: string[]) => void
  onScholarsChange: (scholars: string[]) => void
  onClearFilters: () => void
  hideTopicFilter?: boolean
}


// TODO: (saad) -> this will be fethced from db
const languages = ["Arabic", "English", "Urdu", "Persian", "Turkish"]
const scholars = [
  "Ibn Kathir",
  "Imam Al-Ghazali",
  "Ibn Taymiyyah",
  "Imam An-Nawawi",
  "Ibn Al-Qayyim",
  "Imam Bukhari",
  "Imam Muslim",
  "Imam Abu Hanifa",
  "Imam Malik",
  "Imam Shafi'i",
]

export default function ResponsiveLibrarySidebar({
  selectedLanguages,
  selectedScholars,
  onLanguagesChange,
  onScholarsChange,
  onClearFilters,
}: SidebarProps) {
  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguagesChange(selectedLanguages.filter((l) => l !== language))
    } else {
      onLanguagesChange([...selectedLanguages, language])
    }
  }

  const handleScholarToggle = (scholar: string) => {
    if (selectedScholars.includes(scholar)) {
      onScholarsChange(selectedScholars.filter((s) => s !== scholar))
    } else {
      onScholarsChange([...selectedScholars, scholar])
    }
  }

  const hasActiveFilters = selectedLanguages.length > 0 || selectedScholars.length > 0

  return (
    <div className="space-y-6">
      {/* Header with Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Filter className="h-4 w-4" />
            Active Filters
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      {/* Language Filter */}
      <div className="space-y-4">
        <Label className="text-base">Language</Label>
        <ScrollArea className="h-[180px]">
          <div className="space-y-2">
            {languages.map((language) => (
              <Button
                key={language}
                variant="ghost"
                size="sm"
                onClick={() => handleLanguageToggle(language)}
                className={`w-full justify-start ${
                  selectedLanguages.includes(language)
                    ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-100"
                    : ""
                }`}
              >
                <span className="mr-2">{selectedLanguages.includes(language) ? "✓" : ""}</span>
                {language}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Scholar Filter */}
      <div className="space-y-4">
        <Label className="text-base">Scholar</Label>
        <ScrollArea className="h-[240px]">
          <div className="space-y-2">
            {scholars.map((scholar) => (
              <Button
                key={scholar}
                variant="ghost"
                size="sm"
                onClick={() => handleScholarToggle(scholar)}
                className={`w-full justify-start ${
                  selectedScholars.includes(scholar)
                    ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-100"
                    : ""
                }`}
              >
                <span className="mr-2">{selectedScholars.includes(scholar) ? "✓" : ""}</span>
                {scholar}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}