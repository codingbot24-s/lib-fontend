"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
  content?: string;
  language: 'en' | 'ur' | 'ar';
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // For now using mock data
    setArticle({
      id: 4,
      title: "اسلام میں علم کی اہمیت",
      author: "مولانا طارق جمیل",
      date: "مئی 15, 2025",
      description: "اسلام میں علم حاصل کرنا ایک عظیم عبادت ہے۔ نبی کریم ﷺ نے فرمایا: 'علم حاصل کرنا ہر مسلمان پر فرض ہے'۔ یہ حدیث ہمیں بتاتی ہے کہ تعلیم صرف ایک مشورہ نہیں بلکہ ہر مسلمان پر ایک مذہبی فریضہ ہے...",
      imageUrl: "/placeholder.svg?height=800&width=1200",
      category: "تعلیم",
      language: 'ur',
      content: `
        <div class="font-urdu text-right">
          <p class="mb-4">اسلام میں علم حاصل کرنا ایک عظیم عبادت ہے۔ نبی کریم ﷺ نے فرمایا: 'علم حاصل کرنا ہر مسلمان پر فرض ہے'۔ یہ حدیث ہمیں بتاتی ہے کہ تعلیم صرف ایک مشورہ نہیں بلکہ ہر مسلمان پر ایک مذہبی فریضہ ہے۔</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">اسلام میں علم کی اہمیت</h2>
          
          <p class="mb-4">اسلام میں علم صرف مذہبی تعلیمات تک محدود نہیں ہے۔ یہ ہر وہ علم شامل ہے جو انسانیت کے لیے مفید ہو۔ اس میں شامل ہیں:</p>
          
          <ul class="list-disc pr-6 mb-4">
            <li>مذہبی علم</li>
            <li>سائنسی علم</li>
            <li>طبی علم</li>
            <li>تکنیکی علم</li>
            <li>سماجی علوم</li>
          </ul>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">معاشرے میں تعلیم کا کردار</h2>
          
          <p class="mb-4">تعلیم معاشرے کی تعمیر و ترقی میں اہم کردار ادا کرتی ہے۔ یہ افراد کو تنقیدی سوچ کی صلاحیت، درست فیصلے کرنے کی اہلیت، اور معاشرے میں مثبت کردار ادا کرنے میں مدد کرتی ہے۔</p>
          
          <p class="mb-4">اسلامی روایت میں علماء اور اساتذہ کو بہت عزت دی گئی ہے۔ نبی کریم ﷺ نے فرمایا: 'عالم کا قلم شہید کے خون سے زیادہ مقدس ہے'۔ یہ علم کی حفاظت اور اس کی ترویج کی اہمیت کو ظاہر کرتا ہے۔</p>
        </div>
      `
    });
    setLoading(false);
  }, [params.id]);

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

  const getBackButtonText = (lang: string) => {
    switch (lang) {
      case 'ar': return 'العودة إلى المقالات';
      case 'ur': return 'مضامین کی طرف واپس';
      default: return 'Back to Articles';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Article Not Found</h1>
          <Button onClick={() => router.push('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const isRTL = article.language === 'ar' || article.language === 'ur';
  const fontClass = isRTL ? 'font-arabic' : '';

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-gray-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
          onClick={() => router.back()}
        >
          <ArrowLeft className={`mr-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
          {getBackButtonText(article.language)}
        </Button>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className={`p-8 ${isRTL ? 'text-right' : ''}`}>
            <h1 className={`text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-100 mb-6 ${fontClass}`}>
              {article.title}
            </h1>

            <div className={`flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 ${isRTL ? 'justify-end' : ''}`}>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                {article.category}
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {getLanguageLabel(article.language)}
              </div>
            </div>

            <div 
              className={`prose dark:prose-invert max-w-none ${fontClass}`}
              dir={getLanguageDirection(article.language)}
              dangerouslySetInnerHTML={{ __html: article.content || article.description }}
            />
          </div>
        </div>
      </article>
    </div>
  );
} 