"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface QuizStartProps {
  onStart: () => void
  sectionsCount: number
  onBack: () => void
}

export default function QuizStart({ onStart, sectionsCount, onBack }: QuizStartProps) {
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
            {sectionsCount} Educational Sections • 30 Questions Total • 20 Seconds Per Question
          </p>
          <p className="text-sm text-white/50">
            Topics: What is Arcium, Umbra, Dark Pools, Architecture, PETs, and Real-World Applications
          </p>
        </div>
      </div>
    </div>
  )
}
