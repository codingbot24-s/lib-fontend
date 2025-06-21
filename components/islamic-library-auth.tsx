"use client"

import { useState } from "react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen } from "lucide-react"
import SignInForm from "@/components/SignInForm"
import SignUpForm from "@/components/SignUpForm"


export default function IslamicLibraryAuth() {
  const [activeTab, setActiveTab] = useState("signin")
  

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-green/30 via-white to-light-green/20 dark:from-gray-900/50 dark:via-black dark:to-gray-800/30"></div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-islamic-green/10 dark:bg-white/10 rounded-full flex items-center justify-center mr-3">
              <BookOpen className="w-6 h-6 text-islamic-green dark:text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif text-islamic-green dark:text-white font-medium">Bayt al-Kutub</h1>
              <p className="text-muted-green dark:text-gray-400 text-sm">Digital Islamic Library</p>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-sm bg-islamic-green/5 dark:bg-gray-900/90 border border-islamic-green/20 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden">
          <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 bg-[#f3f6f4] dark:bg-gray-800 rounded-t-xl border-b border-[#dbe3dd] dark:border-gray-700 p-0 h-12 w-full">
              <TabsTrigger
                value="signin"
                className="w-full h-full flex items-center justify-center text-base font-semibold text-[#2d4739] dark:text-gray-300 rounded-t-xl data-[state=active]:bg-[#e3e8e3] dark:data-[state=active]:bg-white data-[state=active]:text-[#2d4739] dark:data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-none transition-colors"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-full h-full flex items-center justify-center text-base font-semibold text-[#2d4739] dark:text-gray-300 rounded-t-xl data-[state=active]:bg-[#e3e8e3] dark:data-[state=active]:bg-white data-[state=active]:text-[#2d4739] dark:data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-none transition-colors"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="p-0">
              <CardHeader className="pt-8 pb-6 px-8">
                <CardTitle className="text-2xl font-serif text-islamic-green dark:text-white text-center mb-2">
                  Sign In to Bayt al-Kutub
                </CardTitle>
                <CardDescription className="text-muted-green dark:text-gray-400 text-center">
                  Welcome back to your digital Islamic library
                </CardDescription>
              </CardHeader>
              <SignInForm onSwitchToSignUp={() => setActiveTab("signup")} />
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="p-0">
              <CardHeader className="pt-8 pb-6 px-8">
                <CardTitle className="text-2xl font-serif text-islamic-green dark:text-white text-center mb-2">
                  Create a New Account
                </CardTitle>
                <CardDescription className="text-muted-green dark:text-gray-400 text-center">
                  Join our community of knowledge seekers
                </CardDescription>
              </CardHeader>
              <SignUpForm onSwitchToSignIn={() => setActiveTab("signin")} />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-muted-green/70 dark:text-gray-500 text-sm font-serif">"And say: My Lord, increase me in knowledge"</p>
          <p className="text-muted-green/50 dark:text-gray-600 text-xs mt-1">Quran 20:114</p>
        </div>
      </div>
    </div>
  )
}
