"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, RotateCcw, CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface DetailedResultsProps {
  questions: Question[]
  answers: (number | null)[]
  score: number
  onBackToScore: () => void
  onRetakeQuiz: () => void
}

export default function DetailedResults({
  questions,
  answers,
  score,
  onBackToScore,
  onRetakeQuiz,
}: DetailedResultsProps) {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBackToScore}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Score
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Detailed Results Breakdown</h1>
          <p className="text-muted-foreground">Review each question and learn from the answers</p>
        </div>

        {/* Score Summary */}
        <div className="glass rounded-lg p-6 mb-8">
          <div className="text-lg">
            <span className="text-muted-foreground">You answered</span>
            <span className="text-2xl font-bold text-primary ml-2">{score}</span>
            <span className="text-muted-foreground"> out of </span>
            <span className="text-2xl font-bold text-foreground">{questions.length}</span>
            <span className="text-muted-foreground"> questions correctly</span>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-4 mb-8">
          {questions.map((question, index) => {
            const userAnswer = answers[index]
            const isCorrect = userAnswer === question.correctAnswer
            const correctAnswer = question.options[question.correctAnswer]
            const userAnswerText = userAnswer !== null ? question.options[userAnswer] : "Not answered"

            return (
              <div
                key={index}
                className={`rounded-lg border-2 p-6 transition-all ${
                  isCorrect ? "border-green-500/30 bg-green-900/10" : "border-destructive/30 bg-destructive/10"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-grow">
                    <div className="text-sm text-muted-foreground mb-1">Question {index + 1}</div>
                    <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
                  </div>
                </div>

                {/* Answers */}
                <div className="space-y-2 ml-9">
                  {userAnswer !== null && (
                    <div
                      className={`p-3 rounded-lg ${
                        isCorrect ? "bg-green-900/20 text-green-300" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">Your answer:</div>
                      <div>{userAnswerText}</div>
                    </div>
                  )}

                  {!isCorrect && (
                    <div className="p-3 rounded-lg bg-green-900/20 text-green-300">
                      <div className="text-sm font-medium mb-1">Correct answer:</div>
                      <div>{correctAnswer}</div>
                    </div>
                  )}

                  {userAnswer === null && (
                    <div className="p-3 rounded-lg bg-secondary/30 text-muted-foreground">
                      <div className="text-sm">No answer provided (time expired)</div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={onBackToScore}
            variant="outline"
            size="lg"
            className="flex-1 border-border hover:bg-secondary/50 px-6 py-6 text-base rounded-lg font-semibold inline-flex items-center justify-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Score
          </Button>
          <Button
            onClick={onRetakeQuiz}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 text-base rounded-lg font-semibold inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
