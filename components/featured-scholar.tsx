import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Image from "next/image"

interface FeaturedScholarProps {
  scholar: {
    id: number
    name: string
    arabicName: string
    era: string
    specialty: string
    imageUrl: string
    bookCount: number
  }
}

export default function FeaturedScholar({ scholar }: FeaturedScholarProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-1/3 aspect-square">
          <Image src={scholar.imageUrl || "/placeholder.svg"} alt={scholar.name} fill className="object-cover" />
        </div>
        <CardContent className="p-4 sm:w-2/3 flex flex-col">
          <div>
            <h3 className="font-bold text-emerald-900 dark:text-emerald-100">{scholar.name}</h3>
            <p className="text-xs text-gold font-arabic mb-1">{scholar.arabicName}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{scholar.era}</p>
            <p className="text-emerald-700 dark:text-emerald-400 text-sm mt-2">{scholar.specialty}</p>
          </div>
          <div className="flex items-center mt-4">
            <BookOpen className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{scholar.bookCount} works</span>
          </div>
          <CardFooter className="p-0 mt-4">
            <Button
              variant="outline"
              className="w-full border-emerald-700 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950"
            >
              View Profile
            </Button>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  )
}
