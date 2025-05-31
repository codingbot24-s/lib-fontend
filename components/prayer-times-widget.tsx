import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Calendar } from "lucide-react"

export default function PrayerTimesWidget() {
  // Sample prayer times data
  const prayerTimes = [
    { name: "Fajr", time: "5:12 AM" },
    { name: "Sunrise", time: "6:43 AM" },
    { name: "Dhuhr", time: "12:34 PM" },
    { name: "Asr", time: "3:51 PM" },
    { name: "Maghrib", time: "6:25 PM" },
    { name: "Isha", time: "7:55 PM" },
  ]

  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-900 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-emerald-700 dark:text-emerald-400 mr-2" />
            <h3 className="font-medium text-lg text-emerald-900 dark:text-emerald-100">Prayer Times</h3>
          </div>
          <div className="text-sm text-emerald-700 dark:text-emerald-300 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>May 17, 2025</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-emerald-700 dark:text-emerald-300 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>New York, USA</span>
          <Button variant="link" size="sm" className="ml-1 p-0 h-auto text-emerald-600 dark:text-emerald-400">
            Change
          </Button>
        </div>
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded-md ${
                index === 2 ? "bg-emerald-100 dark:bg-emerald-900/40" : ""
              }`}
            >
              <span className="font-medium text-emerald-800 dark:text-emerald-200">{prayer.name}</span>
              <span className="text-emerald-700 dark:text-emerald-300">{prayer.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
