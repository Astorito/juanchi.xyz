import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Raleway, DM_Sans as V0_Font_DM_Sans, Geist_Mono as V0_Font_Geist_Mono, Dancing_Script } from 'next/font/google'

const _dmSans = V0_Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const raleway = Raleway({ subsets: ['latin'], weight: ["400","500","600","700","800","900"], variable: '--font-raleway' })
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ["400", "700"], variable: '--font-dancing' })

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
      <body className={`${raleway.variable} ${dancingScript.variable} font-sans antialiased`} style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
