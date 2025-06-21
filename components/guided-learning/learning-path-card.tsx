"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface LearningPathCardProps {
  path: {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    color: string
    level: string
    modules: number
    estimatedTime: string
  }
}

export default function LearningPathCard({ path }: LearningPathCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Map color names to Tailwind classes
  const colorMap = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-black",
      hoverBg: "bg-emerald-100 dark:bg-black",
      border: "border-emerald-200 dark:border-gray-600",
      icon: "text-emerald-600 dark:text-white",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-gray-700 dark:text-white",
    },
    teal: {
      bg: "bg-teal-50 dark:bg-black",
      hoverBg: "bg-teal-100 dark:bg-black",
      border: "border-teal-200 dark:border-gray-600",
      icon: "text-teal-600 dark:text-white",
      badge: "bg-teal-100 text-teal-800 dark:bg-gray-700 dark:text-white",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-black",
      hoverBg: "bg-cyan-100 dark:bg-black",
      border: "border-cyan-200 dark:border-gray-600",
      icon: "text-cyan-600 dark:text-white",
      badge: "bg-cyan-100 text-cyan-800 dark:bg-gray-700 dark:text-white",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-black",
      hoverBg: "bg-blue-100 dark:bg-black",
      border: "border-blue-200 dark:border-gray-600",
      icon: "text-blue-600 dark:text-white",
      badge: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-white",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-black",
      hoverBg: "bg-indigo-100 dark:bg-black",
      border: "border-indigo-200 dark:border-gray-600",
      icon: "text-indigo-600 dark:text-white",
      badge: "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-white",
    },
    violet: {
      bg: "bg-violet-50 dark:bg-black",
      hoverBg: "bg-violet-100 dark:bg-black",
      border: "border-violet-200 dark:border-gray-600",
      icon: "text-violet-600 dark:text-white",
      badge: "bg-violet-100 text-violet-800 dark:bg-gray-700 dark:text-white",
    },
  }

  const colorClasses = colorMap[path.color as keyof typeof colorMap] || colorMap.emerald

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 border",
        colorClasses.border,
        isHovered ? `${colorClasses.hoverBg} shadow-lg transform -translate-y-1` : `${colorClasses.bg} shadow-md`,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-3 rounded-full transition-colors",
              isHovered ? "bg-white dark:bg-black" : "bg-white/80 dark:bg-black/80",
              colorClasses.icon,
            )}
          >
            {path.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{path.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{path.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={colorClasses.badge}>
                {path.level}
              </Badge>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>{path.modules} modules</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>{path.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button
          asChild
          className={cn(
            "transition-colors",
            isHovered
              ? "bg-emerald-700 hover:bg-emerald-800 text-white"
              : "bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-200 dark:bg-black dark:hover:bg-gray-900 dark:text-white dark:border-gray-600",
          )}
        >
          <Link href={`/learning-paths/${path.id}`}>
            Start Learning
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
