"use client"

import { useState, useEffect, useCallback } from "react"
import QuizStart from "@/components/quiz-start"
import SectionIntro from "@/components/section-intro"
import QuizQuestion from "@/components/quiz-question"
import SectionResults from "@/components/section-results"
import FinalResults from "@/components/final-results"
import DailyCheckin from "@/components/daily-checkin"
import FortressStories from "@/components/fortress-stories"
import GamesHub from "@/components/games-hub" // Imported GamesHub component
import { getQuestionsBySection, randomizeQuestionOptions, QUIZ_SECTIONS, type Question } from "@/lib/quiz-data"
import Image from "next/image"

type AppState =
  | "video"
  | "featureChooser"
  | "gmpcDaily"
  | "fortressStories"
  | "games"
  | "quizStart"
  | "sectionIntro"
  | "quiz"
  | "sectionResults"
  | "finalResults"

type CompletedSection = {
  sectionId: string
  score: number
  answers: (number | null)[]
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("video")
  const [videoWatched, setVideoWatched] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [sectionQuestions, setSectionQuestions] = useState<Question[]>([])
  const [sectionAnswers, setSectionAnswers] = useState<(number | null)[]>([])
  const [sectionScore, setSectionScore] = useState(0)
  const [completedSections, setCompletedSections] = useState<CompletedSection[]>([])

  const currentSection = QUIZ_SECTIONS[currentSectionIndex]

  useEffect(() => {}, [])

  const handleVideoEnd = useCallback(() => {
    setVideoWatched(true)
    localStorage.setItem("arcium-video-watched", "true")
    setAppState("featureChooser")
  }, [])

  const handleGMPCDaily = useCallback(() => {
    setAppState("gmpcDaily")
  }, [])

  const handleFortressStories = useCallback(() => {
    setAppState("fortressStories")
  }, [])

  const handleGames = useCallback(() => {
    setAppState("games")
  }, [])

  const handleKnowledgeQuiz = useCallback(() => {
    setAppState("quizStart")
  }, [])

  const handleBackToFeatures = useCallback(() => {
    setAppState("featureChooser")
  }, [])

  const handleBackToQuizStart = useCallback(() => {
    setAppState("quizStart")
  }, [])

  const startSectionIntro = useCallback(() => {
    setAppState("sectionIntro")
  }, [])

  const startSectionQuiz = useCallback(() => {
    const questions = getQuestionsBySection(currentSection.id).map((q) =>
      randomizeQuestionOptions(randomizeQuestionOptions(q)),
    )
    setSectionQuestions(questions)
    setSectionAnswers(Array(questions.length).fill(null))
    setSectionScore(0)
    setCurrentQuestion(0)
    setAppState("quiz")
  }, [currentSection])

  const handleAnswerSelect = useCallback(
    (answerIndex: number) => {
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
            setAppState("sectionResults")
          }
          return next
        })
      }, 800)
    },
    [currentQuestion, sectionQuestions],
  )

  const handleTimeUp = useCallback(() => {
    setCurrentQuestion((prev) => {
      const next = prev + 1
      if (next >= sectionQuestions.length) {
        setAppState("sectionResults")
      }
      return next
    })
  }, [sectionQuestions.length])

  const handleContinueToNext = useCallback(() => {
    const newCompleted: CompletedSection = {
      sectionId: currentSection.id,
      score: sectionScore,
      answers: sectionAnswers,
    }

    const updatedCompleted = [...completedSections, newCompleted]
    setCompletedSections(updatedCompleted)

    if (currentSectionIndex + 1 < QUIZ_SECTIONS.length) {
      setCurrentSectionIndex((prev) => prev + 1)
      setAppState("sectionIntro")
    } else {
      setAppState("finalResults")
    }
  }, [currentSection, sectionScore, sectionAnswers, completedSections, currentSectionIndex])

  const handleRetakeQuiz = useCallback(() => {
    setCurrentSectionIndex(0)
    setCompletedSections([])
    setAppState("quizStart")
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Background overlay for quiz states */}
      {(appState === "quiz" ||
        appState === "sectionResults" ||
        appState === "sectionIntro" ||
        appState === "finalResults") && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.08,
          }}
        ></div>
      )}

      {appState === "video" && (
        <div
          className="min-h-screen flex items-center justify-center px-4 py-8"
          style={{
            background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
          }}
        >
          <div className="w-full max-w-3xl">
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="w-full max-w-2xl">
                <video
                  className="w-full rounded-2xl border-2 shadow-2xl"
                  style={{ borderColor: "#5de2da" }}
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ssstwitter.com_1764593741025-seCOJqTTZPJGfgi2LjhTvoHnZ56cOJ.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm text-white/70 text-center">Watch the introduction to get started</p>
            </div>
          </div>
        </div>
      )}

      {appState === "featureChooser" && (
        <div
          className="min-h-screen flex items-center justify-center px-4 py-8"
          style={{
            background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
          }}
        >
          <div className="w-full max-w-5xl">
            <div className="flex flex-col items-center gap-12 mb-12">
              <div className="flex items-center gap-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/20 rounded-3xl px-8 md:px-12 py-5 md:py-6 shadow-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center p-2 md:p-3 shadow-lg">
                  <Image
                    src="/images/arcium-logo.png"
                    alt="Arcium Logo"
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">ARCIUM</h2>
                  <p className="text-base md:text-lg lg:text-xl text-cyan-300 font-medium tracking-wider">
                    Encrypted Supercomputer
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <h1
                  className="text-2xl md:text-3xl font-semibold text-white"
                  style={{
                    letterSpacing: "-0.003rem",
                    textShadow: "0 0 20px rgba(93, 226, 218, 0.2)",
                  }}
                >
                  Welcome to the <span className="text-cyan-300">&lt;encrypted&gt;</span> World
                </h1>
                <p className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Learn and test your knowledge about Arcium's confidential computing network and ecosystem
                </p>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
                    Created with passion by a community contributor dedicated to advancing confidential computing
                    education. Join the conversation and share your knowledge!
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                      href="https://discord.com/users/1stbernice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-5 py-2.5 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/50 rounded-xl text-white transition-all hover:scale-105"
                      title="Discord: 1stbernice"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.076.076 0 0 0 .084.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span className="text-sm font-medium">1stbernice</span>
                    </a>
                    <a
                      href="https://x.com/1st_bernice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white transition-all hover:scale-105"
                      title="X (Twitter): @1st_bernice"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-sm font-medium">@1st_bernice</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* GMPC Daily */}
              <button
                onClick={handleGMPCDaily}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center space-y-4 lg:space-y-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-lg group-hover:shadow-cyan-400/50 transition-shadow">
                    📅
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">GMPC Daily</h3>
                    <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
                      Build your learning habit with daily check-ins and track your progress throughout the week
                    </p>
                  </div>
                  <div className="pt-2 lg:pt-4">
                    <span className="inline-flex items-center gap-2 text-cyan-300 font-semibold text-sm group-hover:gap-3 transition-all">
                      GMPC check in here
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>

              {/* Knowledge Quiz */}
              <button
                onClick={handleKnowledgeQuiz}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center space-y-4 lg:space-y-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-lg group-hover:shadow-purple-400/50 transition-shadow">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Knowledge Quiz</h3>
                    <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
                      Test your understanding across 5 sections covering Arcium's confidential computing ecosystem
                    </p>
                  </div>
                  <div className="pt-2 lg:pt-4">
                    <span className="inline-flex items-center gap-2 text-purple-300 font-semibold text-sm group-hover:gap-3 transition-all">
                      Begin Quiz
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>

              <button
                onClick={handleGames}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-green-400/50 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center space-y-4 lg:space-y-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-lg group-hover:shadow-green-400/50 transition-shadow">
                    🎮
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Privacy Games</h3>
                    <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
                      Learn encryption through fun mini-games and challenges
                    </p>
                  </div>
                  <div className="pt-2 lg:pt-4">
                    <span className="inline-flex items-center gap-2 text-green-300 font-semibold text-sm group-hover:gap-3 transition-all">
                      Play Games
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>

              {/* Fortress Stories */}
              <button
                onClick={handleFortressStories}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-orange-400/50 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-2 duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center space-y-4 lg:space-y-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-lg group-hover:shadow-orange-400/50 transition-shadow">
                    🏰
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Fortress Stories</h3>
                    <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
                      Discover the five legendary fortresses safeguarding your encrypted digital life
                    </p>
                  </div>
                  <div className="pt-2 lg:pt-4">
                    <span className="inline-flex items-center gap-2 text-orange-300 font-semibold text-sm group-hover:gap-3 transition-all">
                      Explore Stories
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {appState === "games" && <GamesHub onBack={handleBackToFeatures} />}

      {appState === "gmpcDaily" && <DailyCheckin onBack={handleBackToFeatures} />}

      {appState === "fortressStories" && <FortressStories onBack={handleBackToFeatures} />}

      {appState === "quizStart" && (
        <QuizStart onStart={startSectionIntro} sectionsCount={QUIZ_SECTIONS.length} onBack={handleBackToFeatures} />
      )}

      {appState === "sectionIntro" && currentSection && (
        <SectionIntro section={currentSection} onStart={startSectionQuiz} onBack={handleBackToQuizStart} />
      )}

      {appState === "quiz" && sectionQuestions.length > 0 && (
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

      {appState === "sectionResults" && currentSection && (
        <SectionResults
          section={currentSection}
          score={sectionScore}
          totalQuestions={sectionQuestions.length}
          isLastSection={currentSectionIndex === QUIZ_SECTIONS.length - 1}
          onContinue={handleContinueToNext}
        />
      )}

      {appState === "finalResults" && (
        <FinalResults sections={QUIZ_SECTIONS} completedSections={completedSections} onRetakeQuiz={handleRetakeQuiz} />
      )}
    </main>
  )
}
