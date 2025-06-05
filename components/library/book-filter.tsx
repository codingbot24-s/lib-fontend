"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface BookFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
}

interface FilterOptions {
  language?: string
  scholar?: string
}

const languages = [
  { label: "All Languages", value: "" },
  { label: "Arabic", value: "arabic" },
  { label: "English", value: "english" },
  { label: "Urdu", value: "urdu" },
]

export function BookFilters({ onFilterChange }: BookFiltersProps) {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState("")

  const handleLanguageSelect = (value: string) => {
    setLanguage(value)
    setOpen(false)
    onFilterChange({ language: value })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full sm:w-[200px] justify-between"
          >
            {language
              ? languages.find((lang) => lang.value === language)?.label
              : "Select Language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={handleLanguageSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      language === lang.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {lang.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}