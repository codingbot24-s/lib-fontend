"use client";
import { useState, useEffect } from "react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";import { AdminRecentBooksTable } from "@/components/admin/admin-recent-book-table";
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
          {/* <AdminStatCards /> */}
        </div>

        {/* Main Content Tabs - Improved mobile navigation */}
        <Tabs defaultValue="recent" className="space-y-4">
          {/* Mobile-first tab navigation */}
          <div className="w-full overflow-hidden">
            <TabsList className="flex h-auto w-full overflow-x-auto border-b border-emerald-100 bg-transparent p-0 dark:border-emerald-800">
              
          
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

        

          {/* Recent Activity Tab - Enhanced mobile experience */}
        </Tabs>

        {/* Bottom Section - Completely responsive grid */}
      </div>
    </div>
  );
}
