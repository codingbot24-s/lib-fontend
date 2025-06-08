import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bayt al-Kutub | Islamic Digital Library",
  description:
    "Discover the world of Islamic knowledge with thousands of classical and modern Islamic books at your fingertips.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSerif.variable} bg-islamic-pattern min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            expand={false}
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
