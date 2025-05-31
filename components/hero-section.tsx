import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, BookMarked, Search, Users } from "lucide-react"
import QuranVerse from "@/components/quran-verse"
import HeroPattern from "@/components/hero-pattern"

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-emerald-900 to-emerald-800 dark:from-emerald-950 dark:to-emerald-900">
      <HeroPattern className="absolute inset-0 opacity-10" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-arabic text-4xl md:text-6xl font-bold text-white mb-2">بيت الكتب</h1>
          <h2 className="text-2xl md:text-3xl font-light text-gold-300 mb-6">Bayt al-Kutub</h2>

          <QuranVerse
            arabic="اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ"
            translation="Read in the name of your Lord who created"
            reference="Surah Al-Alaq [96:1]"
          />

          <div className="relative max-w-2xl mx-auto my-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search books, Quran, Hadith..."
              className="pl-10 pr-4 py-6 w-full rounded-full border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-gold-300 focus:ring focus:ring-gold-200/30"
            />
            <Button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-gold-500 hover:bg-gold-600 text-emerald-950 rounded-full px-5">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              Read Quran
              <BookOpen className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              Browse Books
              <BookMarked className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              Find Scholar
              <Users className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
