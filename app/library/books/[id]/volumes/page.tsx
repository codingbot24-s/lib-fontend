"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

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
  created_at: string;
  updated_at: string;
}

interface Book {
  id: number;
  title: string;
  arabictitle: string;
  scholar: string;
  topic_id: number;
  topic: Topic;
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
}

interface ApiResponse {
  book: Book;
}

export default function BookVolumesPage() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${BACKEND_URL}/api/books/${params.id}`);
        
        setBook(response.data.book);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  const handleDownload = async (volume: Volume) => {
    if (!volume.download_url) {
      console.error("No download URL available for this volume");
      return;
    }

    try {
      setDownloading(volume.id);
      const response = await axios.get(
        `${BACKEND_URL}/api/download/${volume.id}`,
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
      link.setAttribute("download", `${book?.title}-volume-${volume.volume_number}.pdf`);
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
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Book not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/50 dark:to-amber-950/50 rounded-2xl p-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-emerald-900 dark:text-emerald-100 mb-3 tracking-tight">
            {book.title}
          </h1>
          <p className="text-2xl text-amber-700 dark:text-amber-400 mb-6 font-medium">
            {book.arabictitle}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <span className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                {book.scholar.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                By {book.scholar}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {book.topic.name}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">Publisher</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">{book.publisher}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">Edition</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">{book.edition}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">Language</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">{book.language}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {book.volumes.map((volume) => (
          <Card 
            key={volume.id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm">
                  Volume {volume.volume_number}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {volume.cover_image ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={volume.cover_image}
                    alt={`Volume ${volume.volume_number} cover`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="relative aspect-[3/4] bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-emerald-900/50 dark:to-amber-900/50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-emerald-400 dark:text-emerald-500" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pt-4">
              <Button
                asChild
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200"
              >
                <a href={volume.download_url} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Now
                </a>
              </Button>
              <Button
                onClick={() => handleDownload(volume)}
                disabled={downloading === volume.id || !volume.download_url}
                variant="outline"
                size="lg"
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 transition-all duration-200"
              >
                {downloading === volume.id ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 