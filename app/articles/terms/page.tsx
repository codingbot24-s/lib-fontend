"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Globe, AlertTriangle } from "lucide-react";
import Link from "next/link";

const englishHeader = "Terms & Conditions for Posting Articles";
const englishHeaderContent = "To ensure academic integrity, Islamic ethics, and a respectful learning environment, every contributor must follow the rules below. Failure to comply will result in removal of the article without prior notice.";

const englishSections = [
  {
    title: "Referencing Guidelines",
    content: [
      "Every reference must include:",
      "Book Title",
      "Author",
      "Volume Number",
      "Page Number",
      "Publisher",
      "Publication Year (if known)",
      "If the book exists in our library, you must attach a link to the book's page.",
      "Articles without complete references will be rejected or removed."
    ]
  },
  {
    title: "Authentic Sources Only",
    content: [
      "Content must be supported by authentic classical Islamic sources.",
      "Any Hadith quoted must include its grading and source (e.g., Sahih Bukhari, Da'if, etc.).",
      "If discussing a fiqh issue with differences of opinion, clearly mention the school of thought.",
      "Weak or fabricated sources without clarification will result in removal."
    ]
  },
  {
    title: "Respectful & Non-Sectarian Language",
    content: [
      "Do not use offensive, accusatory, or sectarian language.",
      "Writing must promote knowledge and unity, not division or fitnah.",
      "Any disrespectful or inflammatory content will be immediately removed."
    ]
  },
  {
    title: "Originality and No Plagiarism",
    content: [
      "Do not copy-paste from other websites or books without citation.",
      "Your article must be original, properly sourced, and your own work.",
      "Plagiarized or duplicate articles will be taken down."
    ]
  },
  {
    title: "Translation Requirements",
    content: [
      "Translations must be accurate, and you must cite the original source.",
      "If translated by someone else, credit the translator.",
      "Poor or uncredited translations may lead to content rejection."
    ]
  },
  {
    title: "Agreement",
    content: [
      "By submitting an article, you agree that:",
      "Your content may be reviewed or edited for compliance.",
      "Non-compliant articles may be deleted without notice."
    ]
  }
];

const urduHeader = "مضامین پوسٹ کرنے کے قواعد و ضوابط";
const urduHeaderContent = "علمی دیانت، اسلامی اقدار، اور باہمی احترام کو برقرار رکھنے کے لیے، ہر مضمون نویس کو درج ذیل اصولوں پر عمل کرنا ہوگا۔ خلاف ورزی کی صورت میں مضمون بغیر اطلاع کے حذف کر دیا جائے گا۔";

const urduSections = [
  {
    title: "حوالہ دینے کے اصول",
    content: [
      "ہر حوالہ میں درج ذیل معلومات لازمی ہیں:",
      "کتاب کا مکمل نام",
      "مصنف",
      "جلد نمبر",
      "صفحہ نمبر",
      "ناشر",
      "اشاعت کا سال (اگر معلوم ہو)",
      "اگر کتاب ہماری لائبریری میں موجود ہو تو اس کا لنک دینا لازمی ہے۔",
      "نامکمل حوالہ ہونے کی صورت میں مضمون مسترد یا حذف کر دیا جائے گا۔"
    ]
  },
  {
    title: "مستند اسلامی ذرائع کا استعمال",
    content: [
      "صرف مستند اور کلاسیکی اسلامی ذرائع سے مواد اخذ کیا جائے۔",
      "اگر حدیث بیان کی جائے تو درجہ اور ماخذ ضرور لکھیں۔",
      "فقہی اختلافات کی صورت میں مسلک کا ذکر واضح کریں۔",
      "ضعیف یا من گھڑت معلومات بغیر وضاحت کے شامل کرنے پر مضمون حذف کر دیا جائے گا۔"
    ]
  },
  {
    title: "احترام پر مبنی اور غیر فرقہ وارانہ زبان",
    content: [
      "تضحیک آمیز، الزام تراش یا فرقہ وارانہ زبان استعمال نہ کریں۔",
      "مضمون علم و اتحاد کو فروغ دینے والا ہو، فتنہ یا انتشار نہیں۔",
      "خلاف ورزی کی صورت میں مضمون فوری حذف کر دیا جائے گا۔"
    ]
  },
  {
    title: "اصل مواد اور سرقہ سے پرہیز",
    content: [
      "کسی اور کی تحریر یا ویب سائٹ سے مواد نقل نہ کریں جب تک حوالہ نہ ہو۔",
      "مضمون آپ کا اصل کام ہونا چاہیے اور مکمل حوالوں کے ساتھ ہو۔",
      "چوری شدہ یا نقل شدہ مواد فوری طور پر حذف کر دیا جائے گا۔"
    ]
  },
  {
    title: "ترجمہ کی شرائط",
    content: [
      "ترجمہ درست اور اصل ماخذ کے ساتھ ہونا چاہیے۔",
      "اگر ترجمہ کسی اور کا ہے تو مترجم کا نام ضرور لکھیں۔",
      "غلط یا بغیر حوالے کے ترجمے والے مضامین مسترد کیے جا سکتے ہیں۔"
    ]
  },
  {
    title: "اتفاق",
    content: [
      "مضمون پوسٹ کرنے کا مطلب ہے کہ:",
      "آپ کا مواد جائزہ اور تدوین کے عمل سے گزر سکتا ہے۔",
      "اصولوں کی خلاف ورزی پر بغیر اطلاع کے حذف کیا جا سکتا ہے۔"
    ]
  }
];

// Helper to convert numbers to Urdu numerals
function toUrduNumber(n: number) {
  const urduDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return n.toString().split('').map(d => urduDigits[parseInt(d)]).join('');
}

// Helper to detect attention/note lines
function isAttentionLine(line: string, lang: 'en' | 'ur') {
  if (lang === 'en') {
    const trimmed = line.trim().replace(/[.]/g, '').toLowerCase();
    return (
      /rejected|removed|note|attention/i.test(line) ||
      trimmed === 'plagiarized or duplicate articles will be taken down' ||
      trimmed === 'poor or uncredited translations may lead to content rejection' ||
      trimmed === 'non-compliant articles may be deleted without notice'
    );
  } else {
    // Urdu: look for 'حذف', 'نوٹ', 'توجہ', 'مسترد'
    return /حذف|نوٹ|توجہ|مسترد/.test(line);
  }
}

export default function TermsPage() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const sections = lang === 'en' ? englishSections : urduSections;
  const header = lang === 'en' ? englishHeader : urduHeader;
  const headerContent = lang === 'en' ? englishHeaderContent : urduHeaderContent;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-6 px-2 sm:py-10 sm:px-4">
      {/* SVG Blurred Background */}
      <svg className="absolute -top-32 -left-32 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-30 blur-2xl select-none pointer-events-none" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="300" r="300" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 300) scale(300)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {/* Sticky Back Button */}
      <Link href="/articles" className="fixed top-3 left-3 z-50 sm:top-6 sm:left-6">
        <Button variant="outline" className="backdrop-blur bg-white/60 dark:bg-gray-900/60 border border-emerald-200 dark:border-gray-800 shadow-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2">
          ← Back to Articles
        </Button>
      </Link>
      {/* Glassmorphism Card */}
      <div className="w-full max-w-lg sm:max-w-2xl mx-auto rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-10 animate-fade-in relative z-10 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-emerald-100 dark:border-gray-800">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 h-12 w-12 sm:h-16 sm:w-16 shadow-lg border-4 border-white dark:border-gray-900 -mt-10 sm:-mt-16 mb-2">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-700 dark:text-emerald-400" />
          </span>
        </div>
        {/* Language Toggle */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center flex-wrap">
          <Button
            variant={lang === 'en' ? 'default' : 'outline'}
            className={`rounded-full px-4 sm:px-7 py-2 text-sm sm:text-base font-semibold shadow-sm transition-all duration-200 flex items-center gap-2 ${lang === 'en' ? 'bg-emerald-700 text-white scale-105' : ''}`}
            onClick={() => setLang('en')}
          >
            <Globe className="h-4 w-4" /> English
          </Button>
          <Button
            variant={lang === 'ur' ? 'default' : 'outline'}
            className={`rounded-full px-4 sm:px-7 py-2 text-sm sm:text-base font-semibold shadow-sm transition-all duration-200 flex items-center gap-2 ${lang === 'ur' ? 'bg-emerald-700 text-white scale-105' : ''}`}
            onClick={() => setLang('ur')}
          >
            <Globe className="h-4 w-4" /> اردو
          </Button>
        </div>
        <div className="border-b border-emerald-100 dark:border-gray-800 mb-6 sm:mb-8"></div>
        <h2 className={`text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-3 text-emerald-900 dark:text-emerald-100 tracking-tight font-serif text-center drop-shadow-lg ${lang === 'ur' ? 'font-arabic text-right' : ''}`}>{header}</h2>
        <p className={`mb-6 sm:mb-8 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center font-sans ${lang === 'ur' ? 'font-arabic text-right' : ''}`}>{headerContent}</p>
        <div className="space-y-8 sm:space-y-10 mt-6 sm:mt-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              {lang === 'ur' ? (
                <h3 className="text-xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-200 font-serif mb-3 sm:mb-4 flex items-center gap-2 font-arabic text-right justify-end">
                  <span>{section.title}</span>
                  <span className="inline-block w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-base sm:text-lg font-bold border border-emerald-200 dark:border-emerald-800 ml-2">{toUrduNumber(idx + 1)}</span>
                </h3>
              ) : (
                <h3 className="text-lg sm:text-2xl font-bold text-emerald-800 dark:text-emerald-200 font-serif mb-3 flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-base sm:text-lg font-bold border border-emerald-200 dark:border-emerald-800">{idx + 1}</span>
                  <span>{section.title}</span>
                </h3>
              )}
              <div className={`prose dark:prose-invert max-w-none ${lang === 'ur' ? 'font-arabic text-right text-base sm:text-xl leading-8 sm:leading-9' : 'text-sm sm:text-base leading-6 sm:leading-7 font-sans'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
                {section.content.map((line, i) =>
                  isAttentionLine(line, lang) ? (
                    <div
                      key={i}
                      className={`flex items-start gap-2 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 my-2 ${lang === 'ur' ? 'justify-end' : ''}`}
                    >
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="font-semibold text-yellow-900 dark:text-yellow-200">{line}</span>
                    </div>
                  ) : (
                    <p key={i}>{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
