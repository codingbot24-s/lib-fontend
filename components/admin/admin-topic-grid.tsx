import Link from "next/link"
import { BookOpen, Scroll, Scale, User, Heart, Clock, Volume2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const topics = [
	{
		id: "tafsir",
		name: "Tafsir",
		arabicName: "التفسير",
		count: 134,
		icon: BookOpen,
		color: "emerald",
	},
	{
		id: "hadith",
		name: "Hadith",
		arabicName: "الحديث",
		count: 189,
		icon: Scroll,
		color: "amber",
	},
	{
		id: "fiqh",
		name: "Fiqh",
		arabicName: "الفقه",
		count: 156,
		icon: Scale,
		color: "blue",
	},
	{
		id: "seerah",
		name: "Seerah",
		arabicName: "السيرة",
		count: 98,
		icon: User,
		color: "purple",
	},
	{
		id: "aqeedah",
		name: "Aqeedah",
		arabicName: "العقيدة",
		count: 87,
		icon: Heart,
		color: "rose",
	},
	{
		id: "history",
		name: "History",
		arabicName: "التاريخ",
		count: 65,
		icon: Clock,
		color: "orange",
	},
	{
		id: "quran",
		name: "Quran",
		arabicName: "القرآن",
		count: 234,
		icon: Volume2,
		color: "green",
	},
	{
		id: "tasawwuf",
		name: "Tasawwuf",
		arabicName: "التصوف",
		count: 76,
		icon: Sparkles,
		color: "indigo",
	},
]

export function AdminTopicGrid() {
	return (
		<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
			{topics.map((topic) => {
				const Icon = topic.icon
				const colorClasses = {
					emerald:
						"bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400",
					amber:
						"bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400",
					blue:
						"bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400",
					purple:
						"bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400",
					rose:
						"bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-400",
					orange:
						"bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-400",
					green:
						"bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400",
					indigo:
						"bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400",
				}

				return (
					<Link
						key={topic.id}
						href={`/admin/topics/${topic.id}`}
						className={cn(
							"block p-3 sm:p-4 rounded-lg border transition-all duration-300",
							colorClasses[topic.color as keyof typeof colorClasses],
							"hover:shadow-md hover:-translate-y-1 active:translate-y-0",
							"focus:outline-none focus:ring-2 focus:ring-offset-2",
							"focus:ring-opacity-50",
							{
								"focus:ring-emerald-500": topic.color === "emerald",
								"focus:ring-amber-500": topic.color === "amber",
								"focus:ring-blue-500": topic.color === "blue",
								"focus:ring-purple-500": topic.color === "purple",
								"focus:ring-rose-500": topic.color === "rose",
								"focus:ring-orange-500": topic.color === "orange",
								"focus:ring-green-500": topic.color === "green",
								"focus:ring-indigo-500": topic.color === "indigo",
							},
						)}
					>
						<div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
							<Icon className="h-6 w-6 sm:h-8 sm:w-8" />
							<div className="space-y-1">
								<h3 className="font-medium text-sm sm:text-base">
									{topic.name}
								</h3>
								<p className="text-xs font-arabic sm:text-sm">
									{topic.arabicName}
								</p>
							</div>
							<div className="text-xs sm:text-sm font-medium">
								{topic.count.toLocaleString()} books
							</div>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
