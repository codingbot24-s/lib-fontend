"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Scroll,
  Scale,
  User,
  Heart,
  Clock,
  Volume2,
  Sparkles,
  Star,
  Crown,
  Library,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

type Topic = {
  id : number
  name : string
  description? : string
}

interface AllApiTopicResponse {
  topics : Topic[]
}


// TODO: Fetch all the topics from the API

export default function IslamicLibraryGrid() {
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get<AllApiTopicResponse>(
          "http://localhost:8000/api/topics"
        );
        setTopics(response.data.topics);
      }
      catch {
        console.error("Failed to fetch topics");
        
      }
    }
    fetchTopics();
  },[])

  return (
    <div className="container mx-auto px-4 space-y-12">
      {/* Featured Quote */}
      <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <blockquote className="text-xl sm:text-2xl font-serif italic text-gray-700 dark:text-gray-300 mb-4">
          "اطلبوا العلم من المهد إلى اللحد"
        </blockquote>
        <p className="text-lg font-serif text-gray-600 dark:text-gray-400">
          "Seek knowledge from the cradle to the grave"
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
        {topics.map((topic) => (
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
                bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-700/70
                backdrop-blur-sm overflow-hidden
                book-spine-effect
              `}
            >
              {/* Content */}
              <div className="relative z-10 p-4 lg:p-3 h-full flex flex-col justify-between">
                {/* Top Section */}
                <div className="space-y-3">
                  {/* Icon - smaller on desktop */}
                  {/* <div
                    className={`w-12 h-12 lg:w-10 lg:h-10 ${topic.iconBg} rounded-full flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`h-6 w-6 lg:h-5 lg:w-5 ${topic.textColor}`} />
                  </div> */}

                  {/* Arabic Title - adjusted text sizes */}
                  <div className="text-center">
                    {/* <h3 className="text-xl lg:text-lg font-bold font-arabic text-gray-800 dark:text-gray-200 mb-1 group-hover:scale-105 transition-transform duration-300">
                      {topic.arabicName}
                    </h3> */}
                    <h4 className="text-lg lg:text-base font-serif font-semibold text-gray-700 dark:text-gray-300">
                      {topic.name}
                    </h4>
                  </div>
                </div>

                {/* Middle Section - smaller text on desktop */}
                <div className="text-center">
                  <p className="text-sm lg:text-xs font-serif text-gray-600 dark:text-gray-400 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Bottom Section - adjusted badge size */}
                <div className="space-y-2">
                  <div className="text-center">
                    {/* <Badge
                      className={`
                        bg-gradient-to-r ${topic.gradient} text-white border-0 
                        font-serif font-medium px-3 py-0.5 text-xs lg:text-[10px] shadow-md
                        group-hover:shadow-lg transition-shadow duration-300
                      `}
                    >
                      {topic.count.toLocaleString()}
                    </Badge> */}
                  </div>
                </div>
              </div>

              {/* Book Spine Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 shadow-inner"></div>

              {/* Corner Decoration */}
              <div className="absolute top-4 right-4 opacity-20 dark:opacity-30">
                <Crown className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
