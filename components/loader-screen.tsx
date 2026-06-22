"use client"

import { useEffect, useRef, useState } from "react"

const FILL_DURATION = 2600  // ms bar fills
const FADE_AT      = 3000  // ms starts fading
const HIDE_AT      = 3600  // ms unmounts

export function LoaderScreen() {
  const [progress, setProgress] = useState(0)
  const [fading,   setFading]   = useState(false)
  const [hidden,   setHidden]   = useState(false)
  const rafRef     = useRef<number | null>(null)
  const startRef   = useRef<number | null>(null)

  useEffect(() => {
    // Progress bar
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / FILL_DURATION, 1)
      setProgress(p * 100)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const fadeTimer = setTimeout(() => setFading(true), FADE_AT)
    const hideTimer = setTimeout(() => setHidden(true), HIDE_AT)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#f5f4f1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.55s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#1a1a1a",
        }}
      >
        Juanchí Martínez Portfolio
      </p>

      {/* Track */}
      <div
        style={{
          width: "140px",
          height: "1px",
          background: "rgba(0,0,0,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress}%`,
            background: "#1a1a1a",
          }}
        />
      </div>
    </div>
  )
}
