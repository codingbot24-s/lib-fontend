"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface ForumTabsProps {
  categories: {
    id: string
    name: string
  }[]
}

export default function ForumTabs({ categories }: ForumTabsProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <Tabs defaultValue="all" className="w-full sm:w-auto overflow-x-auto" onValueChange={setActiveCategory}>
      <TabsList className="h-auto p-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeCategory === category.id
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
