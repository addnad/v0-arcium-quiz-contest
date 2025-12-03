"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface ScatterParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  angle: number
}

interface LogoScatterProps {
  isVisible: boolean
  triggerX: number
  triggerY: number
}

export default function LogoScatter({ isVisible, triggerX, triggerY }: LogoScatterProps) {
  const [particles, setParticles] = useState<ScatterParticle[]>([])

  useEffect(() => {
    if (!isVisible) {
      setParticles([])
      return
    }

    const newParticles: ScatterParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: triggerX,
      y: triggerY,
      vx: Math.cos((i / 8) * Math.PI * 2) * 5,
      vy: Math.sin((i / 8) * Math.PI * 2) * 5 - 3, // Add upward bias
      angle: (i / 8) * Math.PI * 2,
    }))

    setParticles(newParticles)

    let frame = 0
    const maxFrames = 180

    const animationInterval = setInterval(() => {
      frame++

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx * (1 - frame / maxFrames),
          y: p.y + p.vy * (1 - frame / maxFrames) + frame * 0.3, // Add gravity
          vy: p.vy + 0.2,
        })),
      )

      if (frame >= maxFrames) {
        clearInterval(animationInterval)
        setParticles([])
      }
    }, 1000 / 60) // 60fps

    return () => clearInterval(animationInterval)
  }, [isVisible, triggerX, triggerY])

  if (!isVisible || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-10 h-10 transition-opacity duration-1000"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.angle}rad)`,
            opacity: 1 - (particle.y - triggerY) / 200,
          }}
        >
          <Image src="/images/arcium-logo.png" alt="Arcium" width={40} height={40} className="w-full h-full" />
        </div>
      ))}
    </div>
  )
}
