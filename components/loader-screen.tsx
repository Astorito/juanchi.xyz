"use client"

import { useEffect, useState } from "react"
import { Loader3 } from "@/components/ui/loader-3"

export function LoaderScreen() {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Start fade after 2.2s (let the animation play through once)
    const fadeTimer = setTimeout(() => setFading(true), 2200)
    // Unmount after fade completes
    const hideTimer = setTimeout(() => setHidden(true), 2750)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Loader3 />
    </div>
  )
}
