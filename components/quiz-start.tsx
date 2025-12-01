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
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="w-full max-w-3xl">
        {!videoWatched ? (
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-full max-w-2xl">
              <video
                className="w-full rounded-2xl border-2 shadow-2xl"
                style={{ borderColor: "#5de2da" }}
                controls
                autoPlay
                onEnded={() => setVideoWatched(true)}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ssstwitter.com_1764593741025-seCOJqTTZPJGfgi2LjhTvoHnZ56cOJ.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-sm text-white/70 text-center">Watch the introduction to get started</p>
          </div>
        ) : (
          <>
            {/* Arcium Logo and Header */}
            <div className="flex flex-col items-center gap-8 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 blur-3xl opacity-40 rounded-full"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
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
                      <h2 className="text-2xl font-bold text-white">ARCIUM</h2>
                      <p className="text-xs text-cyan-300 font-medium tracking-widest">Encrypted Supercomputer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center space-y-4">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                  style={{
                    letterSpacing: "-0.003rem",
                    textShadow: "0 0 30px rgba(93, 226, 218, 0.3)",
                  }}
                >
                  Knowledge Quiz
                </h1>
                <p className="text-base md:text-lg text-white/80 max-w-md mx-auto leading-relaxed font-light">
                  Test your knowledge about Arcium's confidential computing network and ecosystem
                </p>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md mx-auto font-light">
                    Created with passion by a community contributor dedicated to advancing confidential computing
                    education. Join the conversation and share your knowledge!
                  </p>
                  <div className="text-sm md:text-base text-cyan-300 font-semibold mt-4 space-y-1">
                    <div>Discord: 1stbernice</div>
                    <div>X: @1st_bernice</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={onStart}
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-gray-900 px-10 py-3 text-lg rounded-full font-bold inline-flex items-center gap-3 transition-all hover:scale-110 active:scale-95 shadow-2xl"
                style={{ boxShadow: "0 0 30px rgba(93, 226, 218, 0.4)" }}
              >
                <Play className="w-6 h-6" />
                Start Quiz
              </Button>
            </div>

            {/* Info Footer */}
            <div className="mt-12 text-center space-y-2">
              <p className="text-sm md:text-base text-white/80">
                {sectionsCount} sections • 20 questions total • 20 seconds per question
              </p>
              <p className="text-xs md:text-sm text-white/60">
                Learn about Umbra, Dark Pools, Architecture, PETs, and Real-World Applications
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
