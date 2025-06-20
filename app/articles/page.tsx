"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X } from "lucide-react";


interface Topic {
  id: number;
  name: string;
  description: string;
}

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
  topicId: number;
  language: 'en' | 'ur' | 'ar';
}

export default function ArticlesPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'en' | 'ur' | 'ar'>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/topics');
        setTopics(response.data.topics);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // For now using mock data
        const mockArticles: Article[] = [
          {
            id: 1,
            title: "The Importance of Seeking Knowledge in Islam",
            author: "Dr. Bilal Philips",
            date: "May 10, 2025",
            description: "Islam places a high value on education and the pursuit of knowledge...",
            imageUrl: "/placeholder.svg?height=400&width=300",
            category: "Education",
            topicId: 1,
            language: 'en' as const
          },
          {
            id: 2,
            title: "Understanding the Concept of Tawheed",
            author: "Shaykh Hamza Yusuf",
            date: "May 5, 2025",
            description: "Tawheed, the oneness of Allah, is the most fundamental concept in Islam...",
            imageUrl: "/placeholder.svg?height=400&width=300",
            category: "Aqeedah",
            topicId: 2,
            language: 'en' as const
          },
          {
            id: 3,
            title: "The Ethics of Disagreement in Islam",
            author: "Dr. Umar F. Abd-Allah",
            date: "April 28, 2025",
            description: "Differences of opinion have existed among Muslims since the earliest days...",
            imageUrl: "/placeholder.svg?height=400&width=300",
            category: "Ethics",
            topicId: 3,
            language: 'en' as const
          },
          {
            id: 4,
            title: "اسلام میں علم کی اہمیت",
            author: "مولانا طارق جمیل",
            date: "مئی 15, 2025",
            description: "اسلام میں علم حاصل کرنا ایک عظیم عبادت ہے۔ نبی کریم ﷺ نے فرمایا: 'علم حاصل کرنا ہر مسلمان پر فرض ہے'۔ یہ حدیث ہمیں بتاتی ہے کہ تعلیم صرف ایک مشورہ نہیں بلکہ ہر مسلمان پر ایک مذہبی فریضہ ہے...",
            imageUrl: "/placeholder.svg?height=400&width=300",
            category: "تعلیم",
            topicId: 1,
            language: 'ur' as const
          },
          {
            id: 5,
            title: "أهمية طلب العلم في الإسلام",
            author: "الشيخ محمد بن صالح العثيمين",
            date: "15 مايو 2025",
            description: "يضع الإسلام قيمة عالية على التعليم والسعي وراء المعرفة. قال النبي محمد ﷺ: 'طلب العلم فريضة على كل مسلم'...",
            imageUrl: "/placeholder.svg?height=400&width=300",
            category: "التعليم",
            topicId: 1,
            language: 'ar' as const
          }
        ];
        setArticles(mockArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedTopic]);

  const filteredArticles = articles
    .filter(article => selectedTopic ? article.topicId === selectedTopic : true)
    .filter(article => selectedLanguage === 'all' ? true : article.language === selectedLanguage);

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'en': return 'English';
      case 'ur': return 'اردو';
      case 'ar': return 'العربية';
      default: return lang;
    }
  };

  const getLanguageDirection = (lang: string) => {
    return lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Mobile Filter Button */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our collection of insightful articles on various Islamic topics
              </p>
            </div>
            <Button
              variant="outline"
              className="lg:hidden flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? (
                <>
                  <X className="h-4 w-4" />
                  Close Filters
                </>
              ) : (
                <>
                  <Filter className="h-4 w-4" />
                  Filters
                </>
              )}
            </Button>
          </div>

          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Hidden on mobile unless opened */}
            <div className={`lg:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="lg:sticky lg:top-4 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Language Filter */}
                <div>
                  <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                    Language
                  </h2>
                  <div className="space-y-2">
                    <Button
                      variant={selectedLanguage === 'all' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('all');
                        setIsFilterOpen(false);
                      }}
                      className="w-full justify-start bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      All Languages
                    </Button>
                    <Button
                      variant={selectedLanguage === 'en' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('en');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start ${selectedLanguage === 'en' ? "bg-emerald-700 hover:bg-emerald-800 text-white" : ""}`}
                    >
                      English
                    </Button>
                    <Button
                      variant={selectedLanguage === 'ur' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('ur');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start ${selectedLanguage === 'ur' ? "bg-emerald-700 hover:bg-emerald-800 text-white" : ""}`}
                    >
                      اردو
                    </Button>
                    <Button
                      variant={selectedLanguage === 'ar' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('ar');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start ${selectedLanguage === 'ar' ? "bg-emerald-700 hover:bg-emerald-800 text-white" : ""}`}
                    >
                      العربية
                    </Button>
                  </div>
                </div>

                {/* Topics Filter */}
                <div>
                  <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                    Topics
                  </h2>
                  <div className="space-y-2">
                    <Button
                      variant={selectedTopic === null ? "default" : "outline"}
                      onClick={() => {
                        setSelectedTopic(null);
                        setIsFilterOpen(false);
                      }}
                      className="w-full justify-start bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      All Topics
                    </Button>
                    {topics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant={selectedTopic === topic.id ? "default" : "outline"}
                        onClick={() => {
                          setSelectedTopic(topic.id);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full justify-start ${selectedTopic === topic.id ? "bg-emerald-700 hover:bg-emerald-800 text-white" : ""}`}
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="flex-1">
              {/* Active Filters Display */}
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedLanguage !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                    {getLanguageLabel(selectedLanguage)}
                    <button
                      onClick={() => setSelectedLanguage('all')}
                      className="ml-2 hover:text-emerald-600 dark:hover:text-emerald-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedTopic !== null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                    {topics.find(t => t.id === selectedTopic)?.name}
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="ml-2 hover:text-emerald-600 dark:hover:text-emerald-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              ) : filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-emerald-700/80">
                            {article.category}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-emerald-700/80">
                            {getLanguageLabel(article.language)}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>{article.author}</span>
                        </div>
                        <h3 
                          className={`font-bold text-emerald-900 dark:text-emerald-100 mb-2 ${article.language === 'ar' || article.language === 'ur' ? 'font-arabic' : ''}`}
                          dir={getLanguageDirection(article.language)}
                        >
                          {article.title}
                        </h3>
                        <p 
                          className={`text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 ${article.language === 'ar' || article.language === 'ur' ? 'font-arabic' : ''}`}
                          dir={getLanguageDirection(article.language)}
                        >
                          {article.description}
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-emerald-700 dark:text-emerald-400"
                          onClick={() => router.push(`/articles/${article.id}`)}
                        >
                          {article.language === 'ar' ? 'اقرأ المزيد' : 
                           article.language === 'ur' ? 'مزید پڑھیں' : 
                           'Read More'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Articles Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedTopic
                      ? "No articles available for this topic yet."
                      : "No articles available at the moment."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 