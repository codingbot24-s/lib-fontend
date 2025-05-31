import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ForumHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100 font-display">
            Community Discussions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Join the conversation, ask questions, and share knowledge with fellow seekers of Islamic knowledge
          </p>
        </div>

        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search discussions..."
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-6 gap-y-2">
        <div className="flex items-center">
          <span className="font-medium">12,458</span>
          <span className="ml-1">Discussions</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">87,392</span>
          <span className="ml-1">Replies</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">5,721</span>
          <span className="ml-1">Members</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">243</span>
          <span className="ml-1">Online Now</span>
        </div>
      </div>
    </div>
  )
}
