"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe2, Bold, Italic, Underline as UnderlineIcon, Strikethrough, Link as LinkIcon, List, ListOrdered, Quote, Code, Highlighter } from "lucide-react";
import { EditorContent, useEditor, Editor, BubbleMenu } from "@tiptap/react";
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
import { useRef } from "react";

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
  const [activeLang, setActiveLang] = useState<LangCode>("en");
  const [form, setForm] = useState<Record<LangCode, { title: string; content: string }> & { topic: string }>({
    en: { title: "", content: "" },
    ur: { title: "", content: "" },
    ar: { title: "", content: "" },
    topic: "",
  });
  const [showLangs, setShowLangs] = useState(false);
  // TODO: Replace with real topics from API
  const topics = [
    { id: 1, name: "Education" },
    { id: 2, name: "Aqeedah" },
    { id: 3, name: "Ethics" },
  ];

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

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, topic: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Article submitted! (Demo only)\n\n${LANGUAGES.map(lang => `${lang.label}:\nTitle: ${form[lang.code].title}\nContent: ${form[lang.code].content.slice(0, 100)}...`).join("\n\n")}`
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#fafaf9] dark:bg-gray-950 flex flex-col items-center py-8 px-2">
      {/* Floating Language Switcher */}
      <div className="fixed top-6 right-6 z-30">
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 text-base font-semibold shadow hover:bg-emerald-50 dark:hover:bg-gray-800" onClick={() => setShowLangs(!showLangs)}>
          <Globe2 className="w-5 h-5" />
          {LANGUAGES.find(l => l.code === activeLang)?.label}
        </Button>
        {showLangs && (
          <div className="mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-emerald-100 dark:border-gray-800 p-2 flex flex-col">
            {LANGUAGES.map(lang => (
              <button key={lang.code} className={`px-4 py-2 text-left rounded hover:bg-emerald-50 dark:hover:bg-gray-800 ${activeLang === lang.code ? 'font-bold text-emerald-700 dark:text-emerald-300' : ''}`} onClick={() => { setActiveLang(lang.code); setShowLangs(false); }}>
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-2 mt-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <select
            className="ml-2 px-3 py-2 rounded-lg border border-emerald-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-emerald-900 dark:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={form.topic}
            onChange={handleTopicChange}
            required
          >
            <option value="" disabled>Select a topic</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl px-0 md:px-10 py-8 md:py-14 transition-all max-w-2xl mx-auto w-full">
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
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="px-8 py-3 font-bold text-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl shadow-lg transition-all"
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
} 