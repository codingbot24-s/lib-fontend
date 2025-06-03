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
} from "lucide-react";


// call apu api/books/topics=

const topics = [
  {
    id: "tafsir",
    name: "Tafsir",
    arabicName: "التفسير",
    description: "Quranic Commentary & Exegesis",
    icon: BookOpen,
    count: 134,
    gradient: "from-emerald-600 via-emerald-500 to-teal-500",
    bgPattern: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-700",
    hoverGlow: "hover:shadow-emerald-300/50 dark:hover:shadow-emerald-600/30",
    textColor: "text-emerald-800 dark:text-emerald-200",
    iconBg: "bg-emerald-100 dark:bg-emerald-800",
  },
  {
    id: "hadith",
    name: "Hadith",
    arabicName: "الحديث",
    description: "Prophetic Traditions & Sayings",
    icon: Scroll,
    count: 189,
    gradient: "from-amber-600 via-amber-500 to-orange-500",
    bgPattern: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-700",
    hoverGlow: "hover:shadow-amber-300/50 dark:hover:shadow-amber-600/30",
    textColor: "text-amber-800 dark:text-amber-200",
    iconBg: "bg-amber-100 dark:bg-amber-800",
  },
  {
    id: "fiqh",
    name: "Fiqh",
    arabicName: "الفقه",
    description: "Islamic Jurisprudence & Law",
    icon: Scale,
    count: 156,
    gradient: "from-blue-600 via-blue-500 to-indigo-500",
    bgPattern: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-700",
    hoverGlow: "hover:shadow-blue-300/50 dark:hover:shadow-blue-600/30",
    textColor: "text-blue-800 dark:text-blue-200",
    iconBg: "bg-blue-100 dark:bg-blue-800",
  },
  {
    id: "seerah",
    name: "Seerah",
    arabicName: "السيرة",
    description: "Prophetic Biography & History",
    icon: User,
    count: 98,
    gradient: "from-purple-600 via-purple-500 to-violet-500",
    bgPattern: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-700",
    hoverGlow: "hover:shadow-purple-300/50 dark:hover:shadow-purple-600/30",
    textColor: "text-purple-800 dark:text-purple-200",
    iconBg: "bg-purple-100 dark:bg-purple-800",
  },
  {
    id: "aqeedah",
    name: "Aqeedah",
    arabicName: "العقيدة",
    description: "Islamic Creed & Theology",
    icon: Heart,
    count: 87,
    gradient: "from-rose-600 via-rose-500 to-pink-500",
    bgPattern: "bg-rose-50 dark:bg-rose-900/20",
    borderColor: "border-rose-200 dark:border-rose-700",
    hoverGlow: "hover:shadow-rose-300/50 dark:hover:shadow-rose-600/30",
    textColor: "text-rose-800 dark:text-rose-200",
    iconBg: "bg-rose-100 dark:bg-rose-800",
  },
  {
    id: "history",
    name: "History",
    arabicName: "التاريخ",
    description: "Islamic History & Civilization",
    icon: Clock,
    count: 65,
    gradient: "from-orange-600 via-orange-500 to-red-500",
    bgPattern: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-700",
    hoverGlow: "hover:shadow-orange-300/50 dark:hover:shadow-orange-600/30",
    textColor: "text-orange-800 dark:text-orange-200",
    iconBg: "bg-orange-100 dark:bg-orange-800",
  },
  {
    id: "quran",
    name: "Quran",
    arabicName: "القرآن",
    description: "Holy Quran & Recitation",
    icon: Volume2,
    count: 234,
    gradient: "from-green-600 via-green-500 to-emerald-500",
    bgPattern: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-700",
    hoverGlow: "hover:shadow-green-300/50 dark:hover:shadow-green-600/30",
    textColor: "text-green-800 dark:text-green-200",
    iconBg: "bg-green-100 dark:bg-green-800",
  },
  {
    id: "tasawwuf",
    name: "Tasawwuf",
    arabicName: "التصوف",
    description: "Islamic Spirituality & Mysticism",
    icon: Sparkles,
    count: 76,
    gradient: "from-indigo-600 via-indigo-500 to-purple-500",
    bgPattern: "bg-indigo-50 dark:bg-indigo-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-700",
    hoverGlow: "hover:shadow-indigo-300/50 dark:hover:shadow-indigo-600/30",
    textColor: "text-indigo-800 dark:text-indigo-200",
    iconBg: "bg-indigo-100 dark:bg-indigo-800",
  },
];



export default function IslamicLibraryGrid() {
  return (
    <div className="space-y-12">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {topics.map((topic) => {
          const IconComponent = topic.icon;
          return (
            <Link
              key={topic.id}
              href={`/library/${topic.id}`}
              className="group block"
            >
              <div
                className={`
                  relative aspect-[3/4] rounded-xl border-2 ${topic.borderColor} ${topic.bgPattern}
                  transition-all duration-500 ease-out
                  hover:-translate-y-3 hover:scale-105
                  shadow-lg hover:shadow-2xl ${topic.hoverGlow}
                  bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-700/70
                  backdrop-blur-sm overflow-hidden
                  book-spine-effect
                `}
              >
                {/* Islamic Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20">
                  <div className="geometric-pattern"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="space-y-4">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${topic.iconBg} rounded-full flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${topic.textColor}`} />
                    </div>

                    {/* Arabic Title */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold font-arabic text-gray-800 dark:text-gray-200 mb-1 group-hover:scale-105 transition-transform duration-300">
                        {topic.arabicName}
                      </h3>
                      <h4 className="text-xl font-serif font-semibold text-gray-700 dark:text-gray-300">
                        {topic.name}
                      </h4>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="text-center">
                    <p className="text-sm font-serif text-gray-600 dark:text-gray-400 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-3">
                    {/* Book Count */}
                    <div className="text-center">
                      <Badge
                        className={`
                          bg-gradient-to-r ${topic.gradient} text-white border-0 
                          font-serif font-medium px-4 py-1 shadow-md
                          group-hover:shadow-lg transition-shadow duration-300
                        `}
                      >
                        {topic.count.toLocaleString()}
                      </Badge>
                    </div>

                    {/* Decorative Element */}
                    <div className="flex justify-center">
                      <div
                        className={`w-12 h-0.5 bg-gradient-to-r ${topic.gradient} rounded-full opacity-60`}
                      ></div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="text-xs font-serif text-gray-500 dark:text-gray-400">
                    
                      </p>
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
          );
        })}
      </div>
    </div>
  );
}
