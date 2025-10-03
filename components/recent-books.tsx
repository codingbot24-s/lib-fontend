const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

interface Topic {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Volume {
  id: number;
  book_id: number;
  volume_number: number;
  archive_id: string;
  archive_url: string;
  download_url: string;
  cover_image: string;
  viewpdfurl: string;
  created_at: string;
  updated_at: string;
}

interface Book {
  id: number;
  title: string;
  arabictitle: string;
  scholar: string;
  language: string;
  publisher: string;
  edition: string;
  coverimage: string;
  viewpdfurl: string;
  download_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  volumes: Volume[];
  topic: Topic[];
}

interface ApiResponse {
  books: Book[];
}

export default function RecentBooks() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${BACKEND_URL}/api/books/recent`);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  const handleDownload = async (book: Book) => {
    const downloadUrl = book.volumes?.[0]?.download_url || book.download_url;
    const itemId = book.volumes?.[0]?.id || book.id;
    const title = book.volumes?.[0] ? `Volume ${book.volumes[0].volume_number}` : book.title;

    if (!downloadUrl) {
      console.error("No download URL available");
      return;
    }

    try {
      setDownloading(itemId);
      const response = await axios.get(
        `${BACKEND_URL}/api/download/${itemId}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white dark:bg-black rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 mb-4 text-emerald-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Books Available</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          We couldn&apos;t find any recent books at the moment. Please check back later for new additions to our library.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 group"
        >
          <div className="relative h-32 sm:h-48 md:h-56 lg:h-64">
            <Image
              src={book.coverimage || "/placeholder.svg"}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-2 sm:p-4 w-full space-y-1 sm:space-y-2">
                {book.volumes && book.volumes.length > 1 ? (
                  <Button
                    onClick={() => router.push(`/library/books/${book.id}/volumes`)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black text-xs sm:text-sm py-1 sm:py-2"
                  >
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> View Volumes
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black text-xs sm:text-sm py-1 sm:py-2"
                    >
                      <a href={book.volumes?.[0]?.viewpdfurl || book.viewpdfurl} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Read Now
                      </a>
                    </Button>
                    <Button
                      onClick={() => handleDownload(book)}
                      disabled={downloading === book.id || !(book.volumes?.[0]?.download_url || book.download_url)}
                      variant="outline"
                      className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900 text-xs sm:text-sm py-1 sm:py-2"
                    >
                      {downloading === book.id ? (
                        <>
                          <Spinner size="sm" className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm">Download</span>
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="p-2 sm:p-4">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
              {book.title}
            </h3>
            <p className="text-sm sm:text-base text-amber-700 dark:text-gray-300 mb-1 sm:mb-2 line-clamp-1">
              {book.arabictitle}
            </p>
            <p className="text-xs sm:text-sm text-emerald-700 dark:text-gray-400 mb-1 sm:mb-2 line-clamp-1">
              By {book.scholar}
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {book.topic.map((topic) => (
                <span
                  key={topic.id}
                  className="text-[10px] sm:text-xs bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                >
                  {topic.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 