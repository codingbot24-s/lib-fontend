"use client"

import { useState } from "react"
import Header from "@/components/header"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookmarksList from "@/components/dashboard/bookmarks-list"
import NotesSection from "@/components/dashboard/notes-section"
import ReadingHistory from "@/components/dashboard/reading-history"
import ProfileSection from "@/components/dashboard/profile-section"
import { Bookmark, FileText, History, User } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookmarks")

  // Sample user data
  const user = {
    name: "Abdullah Rahman",
    email: "abdullah@example.com",
    joinDate: "January 2023",
    avatar: "/placeholder.svg?height=100&width=100",
    readingStats: {
      booksRead: 12,
      pagesRead: 2453,
      hoursRead: 87,
      currentlyReading: 3,
    },
  }

  // Sample bookmarked books data
  const bookmarkedBooks = [
    {
      id: 1,
      title: "The Sealed Nectar",
      author: "Safiur-Rahman Al-Mubarakpuri",
      coverUrl: "/placeholder.svg?height=300&width=200",
      progress: 75,
      lastRead: "2 days ago",
      totalPages: 432,
      currentPage: 324,
    },
    {
      id: 2,
      title: "Riyadh as-Saliheen",
      author: "Imam An-Nawawi",
      coverUrl: "/placeholder.svg?height=300&width=200",
      progress: 30,
      lastRead: "1 week ago",
      totalPages: 650,
      currentPage: 195,
    },
    {
      id: 3,
      title: "The Quran: English Translation",
      author: "Abdullah Yusuf Ali",
      coverUrl: "/placeholder.svg?height=300&width=200",
      progress: 45,
      lastRead: "Yesterday",
      totalPages: 604,
      currentPage: 272,
    },
    {
      id: 4,
      title: "Ihya Ulum al-Din",
      author: "Imam Al-Ghazali",
      coverUrl: "/placeholder.svg?height=300&width=200",
      progress: 10,
      lastRead: "3 days ago",
      totalPages: 1240,
      currentPage: 124,
    },
    {
      id: 5,
      title: "Purification of the Heart",
      author: "Hamza Yusuf",
      coverUrl: "/placeholder.svg?height=300&width=200",
      progress: 90,
      lastRead: "Today",
      totalPages: 210,
      currentPage: 189,
    },
  ]

  // Sample notes data
  const notes = [
    {
      id: 1,
      bookId: 1,
      bookTitle: "The Sealed Nectar",
      content:
        "The author's description of the Prophet's ﷺ early life provides important context for understanding the environment in which Islam emerged. The social conditions of Makkah at that time were characterized by tribal affiliations and trade networks.",
      page: 45,
      createdAt: "2023-05-10T14:32:00Z",
    },
    {
      id: 2,
      bookId: 3,
      bookTitle: "The Quran: English Translation",
      content:
        "Surah Al-Baqarah verse 286 reminds us that Allah does not burden a soul beyond what it can bear. This is a profound reminder during difficult times that we are never tested beyond our capacity.",
      page: 112,
      createdAt: "2023-05-15T09:45:00Z",
    },
    {
      id: 3,
      bookId: 5,
      bookTitle: "Purification of the Heart",
      content:
        "The concept of 'riya' (showing off) is discussed in depth here. Important to remember that intentions matter greatly in Islam, and actions done for the sake of impressing others lose their spiritual value.",
      page: 78,
      createdAt: "2023-05-17T16:20:00Z",
    },
    {
      id: 4,
      bookId: 2,
      bookTitle: "Riyadh as-Saliheen",
      content:
        "The hadith about the importance of good character is particularly relevant today. The Prophet ﷺ said: 'The most complete of believers in faith are those who are best in character.'",
      page: 132,
      createdAt: "2023-05-12T11:15:00Z",
    },
  ]

  // Sample reading history data
  const readingHistory = [
    {
      id: 1,
      bookId: 5,
      title: "Purification of the Heart",
      author: "Hamza Yusuf",
      coverUrl: "/placeholder.svg?height=300&width=200",
      lastRead: "Today, 10:30 AM",
      duration: "45 minutes",
      pagesRead: 15,
      currentPage: 189,
    },
    {
      id: 2,
      bookId: 1,
      title: "The Sealed Nectar",
      author: "Safiur-Rahman Al-Mubarakpuri",
      coverUrl: "/placeholder.svg?height=300&width=200",
      lastRead: "Yesterday, 8:15 PM",
      duration: "30 minutes",
      pagesRead: 12,
      currentPage: 324,
    },
    {
      id: 3,
      bookId: 3,
      title: "The Quran: English Translation",
      author: "Abdullah Yusuf Ali",
      coverUrl: "/placeholder.svg?height=300&width=200",
      lastRead: "Yesterday, 5:45 PM",
      duration: "20 minutes",
      pagesRead: 8,
      currentPage: 272,
    },
    {
      id: 4,
      bookId: 4,
      title: "Ihya Ulum al-Din",
      author: "Imam Al-Ghazali",
      coverUrl: "/placeholder.svg?height=300&width=200",
      lastRead: "3 days ago, 9:20 PM",
      duration: "1 hour",
      pagesRead: 22,
      currentPage: 124,
    },
    {
      id: 5,
      bookId: 2,
      title: "Riyadh as-Saliheen",
      author: "Imam An-Nawawi",
      coverUrl: "/placeholder.svg?height=300&width=200",
      lastRead: "Last week, Tuesday",
      duration: "35 minutes",
      pagesRead: 14,
      currentPage: 195,
    },
    {
      id: 6,
      bookId: 6,
      title: "The Divine Reality",
      author: "Hamza Andreas Tzortzis",
      coverUrl: "/placeholder.svg?height=300&width=200",
      lastRead: "Last month",
      duration: "2 hours",
      pagesRead: 45,
      currentPage: 45,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <DashboardHeader user={user} />

        <div className="mt-8">
          <Tabs defaultValue="bookmarks" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <TabsTrigger
                value="bookmarks"
                className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Bookmarks</span>
                <span className="sm:hidden">Books</span>
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
              >
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-400"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="bookmarks">
                <BookmarksList books={bookmarkedBooks} />
              </TabsContent>

              <TabsContent value="notes">
                <NotesSection notes={notes} books={bookmarkedBooks} />
              </TabsContent>

              <TabsContent value="history">
                <ReadingHistory history={readingHistory} />
              </TabsContent>

              <TabsContent value="profile">
                <ProfileSection user={user} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
