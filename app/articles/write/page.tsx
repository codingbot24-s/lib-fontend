"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe2, BookOpen, Check, Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, Quote, Code, Highlighter } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Topic {
  id: number;
  name: string;
  description: string;
}

const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ur", label: "اردو", dir: "rtl" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

type LangCode = typeof LANGUAGES[number]["code"];

const extensions = [
  StarterKit,
  UnderlineExtension,
  Link,
  Image,
  Table.configure({ resizable: true }),
  TableRow,
  TableCell,
  TableHeader,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight,
  Placeholder,
];

function MediumBubbleMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, zIndex: 9999 }}
      shouldShow={({ editor }) =>
        editor.isFocused &&
        !editor.state.selection.empty &&
        editor.view.hasFocus() &&
        editor.state.selection.$from.parent.type.name !== 'doc'
      }
      className="flex gap-1 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-emerald-100 dark:border-gray-800 px-3 py-2 animate-fade-in z-[9999]"
    >
      <button title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><Bold className="w-5 h-5" /></button>
      <button title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><Italic className="w-5 h-5" /></button>
      <button title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><UnderlineIcon className="w-5 h-5" /></button>
      <button title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><Strikethrough className="w-5 h-5" /></button>
      <button title="Highlight" onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('highlight') ? 'bg-yellow-300 text-gray-900' : 'hover:bg-yellow-100 dark:hover:bg-yellow-900 text-gray-700 dark:text-gray-200'}`}><Highlighter className="w-5 h-5" /></button>
      <span className="w-px bg-emerald-100 dark:bg-gray-800 mx-1" />
      <button title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><List className="w-5 h-5" /></button>
      <button title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><ListOrdered className="w-5 h-5" /></button>
      <button title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><Quote className="w-5 h-5" /></button>
      <button title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('codeBlock') ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}><Code className="w-5 h-5" /></button>
      
    </BubbleMenu>
  );
}

export default function WriteArticlePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [activeLang, setActiveLang] = useState<LangCode>("en");
  const [form, setForm] = useState<Record<LangCode, { title: string; content: string }> & { topic: string }>({
    en: { title: "", content: "" },
    ur: { title: "", content: "" },
    ar: { title: "", content: "" },
    topic: "",
  });
  const [showLangs, setShowLangs] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopicSelector, setShowTopicSelector] = useState(false);

  // Redirect if not authenticated
  if (isLoaded && !user) {
    redirect('/auth')
  }

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-200 border-t-emerald-600"></div>
      </div>
    )
  }

  // Fetch topics from API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/topics');
        setTopics(response.data.topics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        // Fallback to default topics if API fails
        setTopics([
          { id: 1, name: "Education", description: "Islamic education and learning" },
          { id: 2, name: "Aqeedah", description: "Islamic beliefs and theology" },
          { id: 3, name: "Ethics", description: "Islamic ethics and morality" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // One Tiptap editor instance per language
  const editors = {
    en: useEditor({
      extensions: [
        ...extensions,
        Placeholder.configure({ placeholder: "Tell your story..." }),
      ],
      content: form.en.content,
      editorProps: {
        attributes: {
          class: `min-h-[400px] focus:outline-none text-xl leading-relaxed bg-transparent font-serif`,
          dir: "ltr",
        },
      },
      onUpdate: ({ editor }) => {
        setForm((prev) => ({ ...prev, en: { ...prev.en, content: editor.getHTML() } }));
      },
    }),
    ur: useEditor({
      extensions: [
        ...extensions,
        Placeholder.configure({ placeholder: "اپنی کہانی لکھیں..." }),
      ],
      content: form.ur.content,
      editorProps: {
        attributes: {
          class: `min-h-[400px] focus:outline-none text-xl leading-relaxed bg-transparent font-arabic font-serif`,
          dir: "rtl",
        },
      },
      onUpdate: ({ editor }) => {
        setForm((prev) => ({ ...prev, ur: { ...prev.ur, content: editor.getHTML() } }));
      },
    }),
    ar: useEditor({
      extensions: [
        ...extensions,
        Placeholder.configure({ placeholder: "اكتب قصتك..." }),
      ],
      content: form.ar.content,
      editorProps: {
        attributes: {
          class: `min-h-[400px] focus:outline-none text-xl leading-relaxed bg-transparent font-arabic font-serif`,
          dir: "rtl",
        },
      },
      onUpdate: ({ editor }) => {
        setForm((prev) => ({ ...prev, ar: { ...prev.ar, content: editor.getHTML() } }));
      },
    }),
  };
  const activeEditor = editors[activeLang];

  const handleChange = (lang: LangCode, field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleTopicSelect = (topicId: string) => {
    setForm((prev) => ({ ...prev, topic: topicId }));
    setShowTopicSelector(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Article submitted! (Demo only)\n\n${LANGUAGES.map(lang => `${lang.label}:\nTitle: ${form[lang.code].title}\nContent: ${form[lang.code].content.slice(0, 100)}...`).join("\n\n")}`
    );
  };

  const selectedTopic = topics.find(t => t.id.toString() === form.topic);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex flex-col items-center py-8 px-4">
      {/* Floating Language Switcher */}
      <div className="fixed top-6 right-6 z-30">
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 text-base font-semibold shadow-lg hover:bg-emerald-50 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" onClick={() => setShowLangs(!showLangs)}>
          <Globe2 className="w-5 h-5" />
          {LANGUAGES.find(l => l.code === activeLang)?.label}
        </Button>
        {showLangs && (
          <div className="mt-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-100 dark:border-gray-800 p-2 flex flex-col">
            {LANGUAGES.map(lang => (
              <button key={lang.code} className={`px-4 py-2 text-left rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors ${activeLang === lang.code ? 'font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20' : ''}`} onClick={() => { setActiveLang(lang.code); setShowLangs(false); }}>
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Topic Selection */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Back" className="hover:bg-emerald-50 dark:hover:bg-gray-800">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Article Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topic
                  </label>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowTopicSelector(!showTopicSelector)}
                      className="w-full justify-between px-4 py-3 text-left border-emerald-200 hover:bg-emerald-50 dark:border-gray-700 dark:hover:bg-gray-800 bg-white dark:bg-gray-800"
                      disabled={loading}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-emerald-600" />
                        <span className={selectedTopic ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}>
                          {selectedTopic ? selectedTopic.name : "Select topic"}
                        </span>
                      </div>
                      {selectedTopic && (
                        <Check className="h-5 w-5 text-emerald-600" />
                      )}
                    </Button>

                    {/* Topic Selector Modal */}
                    {showTopicSelector && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl border border-emerald-100 dark:border-gray-700 p-4 z-50">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Choose a Topic</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Select the most appropriate topic for your article</p>
                        </div>
                        
                        {loading ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-200 border-t-emerald-600"></div>
                          </div>
                        ) : (
                          <div className="grid gap-3 max-h-64 overflow-y-auto">
                            {topics.map((topic) => (
                              <button
                                key={topic.id}
                                type="button"
                                onClick={() => handleTopicSelect(topic.id.toString())}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                                  form.topic === topic.id.toString()
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{topic.name}</h4>
                                  {form.topic === topic.id.toString() && (
                                    <Check className="h-5 w-5 text-emerald-600" />
                                  )}
                                </div>
                                {topic.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowTopicSelector(false)}
                            className="w-full"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <div className="space-y-2">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        type="button"
                        className={`w-full px-4 py-2 text-left rounded-lg border-2 transition-all duration-200 ${
                          activeLang === lang.code 
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 text-gray-700 dark:text-gray-300'
                        }`}
                        onClick={() => setActiveLang(lang.code)}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="flex-1">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl px-6 md:px-10 py-8 md:py-14 transition-all w-full border border-emerald-100 dark:border-gray-700">
              <input
                type="text"
                dir={LANGUAGES.find(l => l.code === activeLang)?.dir}
                className="w-full text-4xl md:text-5xl font-bold border-none outline-none focus:ring-0 focus:border-none bg-transparent placeholder:text-gray-300 dark:placeholder:text-gray-700 mb-2 px-0 font-serif shadow-none"
                placeholder="Title"
                value={form[activeLang].title}
                onChange={e => handleChange(activeLang, "title", e.target.value)}
                style={{ fontFamily: LANGUAGES.find(l => l.code === activeLang)?.dir === "rtl" ? "'Noto Nastaliq Urdu', 'Amiri', serif" : undefined }}
                required
              />
              {/* BubbleMenu for formatting */}
              <MediumBubbleMenu editor={activeEditor} />
              <div className="min-h-[400px]">
                {/* Type and select text below to see the formatting menu! */}
                <EditorContent editor={activeEditor} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="px-8 py-3 font-bold text-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl shadow-lg transition-all transform hover:scale-105"
            disabled={!form.topic}
          >
            ✍️ Publish Article
          </Button>
        </div>
      </form>
    </div>
  );
} 