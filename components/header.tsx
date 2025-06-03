"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Menu, Search, ChevronDown, User, BookText, FileText, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchBar from "@/components/search/search-bar"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  // Add scroll event listener when component mounts
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-emerald-700 dark:bg-emerald-600 rounded-full opacity-20 animate-pulse"></div>
              <BookOpen className="h-8 w-8 text-emerald-700 dark:text-emerald-500 relative z-10" />
            </div>
            <div>
              <span className="text-xl font-bold text-emerald-900 dark:text-emerald-100 font-display">
                Bayt al-Kutub
              </span>
              <span className="block text-xs text-gold font-arabic">بيت الكتب</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md"
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  Quran <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {/* <DropdownMenuItem>Read Quran</DropdownMenuItem> */}

                <DropdownMenuItem>Tafasir</DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  Hadith <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem>Sahih Bukhari</DropdownMenuItem>
                <DropdownMenuItem>Sahih Muslim</DropdownMenuItem>
                <DropdownMenuItem>Jami at-Tirmidhi</DropdownMenuItem>
                <DropdownMenuItem>Sunan Abu Dawood</DropdownMenuItem>
                <DropdownMenuItem>Sunan an-Nasa'i</DropdownMenuItem>
                <DropdownMenuItem>Sunan Ibn Majah</DropdownMenuItem>
                {/* // Browse all will point on all hadith  */}
                <DropdownMenuItem>Browse All Collections</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  Fiqh <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem>Hanafi</DropdownMenuItem>
                <DropdownMenuItem>Shafai</DropdownMenuItem>
                <DropdownMenuItem>Maliki</DropdownMenuItem>
                <DropdownMenuItem>Hanbali</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400"
                >
                  Dars e Nizami <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem>Arabic Haftum</DropdownMenuItem>
                <DropdownMenuItem>Arabic Shashum</DropdownMenuItem>
                <DropdownMenuItem>Arabic Panjum</DropdownMenuItem>
                <DropdownMenuItem>Arabic Charum</DropdownMenuItem>
                <DropdownMenuItem>Arabic Soum</DropdownMenuItem>
                <DropdownMenuItem>Arabic Doum</DropdownMenuItem>
                <DropdownMenuItem>Arabic Awwal</DropdownMenuItem> 
               <DropdownMenuItem>Farsi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <Link
              href="/library"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md"
            >
              Library
            </Link>

            <Link
              href="/articles"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md"
            >
              Articles
            </Link>

            <Link
              href="/forum"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-md"
            >
              Forum
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>العربية</DropdownMenuItem>
                <DropdownMenuItem>اردو</DropdownMenuItem>
                <DropdownMenuItem>Bahasa Indonesia</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-emerald-100 text-emerald-800">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookText className="mr-2 h-4 w-4" />
                  <span>My Library</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Reading History</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="hidden md:flex bg-emerald-700 hover:bg-emerald-800 text-white">Sign In</Button>
            {/* TODO: make a mobile navbar according the nav in desktop */}
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Fixed Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <SheetHeader>
                      <SheetTitle className="flex items-center mb-6">
                        <BookOpen className="h-6 w-6 text-emerald-700 dark:text-emerald-500 mr-2" />
                        <span className="text-lg font-bold text-emerald-900 dark:text-emerald-100 font-display">
                          Bayt al-Kutub
                        </span>
                      </SheetTitle>
                    </SheetHeader>
                    <SearchBar />
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                      {/* Navigation Links */}
                      <div className="space-y-4">
                        <Link
                          href="/"
                          className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        >
                          Home
                        </Link>

                        {/* Quran Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3">
                            <span className="font-medium">Quran</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            <Link
                              href="/quran/tafsir"
                              className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md"
                            >
                              Tafasir
                            </Link>
                          </div>
                        </div>

                        {/* Hadith Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3">
                            <span className="font-medium">Hadith</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            {[
                              "Sahih Bukhari",
                              "Sahih Muslim",
                              "Jami at-Tirmidhi",
                              "Sunan Abu Dawood",
                              "Sunan an-Nasa'i",
                              "Sunan Ibn Majah",
                            ].map((collection) => (
                              <Link
                                key={collection}
                                href={`/hadith/${collection.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md"
                              >
                                {collection}
                              </Link>
                            ))}
                            <Link
                              href="/hadith/collections"
                              className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md"
                            >
                              Browse All Collections
                            </Link>
                          </div>
                        </div>

                        {/* Fiqh Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3">
                            <span className="font-medium">Fiqh</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            {["Hanafi", "Shafai", "Maliki", "Hanbali"].map((madhab) => (
                              <Link
                                key={madhab}
                                href={`/fiqh/${madhab.toLowerCase()}`}
                                className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md"
                              >
                                {madhab}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Dars e Nizami Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3">
                            <span className="font-medium">Dars e Nizami</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            {[
                              "Arabic Haftum",
                              "Arabic Shashum",
                              "Arabic Panjum",
                              "Arabic Charum",
                              "Arabic Soum",
                              "Arabic Doum",
                              "Arabic Awwal",
                              "Farsi"
                            ].map((level) => (
                              <Link
                                key={level}
                                href={`/dars-e-nizami/${level.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md"
                              >
                                {level}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Other Links */}
                        {[
                          { href: "/categories", label: "Categories" },
                          { href: "/library", label: "Library" },
                          { href: "/articles", label: "Articles" },
                          { href: "/forum", label: "Forum" },
                        ].map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fixed Footer */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                        <ThemeToggle />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Language</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Globe className="h-4 w-4" /> English
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>English</DropdownMenuItem>
                            <DropdownMenuItem>العربية</DropdownMenuItem>
                            <DropdownMenuItem>اردو</DropdownMenuItem>
                            <DropdownMenuItem>Bahasa Indonesia</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                          Sign In
                        </Button>
                        <Button variant="outline" className="w-full">
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      {showSearch && (
        <div className="absolute left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-4">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  )
}
