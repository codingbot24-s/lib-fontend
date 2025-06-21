"use client";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  ChevronRight,
  BookMarked,
  Calendar,
} from "lucide-react";
import BookCard from "@/components/book-card";
import RecentBooks from "@/components/recent-books";

import CategoryChip from "@/components/category-chip";
import AudioCard from "@/components/audio-card";
import QuranSection from "@/components/quran-section";
import PrayerTimesWidget from "@/components/prayer-times-widget";
import FeaturedQuote from "@/components/featured-quote";
import GuidedLearningPaths from "@/components/guided-learning/guided-learning-paths";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // Sample data for categories

  // Sample data for featured books
  const featuredBooks = [
    {
      id: 1,
      title: "The Sealed Nectar",
      author: "Safiur-Rahman Al-Mubarakpuri",
      coverUrl: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 2,
      title: "Riyadh as-Saliheen",
      author: "Imam An-Nawawi",
      coverUrl: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 3,
      title: "The Quran: English Translation",
      author: "Abdullah Yusuf Ali",
      coverUrl: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 4,
      title: "Ihya Ulum al-Din",
      author: "Imam Al-Ghazali",
      coverUrl: "/placeholder.svg?height=300&width=200",
    },
  ];

  // Sample data for popular books
  const popularBooks = [
    {
      id: 1,
      title: "Purification of the Heart",
      author: "Hamza Yusuf",
      coverUrl: "/placeholder.svg?height=400&width=300",
      description:
        "Signs, Symptoms and Cures of the Spiritual Diseases of the Heart",
    },
    {
      id: 2,
      title: "The Divine Reality",
      author: "Hamza Andreas Tzortzis",
      coverUrl: "/placeholder.svg?height=400&width=300",
      description: "God, Islam and the Mirage of Atheism",
    },
    {
      id: 3,
      title: "Muhammad: His Life Based on the Earliest Sources",
      author: "Martin Lings",
      coverUrl: "/placeholder.svg?height=400&width=300",
      description: "Acclaimed biography based on early sources",
    },
  ];

  // Sample data for audio content
  // const audioContent = [
  //   {
  //     id: 1,
  //     title: "The Life of Prophet Muhammad",
  //     speaker: "Sheikh Yasir Qadhi",
  //     duration: "45:23",
  //     imageUrl: "/placeholder.svg?height=200&width=350",
  //     category: "Seerah",
  //   },
  //   {
  //     id: 2,
  //     title: "Understanding Surah Al-Kahf",
  //     speaker: "Nouman Ali Khan",
  //     duration: "32:15",
  //     imageUrl: "/placeholder.svg?height=200&width=350",
  //     category: "Tafsir",
  //   },
  //   {
  //     id: 3,
  //     title: "The Spiritual Heart",
  //     speaker: "Hamza Yusuf",
  //     duration: "28:47",
  //     imageUrl: "/placeholder.svg?height=200&width=350",
  //     category: "Spirituality",
  //   },
  //   {
  //     id: 4,
  //     title: "Fiqh of Prayer",
  //     speaker: "Mufti Menk",
  //     duration: "37:10",
  //     imageUrl: "/placeholder.svg?height=200&width=350",
  //     category: "Fiqh",
  //   },
  // ];

  // Sample data for articles
  const articles = [
    {
      id: 1,
      title: "The Importance of Seeking Knowledge in Islam",
      author: "Dr. Bilal Philips",
      date: "May 10, 2025",
      description:
        "Islam places a high value on education and the pursuit of knowledge...",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Education",
    },
    {
      id: 2,
      title: "Understanding the Concept of Tawheed",
      author: "Shaykh Hamza Yusuf",
      date: "May 5, 2025",
      description:
        "Tawheed, the oneness of Allah, is the most fundamental concept in Islam...",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Aqeedah",
    },
    {
      id: 3,
      title: "The Ethics of Disagreement in Islam",
      author: "Dr. Umar F. Abd-Allah",
      date: "April 28, 2025",
      description:
        "Differences of opinion have existed among Muslims since the earliest days...",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Ethics",
    },
  ];

  interface TopicResponse {
    topics: Topic[];
  }

  interface Topic {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }
  const [topics, setTopics] = useState<TopicResponse>({ topics: [] });
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get(`http://localhost:8000/api/topics`);
      setTopics(response.data);
    };
    fetchTopics();
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-black font-noto-serif">
      {/* Header */}

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main>
        {/*Topics Section */}
        <section className="py-12 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-white">
                Browse by Category
              </h2>
              <Button
                onClick={() => window.location.href = "/library"}
                variant="link"
                className="text-emerald-700 dark:text-gray-300 whitespace-nowrap"
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="flex flex-wrap gap-3 md:gap-4">
                {topics.topics
                  .filter(topic => 
                    !topic.name.toLowerCase().includes('arabic') && 
                    !topic.name.toLowerCase().includes('farsi')
                  )
                  .map((topic) => (
                    <CategoryChip key={topic.id} name={topic.name} id={topic.id} />
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guided Learning Paths Section */}
        <GuidedLearningPaths />

        
        <section className="py-12 bg-emerald-50 dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-emerald-900 dark:text-white">
                  New Books
                </h2>
              </div>
              <RecentBooks />
            </div>
          </div>
        </section>

        {/* Interactive Quran Section */}
        {/* <section className="py-12 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-white">
                Interactive Quran
              </h2>
              <Button variant="link" className="text-emerald-700 dark:text-gray-300">
                Full Quran <BookOpen className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QuranSection />
              </div>
              <div className="space-y-6">
                <PrayerTimesWidget />
                <FeaturedQuote />
              </div>
            </div>
          </div>
        </section> */}

        {/* Articles Section */}
        <section className="py-12 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-white">
                Latest Articles
              </h2>
              <Button
                variant="link"
                className="text-emerald-700 dark:text-gray-300"
              >
                All Articles <Calendar className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-black border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={article.imageUrl || "/placeholder.svg"}
                        alt={article.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-emerald-700/80">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.author}</span>
                      </div>
                      <h3 className="font-bold text-emerald-900 dark:text-white mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {article.description}
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-emerald-700 dark:text-gray-300"
                        onClick={() => router.push(`/articles/${article.id}`)}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookMarked className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Articles Available
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We're currently working on bringing you insightful articles. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        
      </main>
    </div>
  );
}
