import ForumHeader from "@/components/forum/forum-header"
import ThreadList from "@/components/forum/thread-list"
import ForumSidebar from "@/components/forum/forum-sidebar"
import StartDiscussionButton from "@/components/forum/start-discussion-button"
import ForumTabs from "@/components/forum/forum-tabs"
import Header from "@/components/header"

export default function ForumPage() {
  // Sample forum categories
  const categories = [
    { id: "all", name: "All Discussions" },
    { id: "qa", name: "Q&A" },
    { id: "tafsir", name: "Tafsir" },
    { id: "fiqh", name: "Fiqh" },
    { id: "hadith", name: "Hadith" },
    { id: "history", name: "History" },
    { id: "general", name: "General" },
  ]

  // Sample threads data
  const threads = [
    {
      id: 1,
      title: "Understanding the concept of Tawheed in modern context",
      preview:
        "I've been studying the concept of Tawheed and would like to understand how it applies in our modern world...",
      author: {
        name: "Ahmad Ibrahim",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Regular",
      },
      category: "Aqeedah",
      tags: ["Tawheed", "Beginner", "Modern"],
      createdAt: "2 hours ago",
      replies: 12,
      views: 145,
      isSticky: true,
    },
    {
      id: 2,
      title: "Question about Surah Al-Kahf recitation on Fridays",
      preview:
        "Is it recommended to recite Surah Al-Kahf on Fridays? I've heard different opinions about this practice...",
      author: {
        name: "Fatima Ali",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Scholar",
      },
      category: "Quran",
      tags: ["Quran", "Sunnah", "Friday"],
      createdAt: "5 hours ago",
      replies: 8,
      views: 97,
      isSticky: false,
    },
    {
      id: 3,
      title: "Differences between the four Madhabs on prayer times",
      preview: "I'm trying to understand the differences in prayer time calculations between the four major Madhabs...",
      author: {
        name: "Omar Khan",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "New Member",
      },
      category: "Fiqh",
      tags: ["Salah", "Madhabs", "Fiqh"],
      createdAt: "Yesterday",
      replies: 15,
      views: 203,
      isSticky: false,
    },
    {
      id: 4,
      title: "Resources for learning classical Arabic grammar",
      preview:
        "Can anyone recommend good resources for learning classical Arabic grammar specifically for understanding Quran and Hadith?",
      author: {
        name: "Zaynab Hussein",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Linguist",
      },
      category: "Language",
      tags: ["Arabic", "Grammar", "Learning"],
      createdAt: "2 days ago",
      replies: 23,
      views: 312,
      isSticky: false,
    },
    {
      id: 5,
      title: "Historical accuracy of stories about the companions",
      preview:
        "I'm interested in learning about the methodology historians use to verify stories about the companions (sahaba)...",
      author: {
        name: "Yusuf Rahman",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Historian",
      },
      category: "History",
      tags: ["Sahaba", "History", "Methodology"],
      createdAt: "3 days ago",
      replies: 7,
      views: 156,
      isSticky: false,
    },
    {
      id: 6,
      title: "Interpretation of dreams in Islamic tradition",
      preview:
        "What is the Islamic perspective on dream interpretation? Are there authentic sources that discuss this topic?",
      author: {
        name: "Aisha Mohammed",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Regular",
      },
      category: "General",
      tags: ["Dreams", "Interpretation", "Tradition"],
      createdAt: "4 days ago",
      replies: 19,
      views: 278,
      isSticky: false,
    },
    {
      id: 7,
      title: "Recommended books on Maqasid al-Shariah",
      preview: "I'm looking for comprehensive books on the higher objectives of Islamic law (Maqasid al-Shariah)...",
      author: {
        name: "Ibrahim Malik",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Researcher",
      },
      category: "Books",
      tags: ["Maqasid", "Shariah", "Books"],
      createdAt: "5 days ago",
      replies: 11,
      views: 189,
      isSticky: false,
    },
  ]

  // Sample trending discussions
  const trendingDiscussions = [
    {
      id: 101,
      title: "The importance of seeking knowledge in Islam",
      replies: 45,
    },
    {
      id: 102,
      title: "Understanding the concept of Bidah (innovation)",
      replies: 38,
    },
    {
      id: 103,
      title: "How to balance worldly pursuits with spiritual growth",
      replies: 32,
    },
  ]

  // Sample popular tags
  const popularTags = [
    { id: 1, name: "Quran", count: 124 },
    { id: 2, name: "Hadith", count: 98 },
    { id: 3, name: "Fiqh", count: 87 },
    { id: 4, name: "Tafsir", count: 76 },
    { id: 5, name: "Aqeedah", count: 65 },
    { id: 6, name: "Seerah", count: 54 },
    { id: 7, name: "Ramadan", count: 43 },
    { id: 8, name: "Prayer", count: 39 },
  ]

  // Sample featured question
  const featuredQuestion = {
    id: 201,
    title: "How can we reconcile scientific discoveries with Quranic verses?",
    author: {
      name: "Dr. Abdullah Hakeem",
      badge: "Scholar",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <ForumHeader />

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <ForumTabs categories={categories} />
              <StartDiscussionButton />
            </div>

            <ThreadList threads={threads} />
          </div>

          <div className="w-full md:w-1/4">
            <ForumSidebar
              trendingDiscussions={trendingDiscussions}
              popularTags={popularTags}
              featuredQuestion={featuredQuestion}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
