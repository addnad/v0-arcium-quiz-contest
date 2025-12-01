"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { QuizSection } from "@/lib/quiz-data"

interface SectionResultsProps {
  section: QuizSection
  score: number
  totalQuestions: number
  isLastSection: boolean
  onContinue: () => void
}

export default function SectionResults({
  section,
  score,
  totalQuestions,
  isLastSection,
  onContinue,
}: SectionResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-slate-950/80 rounded-2xl p-12 backdrop-blur">
          {/* Section Icon & Name */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{section.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{section.name} Quiz Complete</h2>
          </div>

          {/* Score Display */}
          <div className={`bg-gradient-to-r ${section.color} rounded-xl p-8 mb-8 text-center`}>
            <div className="text-5xl font-bold text-white mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{percentage}%</div>
            <div className="text-gray-200">
              {percentage >= 80
                ? "Excellent! Great understanding"
                : percentage >= 60
                  ? "Good job! Keep improving"
                  : "Keep learning!"}
            </div>
          </div>

          {/* Progress to Next */}
          <div className="mb-8">
            <p className="text-gray-400 text-center mb-4">
              {isLastSection ? "Quiz Complete!" : "Ready for the next topic?"}
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            size="lg"
            className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg font-bold inline-flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95`}
          >
            {isLastSection ? "See Your Results" : "Next Topic"}
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
