"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"
import type { QuizSection } from "@/lib/quiz-data"

interface SectionIntroProps {
  section: QuizSection
  onStart: () => void
  onBack: () => void
}

export default function SectionIntro({ section, onStart, onBack }: SectionIntroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Quiz Start
        </button>

        {/* Section Card */}
        <div className={`bg-gradient-to-br ${section.color} rounded-2xl p-1 mb-8`}>
          <div className="bg-slate-950 rounded-2xl p-8 md:p-12">
            {/* Icon */}
            <div className="text-5xl md:text-6xl mb-6">{section.icon}</div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.title}</h1>

            {/* Headline */}
            <p className="text-lg md:text-xl text-cyan-300 font-semibold mb-8">{section.info.headline}</p>

            <div className="mb-8 prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6 text-justify">
                {section.info.description}
              </p>
            </div>

            {/* Questions Info */}
            <div className={`bg-gradient-to-r ${section.color} rounded-lg p-4 mb-8`}>
              <p className="text-white font-semibold">
                This section contains {section.questionCount} questions • 20 seconds each • Learn as you go
              </p>
            </div>

            {/* Start Button */}
            <Button
              onClick={onStart}
              size="lg"
              className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg font-bold inline-flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95`}
            >
              Start {section.name} Quiz
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
