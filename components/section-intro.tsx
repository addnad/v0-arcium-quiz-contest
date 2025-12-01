"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { QuizSection } from "@/lib/quiz-data"

interface SectionIntroProps {
  section: QuizSection
  onStart: () => void
}

export default function SectionIntro({ section, onStart }: SectionIntroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Section Card */}
        <div className={`bg-gradient-to-br ${section.color} rounded-2xl p-1 mb-8`}>
          <div className="bg-slate-950 rounded-2xl p-12 md:p-16">
            {/* Icon */}
            <div className="text-6xl md:text-7xl mb-6">{section.icon}</div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{section.title}</h1>

            {/* Headline */}
            <p className="text-lg md:text-xl text-gray-300 font-semibold mb-8">{section.info.headline}</p>

            {/* Details */}
            <div className="space-y-4 mb-8">
              {section.info.details.map((detail, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${section.color} flex-shrink-0 flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{detail}</p>
                </div>
              ))}
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
