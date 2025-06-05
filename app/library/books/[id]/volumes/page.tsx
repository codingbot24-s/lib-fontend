"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

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
        const response = await axios.get<ApiResponse>(`http://localhost:8000/api/books/${params.id}`);
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
        `http://localhost:8000/api/download/${volume.id}`,
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
          {book.title}
        </h1>
        <p className="text-xl text-amber-700 dark:text-amber-400 mb-4">
          {book.arabictitle}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          By {book.scholar}
        </p>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <p>Publisher: {book.publisher}</p>
          <p>Edition: {book.edition}</p>
          <p>Language: {book.language}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {book.volumes.map((volume) => (
          <Card key={volume.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Volume {volume.volume_number}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {volume.cover_image ? (
                <img
                  src={volume.cover_image}
                  alt={`Volume ${volume.volume_number} cover`}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                asChild
                size="sm"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                <a href={volume.download_url} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Now
                </a>
              </Button>
              <Button
                onClick={() => handleDownload(volume)}
                disabled={downloading === volume.id || !volume.download_url}
                variant="outline"
                size="sm"
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
              >
                {downloading === volume.id ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
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