"use client"

import { useState, useEffect, use } from "react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Menu, Search, ChevronDown, User, BookText, LogOut, Settings, UserCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchBar from "@/components/search/search-bar"
import { useTopics } from "@/hooks/use-topics"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface Topic {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}



export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { getTopicIdByName } = useTopics()
  const [topics, setTopics] = useState<Topic[]>([])

  const { user } = useUser()
  const clerk = useClerk()
  const router = useRouter()

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

  // Fetch topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('/api/topics')
        setTopics(response.data)
      } catch (error) {
        console.error("Error fetching topics:", error)
      }
    }
    fetchTopics()
  })  

  // Get Fiqh madhabs from topics
  const fiqhMadhabs = topics.filter(topic => 
    topic.name.toLowerCase().startsWith('fiqh')
  )

  // Get Dars e Nizami levels from topics
  const darsENizamiLevels = topics.filter(topic => 
    topic.name.toLowerCase().includes('arabic') || 
    topic.name.toLowerCase().includes('farsi')
  ).sort((a, b) => {
    // Sort by level number if present
    const getLevelNumber = (name: string) => {
      const match = name.match(/\d+/)
      return match ? parseInt(match[0]) : 999 // Put non-numeric levels at the end
    }
    return getLevelNumber(a.name) - getLevelNumber(b.name)
  })

  const tafsirId = getTopicIdByName("tafsir")
  const hadithId = getTopicIdByName("hadith")

  
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-emerald-700 dark:bg-white rounded-full opacity-20 animate-pulse"></div>
              <BookOpen className="h-8 w-8 text-emerald-700 dark:text-white relative z-10" />
            </div>
            <div>
              <span className="text-xl font-bold text-emerald-900 dark:text-white font-display">
                Bayt al-Kutub
              </span>
              <span className="block text-xs text-gold dark:text-gray-400 font-arabic">بيت الكتب</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300 rounded-md"
            >
              Home
            </Link>

            {tafsirId && (
              <Link
                href={`/library/topic/${tafsirId}`}
                className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300 rounded-md"
              >
                Tafsir
              </Link>
            )}

            {hadithId && (
              <Link
                href={`/library/topic/${hadithId}`}
                className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300 rounded-md"
              >
                Hadith
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300"
                >
                  Fiqh <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {fiqhMadhabs.map((madhab) => (
                  <DropdownMenuItem key={madhab.id} asChild>
                    <Link href={`/library/topic/${madhab.id}`}>
                      {madhab.name.replace('Fiqh ', '')}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300"
                >
                  Dars e Nizami <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {darsENizamiLevels.map((level) => (
                  <DropdownMenuItem key={level.id} asChild>
                    <Link href={`/library/topic/${level.id}`}>
                      {level.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>


            <Link
              href="/library"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300 rounded-md"
            >
              Library
            </Link>

            {/* <Link
              href="/articles"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300 rounded-md"
            >
              Articles
            </Link> */}

            {/* <Link
              href="/forum"
              className="px-3 py-2 text-sm font-medium text-emerald-900 dark:text-white hover:text-emerald-700 dark:hover:text-gray-300 rounded-md"
            >
              Forum
            </Link> */}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-5 w-5" />
            </Button>



            {/* Clerk User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || user.emailAddresses[0]?.emailAddress || 'User'} />
                      <AvatarFallback className="bg-emerald-100 dark:bg-gray-800 text-emerald-800 dark:text-white">
                        {user.firstName ? user.firstName[0].toUpperCase() : user.emailAddresses[0]?.emailAddress[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span className="truncate">{user.fullName || user.emailAddresses[0]?.emailAddress}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <BookText className="mr-2 h-4 w-4" />
                    <span>My Library</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Reading History</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => clerk.openUserProfile()}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => clerk.signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="hidden md:flex bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                onClick={() => router.push('/sign-in')}
              >
                Sign In
              </Button>
            )}

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
                        <BookOpen className="h-6 w-6 text-emerald-700 dark:text-white mr-2" />
                        <span className="text-lg font-bold text-emerald-900 dark:text-white font-display">
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
                          className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-emerald-900 dark:text-white"
                        >
                          Home
                        </Link>

                        {tafsirId && (
                          <Link
                            href={`/library/topic/${tafsirId}`}
                            className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-emerald-900 dark:text-white"
                          >
                            Tafsir
                          </Link>
                        )}

                        {hadithId && (
                          <Link
                            href={`/library/topic/${hadithId}`}
                            className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-emerald-900 dark:text-white"
                          >
                            Hadith
                          </Link>
                        )}

                        {/* Fiqh Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3">
                            <span className="font-medium text-emerald-900 dark:text-white">Fiqh</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            {fiqhMadhabs.map((madhab) => (
                              <Link
                                key={madhab.id}
                                href={`/library/topic/${madhab.id}`}
                                className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                              >
                                {madhab.name.replace('Fiqh ', '')}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Dars e Nizami Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3">
                            <span className="font-medium text-emerald-900 dark:text-white">Dars e Nizami</span>
                          </div>
                          <div className="pl-4 space-y-1">
                            {darsENizamiLevels.map((level) => (
                              <Link
                                key={level.id}
                                href={`/library/topic/${level.id}`}
                                className="flex items-center py-2 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                              >
                                {level.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <Link
                          href="/library"
                          className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-emerald-900 dark:text-white"
                        >
                          Library
                        </Link>

                        {/* <Link
                          href="/articles"
                          className="flex items-center py-2 px-3 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-emerald-900 dark:text-white"
                        >
                          Articles
                        </Link> */}
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



                      <div className="flex flex-col space-y-2">
                        {user ? (
                          <>
                            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-gray-800 rounded-lg">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.imageUrl} alt={user.fullName || user.emailAddresses[0]?.emailAddress || 'User'} />
                                <AvatarFallback className="bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-white">
                                  {user.firstName ? user.firstName[0].toUpperCase() : user.emailAddresses[0]?.emailAddress[0].toUpperCase() || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {user.fullName || user.emailAddresses[0]?.emailAddress}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Signed in</p>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              onClick={() => router.push('/dashboard')}
                            >
                              Dashboard
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              onClick={() => clerk.openUserProfile()}
                            >
                              Profile Settings
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" 
                              onClick={() => clerk.signOut()}
                            >
                              Sign Out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              className="w-full bg-emerald-700 hover:bg-emerald-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
                              onClick={() => router.push('/sign-in')}
                            >
                              Sign In
                            </Button>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => router.push('/sign-up')}
                            >
                              Create Account
                            </Button>
                          </>
                        )}
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
