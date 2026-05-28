"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

interface ScrambleTextProps {
  children: string
  duration?: number
  staggerFrom?: "center" | "start" | "end"
  staggerDelay?: number
  className?: string
  onComplete?: () => void
  active?: boolean
}

export function ScrambleText({
  children,
  duration = 1.5,
  staggerFrom = "center",
  staggerDelay = 0.04,
  className = "",
  onComplete,
  active = true,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState<string[]>(() =>
    children.split("").map(() => " ")
  )
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    children.split("").map(() => false)
  )
  const frameRef = useRef<number | null>(null)
  const hasStarted = useRef(false)
  const lastScrambleRef = useRef<number>(0)
  const scrambleCharsRef = useRef<string[]>(children.split("").map(() => " "))
  const scrambleInterval = 80 // milliseconds between character changes

  const getStaggerOrder = useCallback(() => {
    const len = children.length
    const indices = Array.from({ length: len }, (_, i) => i)

    if (staggerFrom === "center") {
      const center = Math.floor(len / 2)
      indices.sort((a, b) => Math.abs(a - center) - Math.abs(b - center))
    } else if (staggerFrom === "end") {
      indices.reverse()
    }
    return indices
  }, [children, staggerFrom])

  useEffect(() => {
    if (!active || hasStarted.current) return
    hasStarted.current = true

    const chars = children.split("")
    const order = getStaggerOrder()
    const revealTimes = order.map(
      (_, orderIndex) => orderIndex * staggerDelay * 1000
    )
    const revealTimeByChar: number[] = new Array(chars.length).fill(0)
    order.forEach((charIndex, orderIndex) => {
      revealTimeByChar[charIndex] = revealTimes[orderIndex]
    })

    const totalDuration = duration * 1000
    const startTime = performance.now()
    const newRevealed = new Array(chars.length).fill(false)

    const animate = (now: number) => {
      const elapsed = now - startTime
      const newDisplay = [...chars]
      let allDone = true

      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === " ") {
          newDisplay[i] = " "
          newRevealed[i] = true
          continue
        }

        const charRevealTime = revealTimeByChar[i]
        const scrambleDuration = totalDuration - charRevealTime

        if (elapsed >= charRevealTime + scrambleDuration) {
          newDisplay[i] = chars[i]
          newRevealed[i] = true
        } else if (elapsed >= charRevealTime) {
          // Only update scramble characters at set intervals
          if (elapsed - lastScrambleRef.current >= scrambleInterval) {
            scrambleCharsRef.current[i] = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          newDisplay[i] = scrambleCharsRef.current[i]
          allDone = false
        } else {
          newDisplay[i] = " "
          allDone = false
        }
      }

      // Update last scramble time
      if (elapsed - lastScrambleRef.current >= scrambleInterval) {
        lastScrambleRef.current = elapsed
      }

      setDisplay(newDisplay)
      setRevealed([...newRevealed])

      if (allDone) {
        onComplete?.()
      } else {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [active, children, duration, staggerDelay, getStaggerOrder, onComplete])

  return (
    <span className={className} aria-label={children}>
      {display.map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-colors duration-200 ${
            revealed[i] ? "text-foreground" : "text-muted-foreground/60"
          }`}
          style={{ minWidth: char === " " ? "0.3em" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
