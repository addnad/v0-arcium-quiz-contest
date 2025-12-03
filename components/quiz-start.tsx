"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface QuizStartProps {
  onStart: () => void
  sectionsCount: number
  onBack: () => void
}

export default function QuizStart({ onStart, sectionsCount, onBack }: QuizStartProps) {
  const [videoWatched, setVideoWatched] = useState(false)

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="w-full max-w-3xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Features
        </button>

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
            <div className="flex flex-col items-center gap-10 mb-12">
              {/* Arcium Logo Header */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center p-2">
                      <Image
                        src="/images/arcium-logo.png"
                        alt="Arcium Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-3xl font-bold text-white">ARCIUM</h2>
                      <p className="text-sm text-cyan-300 font-medium tracking-wider">Encrypted Supercomputer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center space-y-6">
                <h1
                  className="text-4xl md:text-5xl font-bold text-white"
                  style={{
                    letterSpacing: "-0.003rem",
                    textShadow: "0 0 20px rgba(93, 226, 218, 0.2)",
                  }}
                >
                  Knowledge Quiz
                </h1>
                <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
                  Test your knowledge about Arcium's confidential computing network and ecosystem
                </p>

                {/* Creator Info */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-4">
                    Created with passion by a community contributor dedicated to advancing confidential computing
                    education
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href="https://discord.com/users/1stbernice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/40 rounded-lg text-white text-sm transition-all hover:scale-105"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span className="font-medium">1stbernice</span>
                    </a>
                    <a
                      href="https://x.com/1st_bernice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white text-sm transition-all hover:scale-105"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="font-medium">@1st_bernice</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center mb-10">
              <Button
                onClick={onStart}
                size="lg"
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 hover:from-cyan-300 hover:via-blue-300 hover:to-purple-300 text-gray-900 px-12 py-6 text-xl rounded-2xl font-bold inline-flex items-center gap-3 transition-all hover:scale-110 active:scale-95 shadow-2xl hover:shadow-cyan-400/50"
              >
                <Play className="w-7 h-7" />
                Start Quiz Journey
              </Button>
            </div>

            {/* Quiz Info */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-base text-white/70">
                {sectionsCount} Educational Sections • 20 Questions Total • 20 Seconds Per Question
              </p>
              <p className="text-sm text-white/50">
                Topics: Umbra, Dark Pools, Architecture, PETs, and Real-World Applications
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
