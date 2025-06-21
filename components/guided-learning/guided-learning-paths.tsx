import { Book, BookOpen, Scale, Scroll, User, Landmark } from "lucide-react"
import LearningPathCard from "@/components/guided-learning/learning-path-card"

export default function GuidedLearningPaths() {
  // Sample data for learning paths
  const learningPaths = [
    {
      id: "basics",
      title: "Basics of Islam",
      description: "Essential knowledge for beginners covering the five pillars, core beliefs, and daily practices.",
      icon: <Book className="h-6 w-6" />,
      color: "emerald",
      level: "Beginner",
      modules: 5,
      estimatedTime: "4 weeks",
    },
    {
      id: "tafsir",
      title: "Quranic Tafsir",
      description: "Explore the meanings and interpretations of the Quran with classical and contemporary scholars.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "teal",
      level: "Intermediate",
      modules: 8,
      estimatedTime: "12 weeks",
    },
    {
      id: "fiqh",
      title: "Fiqh Essentials",
      description: "Learn the principles of Islamic jurisprudence and their application in daily life.",
      icon: <Scale className="h-6 w-6" />,
      color: "cyan",
      level: "Intermediate",
      modules: 6,
      estimatedTime: "8 weeks",
    },
    {
      id: "hadith",
      title: "Hadith Sciences",
      description: "Study the sayings of Prophet Muhammad ﷺ and the methodology of hadith authentication.",
      icon: <Scroll className="h-6 w-6" />,
      color: "blue",
      level: "Advanced",
      modules: 7,
      estimatedTime: "10 weeks",
    },
    {
      id: "seerah",
      title: "Prophetic Biography",
      description: "Journey through the life of Prophet Muhammad ﷺ and extract lessons for contemporary times.",
      icon: <User className="h-6 w-6" />,
      color: "indigo",
      level: "Beginner",
      modules: 6,
      estimatedTime: "8 weeks",
    },
    {
      id: "history",
      title: "Islamic History",
      description: "Discover the rich history of Islamic civilization from the early caliphates to modern times.",
      icon: <Landmark className="h-6 w-6" />,
      color: "violet",
      level: "Intermediate",
      modules: 9,
      estimatedTime: "14 weeks",
    },
  ]

  return (
    <section className="py-12 bg-[#f8f5f0] dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-white font-display mb-3">
            Guided Learning Paths
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore curated thematic tracks for structured learning of Islamic knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </section>
  )
}
