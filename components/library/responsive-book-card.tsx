"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  BookOpen,
  Globe,
  Calendar,
  Volume2,
  Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";
import { useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

interface ResponsiveBookCardProps {
  book: Book;
}

export default function ResponsiveBookCard({ book }: ResponsiveBookCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await axios.get(
        `http://localhost:8000/api/download/${book.id}`,
        {
          responseType: "blob",
        }
      );

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.title}.pdf`); // or use the filename from Content-Disposition header
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      {/* Book Cover */}
      <div className="aspect-h-4 aspect-w-3 relative">
        <Image
          unoptimized
          priority
          fill
          src={book.coverimage || "/placeholder.svg"}
          alt={book.title}
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-4">
        {/* Title and Arabic Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-emerald-900 dark:text-emerald-100 line-clamp-2 leading-tight text-sm sm:text-base">
            {book.title}
          </h3>
          {book.arabicTitle && (
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-arabic leading-relaxed line-clamp-1">
              {book.arabicTitle}
            </p>
          )}
        </div>

        {/* Author */}
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium line-clamp-1">
          {book.scholar}
        </p>

        {/* Topic and Rating */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs flex-shrink-0"
          >
            {book.topic}
          </Badge>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              {book.rating}
            </span>
          </div>
        </div>

        {/* Publication Year */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Published {book.publishYear}</span>
        </div>
      </div>

      <CardFooter className="p-3 sm:p-4 pt-0 space-y-2">
        {book.volumes && book.volumes > 1 ? (
          <div className="w-full space-y-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 text-xs sm:text-sm"
            >
              <Link href={`/library/books/${book.id}/volumes`}>
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View Volumes
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm"
            >
              <Link href={`/library/books/${book.id}`}>View Details</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <Button
              asChild
              size="sm"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm"
            >
              <Link href={`/library/books/${book.id}`}>
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Read Now
              </Link>
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              size="sm"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 text-xs sm:text-sm"
            >
              {isDownloading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>
        )}
      </CardFooter>
    </div>
  );
}
