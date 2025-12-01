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

    // Create 8 particles that scatter around the trigger point
    const newParticles: ScatterParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: triggerX,
      y: triggerY,
      vx: Math.cos((i / 8) * Math.PI * 2) * 4,
      vy: Math.sin((i / 8) * Math.PI * 2) * 4,
      angle: (i / 8) * Math.PI * 2,
    }))

    setParticles(newParticles)

    // Animate particles
    let frame = 0
    const maxFrames = 60

    const animationInterval = setInterval(() => {
      frame++

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx * (1 - frame / maxFrames),
          y: p.y + p.vy * (1 - frame / maxFrames),
          vy: p.vy + 0.2, // gravity effect
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-8 h-8 opacity-80 animate-fade-out"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.angle}rad)`,
          }}
        >
          <Image src="/images/arcium-logo.png" alt="Arcium" width={32} height={32} className="w-full h-full" />
        </div>
      ))}
    </div>
  )
}
