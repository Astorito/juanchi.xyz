"use client"

import { useEffect, useState } from "react"
import { Loader3 } from "@/components/ui/loader-3"

export function LoaderScreen() {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Start fade after 3.8s (let the animation play through once fully)
    const fadeTimer = setTimeout(() => setFading(true), 3800)
    // Unmount after fade completes
    const hideTimer = setTimeout(() => setHidden(true), 4400)
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
