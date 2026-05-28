"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterProps {
  children: string
  speed?: number
  variance?: number
  className?: string
  cursorClassName?: string
  onComplete?: () => void
  active?: boolean
  delay?: number
}

export function Typewriter({
  children,
  speed = 60,
  variance = 0.4,
  className = "",
  cursorClassName = "",
  onComplete,
  active = true,
  delay = 0,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const hasRunRef = useRef(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = useRef(onComplete)
  const textRef = useRef(children)
  const speedRef = useRef(speed)
  const varianceRef = useRef(variance)

  onCompleteRef.current = onComplete
  textRef.current = children
  speedRef.current = speed
  varianceRef.current = variance

  useEffect(() => {
    if (!active || hasRunRef.current) return
    hasRunRef.current = true

    const text = textRef.current
    const startTimeout = setTimeout(() => {
      indexRef.current = 0

      const typeChar = () => {
        if (indexRef.current < text.length) {
          const currentChar = text[indexRef.current]
          indexRef.current++
          setDisplayedText(text.slice(0, indexRef.current))

          const s = speedRef.current
          const v = varianceRef.current
          let nextDelay = s + (Math.random() - 0.5) * s * v * 2

          if (currentChar === " ") nextDelay *= 0.5
          if (currentChar === "," || currentChar === ".") nextDelay *= 2.5
          if (currentChar === "!" || currentChar === "?") nextDelay *= 2

          nextDelay = Math.max(20, nextDelay)

          timeoutRef.current = setTimeout(typeChar, nextDelay)
        } else {
          onCompleteRef.current?.()
        }
      }

      typeChar()
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <span className={className} aria-label={children}>
      {displayedText}
      <span
        className={`inline-block w-[2px] h-[1em] ml-0.5 align-middle ${
          showCursor ? "opacity-100" : "opacity-0"
        } bg-muted-foreground ${cursorClassName}`}
        style={{ transition: "opacity 0.1s" }}
      />
    </span>
  )
}
