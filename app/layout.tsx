import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Montserrat, DM_Sans as V0_Font_DM_Sans, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _dmSans = V0_Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _montserrat = Montserrat({ subsets: ['latin'], weight: ["700", "800", "900"] })

// Using Inter font for clean minimalistic aesthetic
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Juanchi - Project Manager & AI Product Builder",
  description: "Portfolio of Juanchi - Project Manager, Creative Strategist, and AI Product Builder",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
