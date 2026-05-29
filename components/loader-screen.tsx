"use client"

import { useEffect, useState } from "react"
import { Loader3 } from "@/components/ui/loader-3"

export function LoaderScreen() {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Animation is 3s, plays once. Mask reveals at ~2s (66% of 3s).
    // Fade starts just after animation ends so user sees the full sequence.
    const fadeTimer = setTimeout(() => setFading(true), 3200)
    // Unmount after fade transition completes
    const hideTimer = setTimeout(() => setHidden(true), 3800)
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
