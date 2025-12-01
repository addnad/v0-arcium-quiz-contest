"use client"

import { useState } from "react"
import QuizStart from "@/components/quiz-start"
import SectionIntro from "@/components/section-intro"
import QuizQuestion from "@/components/quiz-question"
import SectionResults from "@/components/section-results"
import FinalResults from "@/components/final-results"
import { getQuestionsBySection, randomizeQuestionOptions, QUIZ_SECTIONS, type Question } from "@/lib/quiz-data"

type QuizState = "start" | "sectionIntro" | "quiz" | "sectionResults" | "finalResults"

interface CompletedSection {
  sectionId: string
  score: number
  answers: (number | null)[]
}

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [sectionQuestions, setSectionQuestions] = useState<Question[]>([])
  const [sectionAnswers, setSectionAnswers] = useState<(number | null)[]>([])
  const [sectionScore, setSectionScore] = useState(0)
  const [completedSections, setCompletedSections] = useState<CompletedSection[]>([])

  const currentSection = QUIZ_SECTIONS[currentSectionIndex]

  const startSectionIntro = () => {
    setQuizState("sectionIntro")
  }

  const startSectionQuiz = () => {
    const questions = getQuestionsBySection(currentSection.id).map((q) =>
      randomizeQuestionOptions(randomizeQuestionOptions(q)),
    )
    setSectionQuestions(questions)
    setSectionAnswers(Array(questions.length).fill(null))
    setSectionScore(0)
    setCurrentQuestion(0)
    setQuizState("quiz")
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSectionAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestion] = answerIndex

      if (answerIndex === sectionQuestions[currentQuestion].correctAnswer) {
        setSectionScore((prev) => prev + 1)
      }

      return newAnswers
    })

    setTimeout(() => {
      setCurrentQuestion((prev) => {
        const next = prev + 1
        if (next >= sectionQuestions.length) {
          setQuizState("sectionResults")
        }
        return next
      })
    }, 800)
  }

  const handleTimeUp = () => {
    setCurrentQuestion((prev) => {
      const next = prev + 1
      if (next >= sectionQuestions.length) {
        setQuizState("sectionResults")
      }
      return next
    })
  }

  const handleContinueToNext = () => {
    const newCompleted: CompletedSection = {
      sectionId: currentSection.id,
      score: sectionScore,
      answers: sectionAnswers,
    }

    const updatedCompleted = [...completedSections, newCompleted]
    setCompletedSections(updatedCompleted)

    if (currentSectionIndex + 1 < QUIZ_SECTIONS.length) {
      setCurrentSectionIndex((prev) => prev + 1)
      setQuizState("sectionIntro")
    } else {
      setQuizState("finalResults")
    }
  }

  const handleRetakeQuiz = () => {
    setCurrentSectionIndex(0)
    setCompletedSections([])
    setQuizState("start")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Background overlay for quiz states */}
      {(quizState === "quiz" ||
        quizState === "sectionResults" ||
        quizState === "sectionIntro" ||
        quizState === "finalResults") && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ssstwitter.com_1764593741025-seCOJqTTZPJGfgi2LjhTvoHnZ56cOJ.mp4')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.08,
          }}
        ></div>
      )}

      {quizState === "start" && <QuizStart onStart={startSectionIntro} sectionsCount={QUIZ_SECTIONS.length} />}

      {quizState === "sectionIntro" && currentSection && (
        <SectionIntro section={currentSection} onStart={startSectionQuiz} />
      )}

      {quizState === "quiz" && sectionQuestions.length > 0 && (
        <QuizQuestion
          key={currentQuestion}
          question={sectionQuestions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={sectionQuestions.length}
          sectionName={currentSection.name}
          onAnswerSelect={handleAnswerSelect}
          onTimeUp={handleTimeUp}
        />
      )}

      {quizState === "sectionResults" && currentSection && (
        <SectionResults
          section={currentSection}
          score={sectionScore}
          totalQuestions={sectionQuestions.length}
          isLastSection={currentSectionIndex === QUIZ_SECTIONS.length - 1}
          onContinue={handleContinueToNext}
        />
      )}

      {quizState === "finalResults" && (
        <FinalResults sections={QUIZ_SECTIONS} completedSections={completedSections} onRetakeQuiz={handleRetakeQuiz} />
      )}
    </main>
  )
}
