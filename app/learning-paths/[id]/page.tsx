import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, BookOpen, CheckCircle2, LockKeyhole } from "lucide-react"
import Link from "next/link"

export default function LearningPathPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from a database based on the ID
  // For now, we'll use sample data
  const learningPaths = {
    basics: {
      id: "basics",
      title: "Basics of Islam",
      description:
        "This learning path provides essential knowledge for beginners covering the five pillars of Islam, core beliefs, and daily practices. Perfect for new Muslims or anyone seeking to understand the fundamentals of the Islamic faith.",
      level: "Beginner",
      modules: 5,
      estimatedTime: "4 weeks",
      color: "emerald",
      prerequisites: "None",
      objectives: [
        "Understand the five pillars of Islam",
        "Learn the six articles of faith",
        "Develop a basic understanding of Islamic ethics",
        "Establish daily prayer practices",
        "Recognize the importance of the Quran in Islamic life",
      ],
      modules: [
        {
          id: 1,
          title: "Introduction to Islam",
          description: "Overview of Islam, its history, and core principles",
          duration: "3-5 hours",
          status: "available",
        },
        {
          id: 2,
          title: "The Five Pillars",
          description: "Detailed exploration of the five pillars of Islam",
          duration: "5-7 hours",
          status: "available",
        },
        {
          id: 3,
          title: "Articles of Faith",
          description: "Understanding the six articles of faith in Islam",
          duration: "4-6 hours",
          status: "available",
        },
        {
          id: 4,
          title: "Islamic Ethics and Values",
          description: "Core ethical principles and values in Islamic tradition",
          duration: "4-6 hours",
          status: "locked",
        },
        {
          id: 5,
          title: "Daily Practices and Worship",
          description: "Practical guidance for daily Islamic practices",
          duration: "6-8 hours",
          status: "locked",
        },
      ],
    },
    tafsir: {
      id: "tafsir",
      title: "Quranic Tafsir",
      description:
        "Explore the meanings and interpretations of the Quran with classical and contemporary scholars. This path will help you understand the context, linguistic nuances, and spiritual dimensions of Quranic verses.",
      level: "Intermediate",
      modules: 8,
      estimatedTime: "12 weeks",
      color: "teal",
      prerequisites: "Basic knowledge of Islam, familiarity with the Quran",
      objectives: [
        "Understand the principles of Quranic interpretation",
        "Learn about major schools of tafsir",
        "Develop skills to contextualize Quranic verses",
        "Explore thematic approaches to understanding the Quran",
        "Study selected surahs in depth with classical commentaries",
      ],
      modules: [
        {
          id: 1,
          title: "Introduction to Tafsir",
          description: "History and methodology of Quranic interpretation",
          duration: "4-6 hours",
          status: "available",
        },
        {
          id: 2,
          title: "Schools of Tafsir",
          description: "Major approaches and schools of Quranic interpretation",
          duration: "6-8 hours",
          status: "available",
        },
        {
          id: 3,
          title: "Linguistic Analysis",
          description: "Understanding Arabic linguistic features in the Quran",
          duration: "8-10 hours",
          status: "locked",
        },
      ],
    },
  }

  const path = learningPaths[params.id as keyof typeof learningPaths]

  if (!path) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Learning Path Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The learning path you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Map color names to Tailwind classes
  const colorMap = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-900 dark:text-emerald-100",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
    },
    teal: {
      bg: "bg-teal-50 dark:bg-teal-950/30",
      border: "border-teal-200 dark:border-teal-800",
      text: "text-teal-900 dark:text-teal-100",
      badge: "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-950/30",
      border: "border-cyan-200 dark:border-cyan-800",
      text: "text-cyan-900 dark:text-cyan-100",
      badge: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300",
    },
  }

  const colorClasses = colorMap[path.color as keyof typeof colorMap] || colorMap.emerald

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">{path.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={colorClasses.badge}>{path.level}</Badge>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{path.modules.length} modules</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{path.estimatedTime}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{path.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Learning Objectives</h2>
              <ul className="space-y-2">
                {path.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Modules</h2>
              <div className="space-y-4">
                {path.modules.map((module) => (
                  <Card
                    key={module.id}
                    className={`border ${
                      module.status === "locked"
                        ? "bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800"
                        : `${colorClasses.bg} ${colorClasses.border}`
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-emerald-900 dark:text-emerald-100">
                              {module.title}
                            </h3>
                            {module.status === "locked" && (
                              <LockKeyhole className="h-4 w-4 text-gray-400 dark:text-gray-600 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{module.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{module.duration}</span>
                          </div>
                        </div>
                        <Button
                          disabled={module.status === "locked"}
                          className={
                            module.status === "locked"
                              ? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                              : "bg-emerald-700 hover:bg-emerald-800 text-white"
                          }
                        >
                          {module.status === "locked" ? "Locked" : "Start"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-4">Path Information</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prerequisites</h4>
                    <p className="text-gray-700 dark:text-gray-300">{path.prerequisites}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Completion</h4>
                    <p className="text-gray-700 dark:text-gray-300">{path.estimatedTime}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Difficulty Level</h4>
                    <p className="text-gray-700 dark:text-gray-300">{path.level}</p>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">Enroll in Path</Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                      Track your progress and earn a certificate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
