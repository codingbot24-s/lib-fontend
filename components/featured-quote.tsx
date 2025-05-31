import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedQuote() {
  return (
    <Card className="overflow-hidden bg-gradient-to-r from-emerald-800 to-emerald-700 dark:from-emerald-900 dark:to-emerald-800 border-0 shadow-md">
      <CardContent className="p-8 text-center">
        <p className="font-arabic text-2xl md:text-3xl text-white mb-4">طلب العلم فريضة على كل مسلم</p>
        <p className="text-lg md:text-xl text-white/90 italic mb-2">
          "Seeking knowledge is an obligation upon every Muslim."
        </p>
        <p className="text-sm text-white/70">- Prophet Muhammad ﷺ</p>
      </CardContent>
    </Card>
  )
}
