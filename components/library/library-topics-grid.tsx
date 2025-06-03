"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BookOpen,
  Scroll,
  Scale,
  User,
  Heart,
  Clock,
  Volume2,
  Sparkles,
  Languages,
  HandIcon as Hands,
} from "lucide-react"

const topics = [
  {
    id: "tafsir",
    name: "Tafsir",
    description: "Quranic Commentary",
    icon: BookOpen,
    count: 134,
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-900/20",
    darkTextColor: "dark:text-emerald-400",
  },
  {
    id: "hadith",
    name: "Hadith",
    description: "Prophetic Traditions",
    icon: Scroll,
    count: 189,
    color: "bg-amber-500",
    hoverColor: "hover:bg-amber-600",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-900/20",
    darkTextColor: "dark:text-amber-400",
  },
  {
    id: "fiqh",
    name: "Fiqh",
    description: "Islamic Jurisprudence",
    icon: Scale,
    count: 156,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    darkBgColor: "dark:bg-blue-900/20",
    darkTextColor: "dark:text-blue-400",
  },
  {
    id: "seerah",
    name: "Seerah",
    description: "Prophetic Biography",
    icon: User,
    count: 98,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
    darkBgColor: "dark:bg-purple-900/20",
    darkTextColor: "dark:text-purple-400",
  },
  {
    id: "aqeedah",
    name: "Aqeedah",
    description: "Islamic Creed",
    icon: Heart,
    count: 87,
    color: "bg-rose-500",
    hoverColor: "hover:bg-rose-600",
    textColor: "text-rose-700",
    bgColor: "bg-rose-50",
    darkBgColor: "dark:bg-rose-900/20",
    darkTextColor: "dark:text-rose-400",
  },
  {
    id: "history",
    name: "History",
    description: "Islamic History",
    icon: Clock,
    count: 65,
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    darkBgColor: "dark:bg-orange-900/20",
    darkTextColor: "dark:text-orange-400",
  },
  {
    id: "quran",
    name: "Quran",
    description: "Holy Quran",
    icon: Volume2,
    count: 234,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    darkBgColor: "dark:bg-green-900/20",
    darkTextColor: "dark:text-green-400",
  },
  {
    id: "tasawwuf",
    name: "Tasawwuf",
    description: "Islamic Spirituality",
    icon: Sparkles,
    count: 76,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
    textColor: "text-indigo-700",
    bgColor: "bg-indigo-50",
    darkBgColor: "dark:bg-indigo-900/20",
    darkTextColor: "dark:text-indigo-400",
  },
  {
    id: "arabic-language",
    name: "Arabic Language",
    description: "Language Studies",
    icon: Languages,
    count: 54,
    color: "bg-teal-500",
    hoverColor: "hover:bg-teal-600",
    textColor: "text-teal-700",
    bgColor: "bg-teal-50",
    darkBgColor: "dark:bg-teal-900/20",
    darkTextColor: "dark:text-teal-400",
  },
  {
    id: "dua",
    name: "Dua",
    description: "Supplications",
    icon: Hands,
    count: 43,
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600",
    textColor: "text-cyan-700",
    bgColor: "bg-cyan-50",
    darkBgColor: "dark:bg-cyan-900/20",
    darkTextColor: "dark:text-cyan-400",
  },
]

export default function LibraryTopicsGrid() {
  return (
    <div className="space-y-8">
      {/* Stats Summary */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            {topics.reduce((sum, topic) => sum + topic.count, 0).toLocaleString()}
          </span>{" "}
          books across <span className="font-semibold text-emerald-700 dark:text-emerald-400">{topics.length}</span>{" "}
          categories
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic) => {
          const IconComponent = topic.icon
          return (
            <Link key={topic.id} href={`/library/${topic.id}`}>
              <Card
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-gray-200 dark:border-gray-700 ${topic.bgColor} ${topic.darkBgColor} hover:border-gray-300 dark:hover:border-gray-600`}
              >
                <CardContent className="p-8 text-center space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto rounded-full ${topic.color} ${topic.hoverColor} flex items-center justify-center transition-colors duration-300 group-hover:scale-110 transform`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Topic Name */}
                  <h3
                    className={`text-xl font-bold ${topic.textColor} ${topic.darkTextColor} group-hover:scale-105 transform transition-transform duration-300`}
                  >
                    {topic.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{topic.description}</p>

                  {/* Book Count */}
                  <Badge
                    variant="secondary"
                    className={`${topic.bgColor} ${topic.textColor} ${topic.darkBgColor} ${topic.darkTextColor} border-0 font-semibold`}
                  >
                    {topic.count.toLocaleString()} books
                  </Badge>

                  {/* Hover Effect Indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Click to explore →</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center pt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Use our advanced search to find specific books, authors, or topics across our entire collection.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
          >
            <BookOpen className="h-4 w-4" />
            Advanced Search
          </Link>
        </div>
      </div>
    </div>
  )
}
