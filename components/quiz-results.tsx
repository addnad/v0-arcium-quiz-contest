"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, RotateCcw, BookOpen, Share2 } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  onViewBreakdown: () => void
  onViewEducation: () => void
  onRetakeQuiz: () => void
}

export default function QuizResults({
  score,
  totalQuestions,
  onViewBreakdown,
  onViewEducation,
  onRetakeQuiz,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  let performanceMessage = "Needs Improvement! Study More"
  let performanceColor = "text-orange-400"

  if (score >= 9) {
    performanceMessage = "Outstanding! Arcium Expert"
    performanceColor = "text-yellow-400"
  } else if (score >= 8) {
    performanceMessage = "Excellent! Strong Knowledge"
    performanceColor = "text-cyan-400"
  } else if (score >= 6) {
    performanceMessage = "Good! Solid Understanding"
    performanceColor = "text-green-400"
  } else if (score >= 4) {
    performanceMessage = "Fair! Keep Learning"
    performanceColor = "text-blue-400"
  }

  const handleShareTwitter = () => {
    const tweetText = `I just scored ${score}/${totalQuestions} (${percentage}%) on the Arcium Knowledge Quiz! 🎯

Test your knowledge about confidential computing, MPC, and encrypted supercomputers.

Take the quiz: https://stayencrypted.vercel.app/`

    console.log("[v0] Tweet text:", tweetText)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    console.log("[v0] Full Twitter URL:", twitterUrl)

    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl text-center">
        {/* Score Display */}
        <div className="mb-8">
          <div className="glass rounded-2xl p-12 mb-6">
            <div className="mb-6">
              <div className="text-6xl md:text-7xl font-bold text-primary mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-3xl md:text-4xl font-semibold mb-4">{percentage}%</div>
              <div className={`text-xl md:text-2xl font-semibold ${performanceColor}`}>{performanceMessage}</div>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-primary/60 h-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-primary mb-1">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-destructive mb-1">{totalQuestions - score}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-foreground mb-1">
                {((score / totalQuestions) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-secondary/20 rounded-lg p-4 mb-8 text-left text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">How Your Score Was Calculated:</p>
          <p>Score = (Correct Answers / Total Questions) × 100%</p>
          <p className="mt-2">Note: Questions auto-submit after 20 seconds if not answered.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onViewBreakdown}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 text-base rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            See Score Breakdown
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={onViewEducation}
            size="lg"
            className="flex-1 bg-secondary/50 hover:bg-secondary/70 text-foreground px-6 py-6 text-base rounded-lg font-semibold inline-flex items-center justify-center gap-2 border border-border transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-5 h-5" />
            Learn About Arcium
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            onClick={handleShareTwitter}
            size="lg"
            className="flex-1 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/50 text-[#1DA1F2] px-6 py-6 text-base rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            Share Result on X
          </Button>
          <Button
            onClick={onRetakeQuiz}
            size="lg"
            variant="outline"
            className="flex-1 border-border hover:bg-secondary/50 px-6 py-6 text-base rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 bg-transparent"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
