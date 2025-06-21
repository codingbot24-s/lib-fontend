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
import { useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface Topic {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

interface ResponsiveBookCardProps {
  book: {
    id: number;
    title: string;
    arabictitle: string;
    scholar: string;
    topic_id: number;
    topic: Topic;
    language: string;
    edition: string;
    coverimage: string;
    viewpdfurl: string;
    download_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    rating? : number;
    publishYear?: string;
    volumes?: Array<{
      id: number;
      book_id: number;
      volume_number: number;
      archive_id: string;
      archive_url: string;
      download_url: string;
      cover_image: string;
      created_at: string;
      updated_at: string;
    }>;
  };
  compact?: boolean;
}

export default function ResponsiveBookCard({ book, compact = false }: ResponsiveBookCardProps) {
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
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-black hover:shadow-lg transition-shadow",
      compact ? "text-xs" : "text-sm sm:text-base"
    )}>
      {/* Book Cover */}
      <div className={cn(
        "relative bg-gray-100 dark:bg-gray-700 overflow-hidden",
        compact ? "aspect-[2/3]" : "aspect-[2/3]"
      )}>
        <div className="absolute inset-0">
          {!book.coverimage || imageError ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-700">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <Image
              src={book.coverimage}
              alt={book.title}
              fill
              priority
              className="object-contain hover:object-cover transition-all duration-500"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Language badge */}
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className={cn(
            "bg-white/90 text-gray-800 dark:bg-black/50 dark:text-white backdrop-blur-sm",
            compact ? "text-[10px] px-1" : "text-xs"
          )}>
            <Globe className={cn("mr-1", compact ? "h-2 w-2" : "h-3 w-3")} />
            {book.language}
          </Badge>
        </div>

        {/* Volumes badge */}
        {book.volumes && book.volumes.length > 1 && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className={cn(
              "bg-emerald-600/90 text-white backdrop-blur-sm",
              compact ? "text-[10px] px-1" : "text-xs"
            )}>
              {book.volumes.length} Volumes
            </Badge>
          </div>
        )}
      </div>

      <div className={cn(
        "flex flex-1 flex-col",
        compact ? "p-2 space-y-1" : "p-4 space-y-2"
      )}>
        {/* Title and Arabic Title */}
        <div className="space-y-1">
          <h3 className={cn(
            "font-bold text-emerald-900 text-[15px] dark:text-white line-clamp-2 leading-tight sm:block",
            compact ? "hidden" : "text-sm sm:text-base" // Hide on mobile in compact mode
          )}>
            {book.title}
          </h3>
          <p className={cn(
            "text-amber-700 dark:text-gray-300 leading-relaxed line-clamp-1",
            compact ? "text-[10px]" : "text-xs sm:text-sm" // Show only on mobile in compact mode in mobile text small
          )}>
            {book.arabictitle}
          </p>
        </div>

        {/* Author - hide on mobile in compact mode */}
        <p className={cn(
          "text-gray-600 dark:text-gray-300 font-medium line-clamp-1 sm:block",
          compact ? "hidden" : "text-xs sm:text-sm"
        )}>
          {book.scholar}
        </p>
      </div>

      {/* Keep the footer but make it smaller */}
      <CardFooter className={cn(
        "space-y-1",
        compact ? "p-2 pt-0" : "p-3 sm:p-4 pt-0 space-y-2"
      )}>
        {book.volumes && book.volumes.length > 1 ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900"
          >
            <Link href={`/library/books/${book.id}/volumes`}>
              <BookOpen className={cn("mr-2", compact ? "h-2 w-2" : "h-3 w-3 sm:h-4 sm:w-4")} />
              View Volumes
            </Link>
          </Button>
        ) : (
          <div className="w-full space-y-1">
            <Button
              asChild
              size="sm"
              className={cn("w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black", 
                compact ? "h-7 text-xs" : "")}
            >
              <a href={book.viewpdfurl} target="_blank" rel="noopener noreferrer">
                <BookOpen className={cn("mr-2", compact ? "h-2 w-2" : "h-3 w-3 sm:h-4 sm:w-4")} />
                Read Now
              </a>
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              size="sm"
              className={cn(
                "w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-900",
                compact && "h-7 text-xs"
              )}
            >
              {isDownloading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className={cn("mr-2", compact ? "h-2 w-2" : "h-3 w-3 sm:h-4 sm:w-4")} />
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
