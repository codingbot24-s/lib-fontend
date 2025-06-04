"use client";
import { useState, useEffect } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminStatCards } from "@/components/admin/admin-stats-card";
import { AdminRecentBooksTable } from "@/components/admin/admin-recent-book-table";
import { AdminTopicGrid } from "@/components/admin/admin-topic-grid";
import { AdminQuickUploadModal } from "@/components/admin/admin-quick-uplaod-modal";
import { toast } from "sonner";
import axios from "axios";
import { Book } from "@/types/book";

export default function AdminDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookCreated = () => {
    // Handle book creation success if needed
    toast.success("Book created successfully");
  };

  useEffect(() => {
    const fetchRecentBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/books/recent"
        );
        setRecentBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching recent books:", error);
        toast.error("Failed to load recent books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Container with proper responsive padding */}
      <div className="container mx-auto max-w-7xl space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6 lg:p-8">
        {/* Page Header - Fully responsive */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-50 sm:text-2xl md:text-3xl lg:text-4xl">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
              Welcome to Bayt al-Kutub Islamic Library Administration
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <AdminQuickUploadModal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              onSuccess={() => setIsModalOpen(false)}
            />
          </div>
        </div>

        {/* Stats Cards Grid - Enhanced mobile layout */}
        <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <AdminStatCards />
        </div>

        {/* Main Content Tabs - Improved mobile navigation */}
        <Tabs defaultValue="recent" className="space-y-4">
          {/* Mobile-first tab navigation */}
          <div className="w-full overflow-hidden">
            <TabsList className="flex h-auto w-full overflow-x-auto border-b border-emerald-100 bg-transparent p-0 dark:border-emerald-800">
              <TabsTrigger
                value="recent"
                className="flex-1 min-w-0 whitespace-nowrap rounded-none border-b-2 border-transparent px-2 py-3 text-xs hover:text-emerald-700 data-[state=active]:border-emerald-700 data-[state=active]:text-emerald-700 sm:px-4 sm:text-sm md:flex-none md:px-6"
              >
                Recent Books
              </TabsTrigger>
              <TabsTrigger
                value="topics"
                className="flex-1 min-w-0 whitespace-nowrap rounded-none border-b-2 border-transparent px-2 py-3 text-xs hover:text-emerald-700 data-[state=active]:border-emerald-700 data-[state=active]:text-emerald-700 sm:px-4 sm:text-sm md:flex-none md:px-6"
              >
                Books by Topic
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex-1 min-w-0 whitespace-nowrap rounded-none border-b-2 border-transparent px-2 py-3 text-xs hover:text-emerald-700 data-[state=active]:border-emerald-700 data-[state=active]:text-emerald-700 sm:px-4 sm:text-sm md:flex-none md:px-6"
              >
                Recent Activity
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Recent Books Content - Enhanced mobile layout */}
          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader className="space-y-3 sm:flex sm:items-start sm:justify-between sm:space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    Recently Added Books
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Manage and review recently added books
                  </CardDescription>
                </div>
                <Link href="/admin/books" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <span className="sm:hidden">View All Books</span>
                    <span className="hidden sm:inline">View All</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                  <AdminRecentBooksTable
                    books={recentBooks}
                    isLoading={isLoading}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Books by Topic Tab - Mobile optimized */}
          <TabsContent value="topics" className="space-y-4">
            <Card>
              <CardHeader className="space-y-1 sm:space-y-2">
                <CardTitle className="text-base sm:text-lg md:text-xl">
                  Books by Topic
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Overview of books categorized by Islamic topics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <AdminTopicGrid />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab - Enhanced mobile experience */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader className="space-y-1 sm:space-y-2">
                <CardTitle className="text-base sm:text-lg md:text-xl">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Latest actions by administrators and users
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {/* Activity Items - Mobile optimized */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 pb-3 border-b last:border-0 border-dashed border-emerald-100 dark:border-emerald-900/50 sm:gap-4 sm:pb-4"
                    >
                      <Avatar className="h-7 w-7 border-2 border-emerald-100 dark:border-emerald-800 sm:h-8 sm:w-8 md:h-9 md:w-9">
                        <AvatarImage
                          src={`/placeholder.svg?height=36&width=36&text=U${i}`}
                        />
                        <AvatarFallback className="text-xs sm:text-sm">
                          U{i}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="text-xs leading-relaxed sm:text-sm sm:line-clamp-2">
                          <span className="font-medium">Admin User {i}</span>{" "}
                          {i % 2 === 0
                            ? "added a new book"
                            : "updated book details"}{" "}
                          <span className="font-medium text-emerald-700 dark:text-emerald-400 break-words">
                            {i % 2 === 0
                              ? "Riyadh as-Saliheen"
                              : "Bulugh al-Maram"}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i} hour{i !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Section - Completely responsive grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* User Engagement Card - Full width on mobile/tablet */}
          <Card className="lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                User Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              {/* Stats Grid - Responsive from 2 cols mobile to 4 cols desktop */}
              <div className="grid gap-3 grid-cols-2 sm:gap-4 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Active Users
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400 sm:text-xl md:text-2xl">
                    2,845
                  </p>
                  <p className="text-xs text-emerald-600 sm:text-xs">
                    ↑ 12% from last month
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Books Read
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400 sm:text-xl md:text-2xl">
                    12,456
                  </p>
                  <p className="text-xs text-emerald-600 sm:text-xs">
                    ↑ 8% from last month
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    New Signups
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400 sm:text-xl md:text-2xl">
                    342
                  </p>
                  <p className="text-xs text-emerald-600 sm:text-xs">
                    ↑ 24% from last month
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Avg. Session
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400 sm:text-xl md:text-2xl">
                    18:24
                  </p>
                  <p className="text-xs text-emerald-600 sm:text-xs">
                    ↑ 3% from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Scholars Card - Mobile optimized */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base md:text-lg">
                Popular Scholars
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Most viewed scholars this month
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: "Imam an-Nawawi", books: 42, views: 1245 },
                  { name: "Ibn Taymiyyah", books: 38, views: 982 },
                  { name: "Ibn Kathir", books: 29, views: 876 },
                  { name: "Ibn al-Qayyim", books: 35, views: 754 },
                ].map((scholar, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 sm:gap-4"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 sm:gap-3">
                      <Avatar className="h-8 w-8 border-2 border-emerald-100 sm:h-9 sm:w-9 md:h-10 md:w-10">
                        <AvatarImage
                          src={`/placeholder.svg?text=${scholar.name.charAt(
                            0
                          )}`}
                        />
                        <AvatarFallback className="text-xs sm:text-sm">
                          {scholar.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-xs sm:text-sm md:text-base">
                          {scholar.name}
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          {scholar.books} books
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-xs px-2 py-1"
                    >
                      <span className="hidden sm:inline">
                        {scholar.views.toLocaleString()} views
                      </span>
                      <span className="sm:hidden">
                        {scholar.views > 999
                          ? `${Math.floor(scholar.views / 1000)}k`
                          : scholar.views}
                      </span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
