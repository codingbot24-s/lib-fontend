"use client";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  ChevronRight,
  BookMarked,
  Users,
  Headphones,
  Calendar,
} from "lucide-react";
import BookCard from "@/components/book-card";
import FeaturedBookCard from "@/components/featured-book-card";
import CategoryChip from "@/components/category-chip";
import FeaturedScholar from "@/components/featured-scholar";
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

  // Sample data for scholars
  const scholars = [
    {
      id: 1,
      name: "Imam Al-Ghazali",
      arabicName: "أبو حامد الغزالي",
      era: "1058-1111 CE",
      specialty: "Philosophy, Sufism, Theology",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bookCount: 72,
    },
    {
      id: 2,
      name: "Ibn Taymiyyah",
      arabicName: "ابن تيمية",
      era: "1263-1328 CE",
      specialty: "Fiqh, Hadith, Tafsir",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bookCount: 45,
    },
    {
      id: 3,
      name: "Imam Malik",
      arabicName: "مالك بن أنس",
      era: "711-795 CE",
      specialty: "Hadith, Fiqh",
      imageUrl: "/placeholder.svg?height=200&width=200",
      bookCount: 23,
    },
  ];

  // Sample data for audio content
  const audioContent = [
    {
      id: 1,
      title: "The Life of Prophet Muhammad",
      speaker: "Sheikh Yasir Qadhi",
      duration: "45:23",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Seerah",
    },
    {
      id: 2,
      title: "Understanding Surah Al-Kahf",
      speaker: "Nouman Ali Khan",
      duration: "32:15",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Tafsir",
    },
    {
      id: 3,
      title: "The Spiritual Heart",
      speaker: "Hamza Yusuf",
      duration: "28:47",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Spirituality",
    },
    {
      id: 4,
      title: "Fiqh of Prayer",
      speaker: "Mufti Menk",
      duration: "37:10",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Fiqh",
    },
  ];

  // Sample data for articles
  const articles = [
    {
      id: 1,
      title: "The Importance of Seeking Knowledge in Islam",
      author: "Dr. Bilal Philips",
      date: "May 10, 2025",
      excerpt:
        "Islam places a high value on education and the pursuit of knowledge...",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Education",
    },
    {
      id: 2,
      title: "Understanding the Concept of Tawheed",
      author: "Shaykh Hamza Yusuf",
      date: "May 5, 2025",
      excerpt:
        "Tawheed, the oneness of Allah, is the most fundamental concept in Islam...",
      imageUrl: "/placeholder.svg?height=200&width=350",
      category: "Aqeedah",
    },
    {
      id: 3,
      title: "The Ethics of Disagreement in Islam",
      author: "Dr. Umar F. Abd-Allah",
      date: "April 28, 2025",
      excerpt:
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
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950 font-noto-serif">
      {/* Header */}

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main>
        {/*Topics Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Browse by Category
              </h2>
              <Button
                onClick={() => window.location.href = "/library"}
                variant="link"
                className="text-emerald-700 dark:text-emerald-400 whitespace-nowrap"
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="flex flex-wrap gap-3 md:gap-4">
                {topics.topics.map((topic) => (
                  <CategoryChip key={topic.id} name={topic.name} id={topic.id} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guided Learning Paths Section */}
        <GuidedLearningPaths />

        {/* Featured Books Section */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-950/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Featured Books
              </h2>
              <Button
                variant="link"
                className="text-emerald-700 dark:text-emerald-400"
              >
                View Library <BookMarked className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <FeaturedBookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Quran Section */}
        {/* <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Interactive Quran
              </h2>
              <Button variant="link" className="text-emerald-700 dark:text-emerald-400">
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

        {/* Scholars Section */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-950/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Featured Scholars
              </h2>
              <Button
                variant="link"
                className="text-emerald-700 dark:text-emerald-400"
              >
                All Scholars <Users className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scholars.map((scholar) => (
                <FeaturedScholar key={scholar.id} scholar={scholar} />
              ))}
            </div>
          </div>
        </section>

        {/* Audio Content Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Audio Content
              </h2>
              <Button
                variant="link"
                className="text-emerald-700 dark:text-emerald-400"
              >
                All Audio <Headphones className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audioContent.map((audio) => (
                <AudioCard key={audio.id} audio={audio} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Books Section */}
        <section className="py-12 bg-emerald-50 dark:bg-emerald-950/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Popular Books
              </h2>
              <Button
                variant="link"
                className="text-emerald-700 dark:text-emerald-400"
                onClick={() => router.push("/library")}
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  description={book.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                Latest Articles
              </h2>
              <Button
                variant="link"
                className="text-emerald-700 dark:text-emerald-400"
              >
                All Articles <Calendar className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
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
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-emerald-700 dark:text-emerald-400"
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-emerald-800 to-emerald-700 dark:from-emerald-900 dark:to-emerald-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join Our Community of Knowledge Seekers
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Create an account to save your favorite books, track your reading
              progress, and join discussions with fellow learners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white hover:bg-gray-100 text-emerald-800 px-6 py-2">
                Create Free Account
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:text-white"
              >
                Learn More About Membership
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
