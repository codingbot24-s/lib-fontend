"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useState } from "react"

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("English")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("English")}>{language}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Arabic")}>العربية</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Urdu")}>اردو</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Bahasa")}>Bahasa Indonesia</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
