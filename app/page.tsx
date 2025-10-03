"use client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import RecentBooks from "@/components/recent-books";

import CategoryChip from "@/components/category-chip";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  // Sample data for categories





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
      const response = await axios.get(`${BACKEND_URL}/api/topics`);
      setTopics(response.data);
    };
    fetchTopics();
  }, []);



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
        <section className="py-12 bg-white dark:bg-black">
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

        {/* Guided Learning Paths Coming Soon Section */}
        <section className="py-12 bg-emerald-50 dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center py-12">
              <svg className="h-16 w-16 text-emerald-600 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-4">Guided Learning Paths Coming Soon!</h2>
              <p className="text-lg text-emerald-800 dark:text-gray-300 max-w-2xl mb-6">
                We&apos;re working on a curated set of learning journeys to help you explore Islamic knowledge step by step. Stay tuned for a beautiful, interactive experience designed to guide you through essential topics and books!
              </p>
              <span className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 px-4 py-2 rounded-full font-medium text-sm animate-pulse">
                Launching Soon InshaAllah
              </span>
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
        <section className="py-12 bg-emerald-50 dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center py-12">
              <svg className="h-16 w-16 text-emerald-600 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5S6.5 15.59 6.5 12 9.41 5.5 13 5.5 19.5 8.41 19.5 12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 1" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-4">Articles Coming Soon!</h2>
              <p className="text-lg text-emerald-800 dark:text-gray-300 max-w-2xl mb-6">
                We&apos;re preparing a collection of insightful articles to deepen your understanding and inspire your journey. Stay tuned for thought-provoking reads on a variety of Islamic topics!
              </p>
              <span className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 px-4 py-2 rounded-full font-medium text-sm animate-pulse">
                Launching Soon InshaAllah
              </span>
            </div>
          </div>
        </section>

        
      </main>
    </div>
  );
}
