import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Search, BookOpen, ChevronRight, ChevronLeft } from "lucide-react"

export default function QuranSection() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-900 border-0 shadow-md">
      <CardContent className="p-6">
        <Tabs defaultValue="read" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
          <TabsContent value="read">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="text-sm text-emerald-700 dark:text-emerald-300 mb-1 block">Surah</label>
                  <Select defaultValue="1">
                    <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
                      <SelectValue placeholder="Select Surah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1. Al-Fatihah</SelectItem>
                      <SelectItem value="2">2. Al-Baqarah</SelectItem>
                      <SelectItem value="3">3. Aali Imran</SelectItem>
                      <SelectItem value="4">4. An-Nisa</SelectItem>
                      <SelectItem value="5">5. Al-Ma'idah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/2">
                  <label className="text-sm text-emerald-700 dark:text-emerald-300 mb-1 block">Translation</label>
                  <Select defaultValue="yusuf-ali">
                    <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
                      <SelectValue placeholder="Select Translation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yusuf-ali">Yusuf Ali</SelectItem>
                      <SelectItem value="pickthall">Pickthall</SelectItem>
                      <SelectItem value="sahih">Sahih International</SelectItem>
                      <SelectItem value="hilali">Hilali & Khan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-lg">
                <div className="text-right mb-4">
                  <p className="font-arabic text-2xl leading-loose text-emerald-900 dark:text-emerald-100">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="font-arabic text-2xl leading-loose text-emerald-900 dark:text-emerald-100">
                    الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
                  </p>
                  <p className="font-arabic text-2xl leading-loose text-emerald-900 dark:text-emerald-100">
                    الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="font-arabic text-2xl leading-loose text-emerald-900 dark:text-emerald-100">
                    مَالِكِ يَوْمِ الدِّينِ
                  </p>
                  <p className="font-arabic text-2xl leading-loose text-emerald-900 dark:text-emerald-100">
                    إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                    1. In the name of Allah, the Entirely Merciful, the Especially Merciful.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                    2. [All] praise is [due] to Allah, Lord of the worlds.
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                    3. The Entirely Merciful, the Especially Merciful,
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-2">4. Sovereign of the Day of Recompense.</p>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-2">
                    5. It is You we worship and You we ask for help.
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    disabled
                    className="text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Button>
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="search">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search the Quran..."
                  className="pl-10 border-emerald-200 dark:border-emerald-800"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Select defaultValue="all">
                    <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Surahs</SelectItem>
                      <SelectItem value="meccan">Meccan Surahs</SelectItem>
                      <SelectItem value="medinan">Medinan Surahs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">Search</Button>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-lg text-center">
                <BookOpen className="h-12 w-12 mx-auto text-emerald-700 dark:text-emerald-400 mb-2" />
                <p className="text-emerald-700 dark:text-emerald-300">Enter a word or phrase to search the Quran</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="audio">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="text-sm text-emerald-700 dark:text-emerald-300 mb-1 block">Surah</label>
                  <Select defaultValue="1">
                    <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
                      <SelectValue placeholder="Select Surah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1. Al-Fatihah</SelectItem>
                      <SelectItem value="2">2. Al-Baqarah</SelectItem>
                      <SelectItem value="3">3. Aali Imran</SelectItem>
                      <SelectItem value="4">4. An-Nisa</SelectItem>
                      <SelectItem value="5">5. Al-Ma'idah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/2">
                  <label className="text-sm text-emerald-700 dark:text-emerald-300 mb-1 block">Reciter</label>
                  <Select defaultValue="mishary">
                    <SelectTrigger className="border-emerald-200 dark:border-emerald-800">
                      <SelectValue placeholder="Select Reciter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mishary">Mishary Rashid Alafasy</SelectItem>
                      <SelectItem value="sudais">Abdurrahman As-Sudais</SelectItem>
                      <SelectItem value="ghamdi">Saad Al-Ghamdi</SelectItem>
                      <SelectItem value="minshawi">Mohamed Siddiq El-Minshawi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-6 rounded-lg text-center">
                <div className="mb-4">
                  <h3 className="font-arabic text-2xl text-emerald-900 dark:text-emerald-100 mb-2">سورة الفاتحة</h3>
                  <p className="text-emerald-700 dark:text-emerald-300">Surah Al-Fatihah</p>
                </div>
                <Button className="mx-auto bg-emerald-700 hover:bg-emerald-800 text-white">
                  <Play className="mr-2 h-4 w-4" /> Play Surah
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
