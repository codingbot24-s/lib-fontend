"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Scroll,
  Scale,
  Star,
  Library,
  BookMarked,
  BookText,
  Book,
  FileText,
  Globe,
  Landmark,
  Brain,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type Topic = {
  id: number
  name: string
  description?: string
}

interface AllApiTopicResponse {
  topics: Topic[]
}

// Array of book-related icons
const bookIcons = [
  BookOpen,
  BookMarked,
  BookText,
  Book,
  FileText,
  Globe,
  Landmark,
  Brain,
  Calendar,
  Scroll,
  Scale,
  Library,
];

// Function to get a random icon for a topic
const getRandomIcon = (topicId: number) => {
  const index = topicId % bookIcons.length;
  return bookIcons[index];
};

export default function IslamicLibraryGrid() {
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get<AllApiTopicResponse>(
          `${BACKEND_URL}/api/topics`
        );
        setTopics(response.data.topics);
      }
      catch {
        console.error("Failed to fetch topics");
      }
    }
    fetchTopics();
  }, [])

  return (
    <div className="container mx-auto px-4 space-y-12">
      {/* Featured Quote */}
      <div className="text-center bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <blockquote className="text-xl sm:text-2xl font-serif italic text-gray-700 dark:text-white mb-4">
          &quot;اطلبوا العلم من المهد إلى اللحد&quot;
        </blockquote>
        <p className="text-lg font-serif text-gray-600 dark:text-gray-300">
          &quot;Seek knowledge from the cradle to the grave&quot;
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Star className="h-4 w-4 text-amber-500 fill-current" />
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Islamic Wisdom
          </span>
          <Star className="h-4 w-4 text-amber-500 fill-current" />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {topics.map((topic) => {
          const IconComponent = getRandomIcon(topic.id);
          return (
            <Link
              key={topic.id}
              href={`/library/topic/${topic.id}`}
              className="group block"
            >
              <div
                className={`
                  relative aspect-[3/4] rounded-xl border-2 
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:scale-103
                  shadow-lg hover:shadow-2xl 
                  bg-gradient-to-br from-white/90 to-white/70 dark:from-black/90 dark:to-black/70
                  backdrop-blur-sm overflow-hidden
                  book-spine-effect
                `}
              >
                {/* Content */}
                <div className="relative z-10 p-4 lg:p-3 h-full flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="space-y-3">
                    {/* Icon */}
                    <div className="w-12 h-12 lg:w-10 lg:h-10 bg-emerald-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 lg:h-5 lg:w-5 text-emerald-700 dark:text-white" />
                    </div>

                    {/* Title */}
                    <div className="text-center">
                      <h4 className="text-lg lg:text-base font-serif font-semibold text-gray-700 dark:text-white">
                        {topic.name}
                      </h4>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="text-center">
                    <p className="text-sm lg:text-xs font-serif text-gray-600 dark:text-gray-300 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-2">
                    <div className="text-center">
                      <Badge
                        className="bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-white border-0 
                          font-serif font-medium px-3 py-0.5 text-xs lg:text-[10px] shadow-md
                          group-hover:shadow-lg transition-shadow duration-300"
                      >
                        View Books
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 shadow-inner"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
