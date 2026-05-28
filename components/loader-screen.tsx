"use client"

import { useEffect, useState } from "react"
import { Loader3 } from "@/components/ui/loader-3"

export function LoaderScreen() {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Mask reveals assembled cube at ~3.2s (66% of 4.8s cycle).
    // Fade starts at 4.8s (end of first cycle) so user sees the full reveal.
    const fadeTimer = setTimeout(() => setFading(true), 4800)
    // Unmount after fade transition completes
    const hideTimer = setTimeout(() => setHidden(true), 5400)
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
