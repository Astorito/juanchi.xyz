"use client"

import { useState, useEffect, useRef } from "react"

interface RippleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  visible?: boolean
}

export function RippleButton({ children, onClick, className = "", visible = true }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const [showButton, setShowButton] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (visible) {
      setShowButton(true)
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setRipples([{ x: rect.width / 2, y: rect.height / 2, id: Date.now() }])
      }
    }
  }, [visible])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipples((prev) => [...prev, { x, y, id: Date.now() }])
    onClick?.()
  }

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-700 ${
        showButton ? "opacity-100 scale-100" : "opacity-0 scale-90"
      } ${className}`}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-foreground/20 animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 5,
            top: ripple.y - 5,
            width: 10,
            height: 10,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}
      {children}
    </button>
  )
}
