"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickFireMPCProps {
  onBack: () => void
}

interface Question {
  question: string
  options: string[]
  correct: number
}

const QUESTIONS: Question[] = [
  {
    question: "What does MPC stand for?",
    options: [
      "Multi-Party Computation",
      "Multi-Process Computing",
      "Managed Privacy Control",
      "Multiple Protocol Chain",
    ],
    correct: 0,
  },
  {
    question: "What blockchain does Arcium primarily use?",
    options: ["Ethereum", "Solana", "Polygon", "Avalanche"],
    correct: 1,
  },
  {
    question: "What is an MXE in Arcium?",
    options: [
      "Multi-eXchange Engine",
      "Multiparty eXecution Environment",
      "Maximum eXecution Element",
      "Managed eXternal Entity",
    ],
    correct: 1,
  },
  {
    question: "Arcium enables computation on what type of data?",
    options: ["Compressed data", "Encrypted data", "Public data", "Archived data"],
    correct: 1,
  },
  {
    question: "What are Arx nodes?",
    options: ["Storage servers", "Decentralized computation nodes", "Smart contracts", "Token validators"],
    correct: 1,
  },
  {
    question: "Which protocol does Umbra provide?",
    options: ["Payment processing", "Private transactions", "Token minting", "NFT trading"],
    correct: 1,
  },
  {
    question: "Dark pools in DeFi protect traders from what?",
    options: ["High gas fees", "MEV and front-running", "Slow transactions", "Network congestion"],
    correct: 1,
  },
  {
    question: "What is arxOS?",
    options: ["A mobile app", "Distributed execution engine", "A smart contract", "A wallet"],
    correct: 1,
  },
]

export default function QuickFireMPC({ onBack }: QuickFireMPCProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])

  useEffect(() => {
    setShuffledQuestions([...QUESTIONS].sort(() => Math.random() - 0.5))
  }, [])

  const question = shuffledQuestions[currentQuestion]

  useEffect(() => {
    if (showResult || gameComplete) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout()
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, showResult, gameComplete])

  const handleTimeout = () => {
    setShowResult(true)
    setTimeout(() => {
      if (currentQuestion + 1 >= shuffledQuestions.length) {
        setGameComplete(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(10)
      }
    }, 1500)
  }

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)

    if (index === question.correct) {
      setScore((prev) => prev + timeLeft * 10)
    }

    setTimeout(() => {
      if (currentQuestion + 1 >= shuffledQuestions.length) {
        setGameComplete(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(10)
      }
    }, 1500)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(10)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
    setShuffledQuestions([...QUESTIONS].sort(() => Math.random() - 0.5))
  }

  if (shuffledQuestions.length === 0) return null

  if (gameComplete) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
        }}
      >
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl p-12 text-center shadow-2xl">
          <div className="text-6xl mb-6">⚡</div>
          <h2 className="text-4xl font-bold text-white mb-4">Quick Fire Complete!</h2>
          <p className="text-2xl text-purple-300 mb-2">Final Score: {score} points</p>
          <p className="text-white/70 mb-8">
            You got {shuffledQuestions.filter((_, i) => i < currentQuestion).length} out of {shuffledQuestions.length}{" "}
            correct!
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleRestart}
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-8 py-6 text-lg"
            >
              Play Again
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent"
            >
              Back to Games
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-white font-bold text-xl">Score: {score}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-3xl">
                ⚡
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Quick Fire MPC</h1>
            </div>
            <div className="flex items-center justify-center gap-6">
              <p className="text-white/70">
                Question {currentQuestion + 1} of {shuffledQuestions.length}
              </p>
              <div className={`text-2xl font-bold ${timeLeft <= 3 ? "text-red-400 animate-pulse" : "text-purple-300"}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/30 border-2 border-purple-400/50 rounded-2xl p-6">
              <div className="text-xl md:text-2xl font-semibold text-white text-center">{question.question}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === question.correct
                const showCorrect = showResult && isCorrect
                const showWrong = showResult && isSelected && !isCorrect

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`p-6 rounded-xl border-2 font-semibold text-lg transition-all ${
                      showCorrect
                        ? "bg-green-400/20 border-green-400 text-green-300"
                        : showWrong
                          ? "bg-red-400/20 border-red-400 text-red-300"
                          : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400/50"
                    } disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <Check className="w-6 h-6" />}
                      {showWrong && <X className="w-6 h-6" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
