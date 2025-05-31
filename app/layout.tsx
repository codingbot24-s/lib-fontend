import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

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
      <body className={`${inter.variable} ${notoSerif.variable} bg-islamic-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
