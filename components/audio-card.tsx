import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"
import Image from "next/image"

interface AudioCardProps {
  audio: {
    id: number
    title: string
    speaker: string
    duration: string
    imageUrl: string
    category: string
  }
}

export default function AudioCard({ audio }: AudioCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={audio.imageUrl || "/placeholder.svg"}
          alt={audio.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" className="h-12 w-12 rounded-full bg-emerald-700/90 hover:bg-emerald-700 text-white">
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-emerald-700/80">
            {audio.category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-emerald-900 dark:text-emerald-100 mb-1 line-clamp-1">{audio.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{audio.speaker}</p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>{audio.duration}</span>
        </div>
      </CardContent>
    </Card>
  )
}
