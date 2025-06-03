"use client";

import { CardFooter } from "@/components/ui/card";
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
  const [imageError, setImageError] = useState(false);
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
      {/* Book Cover with improved image handling */}
      <div className="aspect-[2/3] relative bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imageError ? "/placeholder-book.jpg" : book.coverimage}
            alt={book.title}
            fill
            priority
            className="object-contain hover:object-cover transition-all duration-500"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Error state overlay */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-800">
            <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {book.title}
            </span>
          </div>
        )}

        {/* Language badge */}
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 dark:bg-black/50 dark:text-white backdrop-blur-sm text-xs">
            <Globe className="h-3 w-3 mr-1" />
            {book.language}
          </Badge>
        </div>

        {/* Volumes badge if applicable */}
        {book.volumes && book.volumes > 1 && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-emerald-600/90 text-white backdrop-blur-sm text-xs">
              {book.volumes} Volumes
            </Badge>
          </div>
        )}
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
