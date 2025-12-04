"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, ExternalLink, Share } from "lucide-react"
import type { QuizSection } from "@/lib/quiz-data"

interface CompletedSection {
  sectionId: string
  score: number
  answers: (number | null)[]
}

interface FinalResultsProps {
  sections: QuizSection[]
  completedSections: CompletedSection[]
  onRetakeQuiz: () => void
}

export default function FinalResults({ sections, completedSections, onRetakeQuiz }: FinalResultsProps) {
  const totalScore = completedSections.reduce((sum, s) => sum + s.score, 0)
  const totalQuestions = completedSections.reduce((sum, s) => {
    const section = sections.find((sec) => sec.id === s.sectionId)
    return sum + (section?.questionCount || 0)
  }, 0)
  const percentage = Math.round((totalScore / totalQuestions) * 100)

  let performanceMessage = "Great Job!"
  let performanceColor = "text-yellow-400"

  if (percentage >= 90) {
    performanceMessage = "Outstanding! Arcium Expert"
    performanceColor = "text-yellow-400"
  } else if (percentage >= 75) {
    performanceMessage = "Excellent! Strong Knowledge"
    performanceColor = "text-cyan-400"
  } else if (percentage >= 60) {
    performanceMessage = "Good! Solid Understanding"
    performanceColor = "text-green-400"
  } else {
    performanceMessage = "Keep Learning!"
    performanceColor = "text-orange-400"
  }

  const handleShareToTwitter = () => {
    const tweetText = `Just crushed the Arcium Knowledge Quiz! 🔐🚀\n\nScored ${totalScore}/${totalQuestions} (${percentage}%) on confidential computing, MPC, and encrypted applications.\n\nReady to test your crypto knowledge? Learn about the encrypted future with @1st_bernice\n\n#Arcium #ConfidentialComputing #Web3`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Final Score */}
        <div className="bg-slate-950/80 rounded-2xl p-12 backdrop-blur mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-6">Quiz Complete!</h1>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 mb-6">
              <div className="text-6xl font-bold text-white mb-2">
                {totalScore}/{totalQuestions}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{percentage}%</div>
              <div className={`text-xl font-bold ${performanceColor}`}>{performanceMessage}</div>
            </div>
          </div>

          {/* Section Breakdown */}
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Your Performance by Topic:</h2>
            {completedSections.map((completed) => {
              const section = sections.find((s) => s.id === completed.sectionId)
              if (!section) return null
              const sectionPercentage = Math.round((completed.score / section.questionCount) * 100)
              return (
                <div key={section.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <span className="text-white font-semibold">{section.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${section.color}`}
                        style={{ width: `${sectionPercentage}%` }}
                      />
                    </div>
                    <span className="text-white font-bold w-12 text-right">
                      {completed.score}/{section.questionCount}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Twitter Share Button */}
          <Button
            onClick={handleShareToTwitter}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg font-bold inline-flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 mb-4"
          >
            <Share className="w-6 h-6" />
            Share Score on Twitter
          </Button>

          {/* Retake Button */}
          <Button
            onClick={onRetakeQuiz}
            size="lg"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg font-bold inline-flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
            Retake Full Quiz
          </Button>

          <div className="mt-6 text-center">
            <a
              href="https://www.arcium.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="learn more about Arcium"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Learn more about Arcium
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
