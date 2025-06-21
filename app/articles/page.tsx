"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, X, Globe, Tag, Calendar, User } from "lucide-react";


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

// Modal UI (simple implementation)
function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8 max-w-md w-full relative animate-in fade-in-0 zoom-in-95">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'en' | 'ur' | 'ar'>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-black dark:via-black dark:to-black">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                Articles
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore our collection of insightful articles on various Islamic topics, written by scholars and experts
              </p>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="default"
                className="font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                ✍️ Write Article
              </Button>
              <Button
                variant="outline"
                className="lg:hidden flex items-center gap-2 border-emerald-200 hover:bg-emerald-50 dark:border-gray-600 dark:hover:bg-gray-800 px-6 py-3 rounded-full"
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
          </div>

          {/* Enhanced Write Article Modal */}
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-white dark:to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-white">Write an Article</h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">Share your knowledge with the community. Before writing, please review our terms and conditions.</p>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  onClick={() => { setIsModalOpen(false); router.push('/articles/terms'); }}
                  className="w-full py-3 border-emerald-200 hover:bg-emerald-50 dark:border-gray-600 dark:hover:bg-gray-900"
                >
                  📋 Read Terms & Conditions
                </Button>
                <Button
                  variant="default"
                  onClick={() => { setIsModalOpen(false); router.push('/articles/write'); }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black py-3"
                >
                  ✍️ Start Writing
                </Button>
              </div>
            </div>
          </Modal>

          {/* Main Content with Enhanced Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Filters Sidebar */}
            <div className={`lg:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="lg:sticky lg:top-4 space-y-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-emerald-100 dark:border-gray-700">
                {/* Language Filter */}
                <div>
                  <h2 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Language
                  </h2>
                  <div className="space-y-2">
                    <Button
                      variant={selectedLanguage === 'all' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('all');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start rounded-lg transition-all duration-200 ${selectedLanguage === 'all' ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black shadow-md" : "hover:bg-emerald-50 dark:hover:bg-gray-900"}`}
                    >
                      🌍 All Languages
                    </Button>
                    <Button
                      variant={selectedLanguage === 'en' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('en');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start rounded-lg transition-all duration-200 ${selectedLanguage === 'en' ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black shadow-md" : "hover:bg-emerald-50 dark:hover:bg-gray-900"}`}
                    >
                    English
                    </Button>
                    <Button
                      variant={selectedLanguage === 'ur' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('ur');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start rounded-lg transition-all duration-200 ${selectedLanguage === 'ur' ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black shadow-md" : "hover:bg-emerald-50 dark:hover:bg-gray-900"}`}
                    >
                   اردو
                    </Button>
                    <Button
                      variant={selectedLanguage === 'ar' ? "default" : "outline"}
                      onClick={() => {
                        setSelectedLanguage('ar');
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start rounded-lg transition-all duration-200 ${selectedLanguage === 'ar' ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black shadow-md" : "hover:bg-emerald-50 dark:hover:bg-gray-900"}`}
                    >
                    العربية
                    </Button>
                  </div>
                </div>

                {/* Topics Filter */}
                <div>
                  <h2 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Topics
                  </h2>
                  <div className="space-y-2">
                    <Button
                      variant={selectedTopic === null ? "default" : "outline"}
                      onClick={() => {
                        setSelectedTopic(null);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full justify-start rounded-lg transition-all duration-200 ${selectedTopic === null ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black shadow-md" : "hover:bg-emerald-50 dark:hover:bg-gray-900"}`}
                    >
                      📚 All Topics
                    </Button>
                    {topics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant={selectedTopic === topic.id ? "default" : "outline"}
                        onClick={() => {
                          setSelectedTopic(topic.id);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full justify-start rounded-lg transition-all duration-200 ${selectedTopic === topic.id ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-white dark:to-gray-100 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-black shadow-md" : "hover:bg-emerald-50 dark:hover:bg-gray-900"}`}
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Articles Grid */}
            <div className="flex-1">
              {/* Enhanced Active Filters Display */}
              <div className="mb-8 flex flex-wrap gap-3">
                {selectedLanguage !== 'all' && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-gray-700 dark:to-gray-600 dark:text-white shadow-sm">
                    {getLanguageLabel(selectedLanguage)}
                    <button
                      onClick={() => setSelectedLanguage('all')}
                      className="ml-2 hover:text-emerald-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {selectedTopic !== null && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-gray-700 dark:to-gray-600 dark:text-white shadow-sm">
                    {topics.find(t => t.id === selectedTopic)?.name}
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="ml-2 hover:text-emerald-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-ping"></div>
                  </div>
                </div>
              ) : filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-emerald-100 dark:border-gray-700 rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-600"
                    >
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-sm">
                            {article.category}
                          </span>
                          <span className="text-xs font-semibold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-sm">
                            {getLanguageLabel(article.language)}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {article.date}
                          </span>
                          <span className="mx-3">•</span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {article.author}
                          </span>
                        </div>
                        <h3 
                          className={`text-xl font-bold text-emerald-900 dark:text-white mb-4 group-hover:text-emerald-700 dark:group-hover:text-gray-300 transition-colors ${article.language === 'ar' || article.language === 'ur' ? 'font-arabic' : ''}`}
                          dir={getLanguageDirection(article.language)}
                        >
                          {article.title}
                        </h3>
                        <p 
                          className={`text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 leading-relaxed ${article.language === 'ar' || article.language === 'ur' ? 'font-arabic' : ''}`}
                          dir={getLanguageDirection(article.language)}
                        >
                          {article.description}
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-emerald-700 dark:text-gray-300 hover:text-emerald-800 dark:hover:text-white font-semibold group-hover:underline transition-all duration-200"
                          onClick={() => router.push(`/articles/${article.id}`)}
                        >
                          {article.language === 'ar' ? 'اقرأ المزيد →' : 
                           article.language === 'ur' ? 'مزید پڑھیں →' : 
                           'Read More →'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    No Articles Found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {selectedTopic
                      ? "No articles available for this topic yet. Check back later or try a different filter."
                      : "No articles available at the moment. Be the first to contribute!"}
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