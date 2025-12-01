"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface QuizStartProps {
  onStart: () => void
  sectionsCount: number
}

export default function QuizStart({ onStart, sectionsCount }: QuizStartProps) {
  const [videoWatched, setVideoWatched] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {!videoWatched ? (
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-full max-w-2xl">
              <video
                className="w-full rounded-2xl border border-primary/40 shadow-lg shadow-primary/30"
                controls
                autoPlay
                onEnded={() => setVideoWatched(true)}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ssstwitter.com_1764593741025-seCOJqTTZPJGfgi2LjhTvoHnZ56cOJ.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-sm text-muted-foreground text-center">Watch the introduction to get started</p>
          </div>
        ) : (
          <>
            {/* Arcium Logo and Header */}
            <div className="flex flex-col items-center gap-8 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent blur-2xl opacity-30 rounded-full"></div>
                <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/40 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/images/arcium-logo.png"
                        alt="Arcium Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ARCIUM
                      </h2>
                      <p className="text-xs text-muted-foreground font-medium tracking-wide">Encrypted Supercomputer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  Knowledge Quiz
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Test your knowledge about Arcium's confidential computing network and ecosystem
                </p>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <Button
                onClick={onStart}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-7 text-lg rounded-full font-semibold inline-flex items-center gap-3 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-primary/50"
              >
                <Play className="w-6 h-6" />
                Start Quiz
              </Button>
            </div>

            {/* Info Footer - Updated to reflect 5 sections with 20 questions */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                {sectionsCount} sections • 20 questions total • 20 seconds per question
              </p>
              <p className="text-xs text-muted-foreground mt-2 opacity-75">
                Learn about Umbra, Dark Pools, Architecture, PETs, and Real-World Applications
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
