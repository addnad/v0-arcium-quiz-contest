"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizQuestionProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  sectionName: string
  onAnswerSelect: (answerIndex: number) => void
  onTimeUp: () => void
}

const TIMER_DURATION = 20

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  onAnswerSelect,
  onTimeUp,
}: QuizQuestionProps) {
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    if (selectedAnswer !== null) {
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedAnswer, onTimeUp])

  const handleAnswer = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index)
      setShowFeedback(true)
      onAnswerSelect(index)
    }
  }

  const isCorrect = selectedAnswer === question.correctAnswer
  const timerWarning = timeRemaining <= 5
  const progressValue = ((TIMER_DURATION - timeRemaining) / TIMER_DURATION) * 100

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-muted-foreground text-sm">{sectionName}</span>
              <p className="text-muted-foreground text-xs">
                Question {questionNumber} of {totalQuestions}
              </p>
            </div>
            <div
              className={`flex items-center gap-2 text-2xl font-bold transition-all ${
                timerWarning ? "text-destructive timer-warning" : "text-primary"
              }`}
            >
              <Clock className="w-6 h-6" />
              {timeRemaining}s
            </div>
          </div>
          <Progress value={progressValue} className="h-2 bg-secondary" />
        </div>

        {/* Progress Bar for Questions */}
        <div className="mb-8">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">{question.question}</h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-4">
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index)
            let bgColor = "bg-secondary/50 hover:bg-secondary/70 border-border/50"
            let textColor = "text-foreground"
            let icon = null

            if (selectedAnswer !== null) {
              if (index === question.correctAnswer) {
                bgColor = "bg-green-900/30 border-green-500/50"
                textColor = "text-green-300"
                icon = <CheckCircle className="w-5 h-5" />
              } else if (index === selectedAnswer && !isCorrect) {
                bgColor = "bg-destructive/20 border-destructive/50"
                textColor = "text-destructive"
                icon = <XCircle className="w-5 h-5" />
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${bgColor} ${textColor} ${
                  selectedAnswer === null ? "cursor-pointer active:scale-95" : "cursor-default"
                } disabled:opacity-100`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-semibold flex-shrink-0">
                    {optionLetter}
                  </div>
                  <span className="flex-grow">{option}</span>
                  {icon && <div className="flex-shrink-0">{icon}</div>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div
            className={`text-center p-4 rounded-lg ${
              isCorrect ? "bg-green-900/30 text-green-300" : "bg-secondary/30 text-muted-foreground"
            }`}
          >
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
          </div>
        )}
      </div>
    </div>
  )
}
