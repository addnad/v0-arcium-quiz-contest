"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addScore, unlockAchievement } from "@/lib/game-storage"
import { SubmitScoreModal } from "@/components/submit-score-modal"

interface DataDefenderProps {
  onBack: () => void
}

interface Threat {
  id: number
  type: string
  description: string
  correctProtocol: string
  level: number
}

const allThreats: Threat[] = [
  // Level 1 - Easy
  {
    id: 1,
    type: "Data Breach",
    description: "Unauthorized access to sensitive data",
    correctProtocol: "MPC",
    level: 1,
  },
  { id: 2, type: "Man-in-the-Middle", description: "Intercepting communication", correctProtocol: "TEE", level: 1 },
  { id: 3, type: "Data Leak", description: "Sensitive info exposure", correctProtocol: "Encryption", level: 1 },
  { id: 4, type: "Privacy Violation", description: "Personal data misuse", correctProtocol: "MPC", level: 1 },
  {
    id: 5,
    type: "Eavesdropping",
    description: "Listening to private conversations",
    correctProtocol: "Encryption",
    level: 1,
  },

  // Level 2 - Medium
  {
    id: 6,
    type: "Side-Channel Attack",
    description: "Extracting secrets via timing",
    correctProtocol: "ZKP",
    level: 2,
  },
  { id: 7, type: "Data Tampering", description: "Modifying data in transit", correctProtocol: "TEE", level: 2 },
  { id: 8, type: "Identity Theft", description: "Stealing user credentials", correctProtocol: "ZKP", level: 2 },
  { id: 9, type: "Replay Attack", description: "Reusing captured data", correctProtocol: "TEE", level: 2 },
  {
    id: 10,
    type: "Collusion Attack",
    description: "Multiple parties cooperating maliciously",
    correctProtocol: "MPC",
    level: 2,
  },

  // Level 3 - Hard
  {
    id: 11,
    type: "Inference Attack",
    description: "Deriving private data from public info",
    correctProtocol: "ZKP",
    level: 3,
  },
  { id: 12, type: "Model Extraction", description: "Stealing ML model parameters", correctProtocol: "TEE", level: 3 },
  {
    id: 13,
    type: "Membership Inference",
    description: "Determining if data was in training set",
    correctProtocol: "ZKP",
    level: 3,
  },
  {
    id: 14,
    type: "Byzantine Attack",
    description: "Corrupted nodes sending false data",
    correctProtocol: "MPC",
    level: 3,
  },
  {
    id: 15,
    type: "Gradient Leakage",
    description: "Extracting data from model updates",
    correctProtocol: "TEE",
    level: 3,
  },
]

const protocols = ["MPC", "TEE", "ZKP", "Encryption"]

export default function DataDefender({ onBack }: DataDefenderProps) {
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | null>(null)
  const [currentThreat, setCurrentThreat] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [shuffledThreats, setShuffledThreats] = useState<Threat[]>([])
  const [shuffledProtocols, setShuffledProtocols] = useState<string[]>([])
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  useEffect(() => {
    if (difficulty) {
      const levelThreats = allThreats.filter((t) => t.level === difficulty)
      setShuffledThreats([...levelThreats].sort(() => Math.random() - 0.5))
    }
  }, [difficulty])

  useEffect(() => {
    setShuffledProtocols([...protocols].sort(() => Math.random() - 0.5))
  }, [currentThreat])

  const handleProtocolSelect = (protocol: string) => {
    const threat = shuffledThreats[currentThreat]
    const correct = protocol === threat.correctProtocol

    if (correct) {
      const points = difficulty === 1 ? 100 : difficulty === 2 ? 150 : 200
      setScore(score + points)
      setFeedback("correct")
    } else {
      setFeedback("wrong")
    }

    setTimeout(() => {
      setFeedback(null)
      if (currentThreat < shuffledThreats.length - 1) {
        setCurrentThreat(currentThreat + 1)
      } else {
        if (difficulty && difficulty < 3) {
          setDifficulty((difficulty + 1) as 1 | 2 | 3)
          setCurrentThreat(0)
        } else {
          setGameOver(true)
          addScore(score + (correct ? (difficulty === 3 ? 200 : difficulty === 2 ? 150 : 100) : 0), "datadefender")
          if (score >= 1500) unlockAchievement("first_game")
        }
      }
    }, 1500)
  }

  const handleRestart = () => {
    setDifficulty(null)
    setCurrentThreat(0)
    setScore(0)
    setGameOver(false)
    setFeedback(null)
    setShowSubmitModal(false)
  }

  if (!difficulty) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center text-5xl">
            🛡️
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Data Defender</h1>
          <p className="text-white/70 mb-8 text-center">Select your starting level</p>
          <div className="space-y-3">
            <Button
              onClick={() => setDifficulty(1)}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-6 text-lg"
            >
              Level 1: Basic Threats
            </Button>
            <Button
              onClick={() => setDifficulty(2)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-6 text-lg"
            >
              Level 2: Advanced Threats
            </Button>
            <Button
              onClick={() => setDifficulty(3)}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-6 text-lg"
            >
              Level 3: Expert Threats
            </Button>
          </div>
          <Button onClick={onBack} variant="outline" className="w-full mt-4 bg-transparent">
            Back to Games
          </Button>
        </div>
      </div>
    )
  }

  if (shuffledThreats.length === 0) return null

  if (gameOver && !showSubmitModal) {
    return (
      <SubmitScoreModal
        score={score}
        gameName="Data Defender"
        onSubmitted={() => setShowSubmitModal(true)}
        onSkip={() => setShowSubmitModal(true)}
      />
    )
  }

  if (showSubmitModal) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center text-6xl">
            🛡️
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">All Levels Complete!</h2>
          <div className="text-6xl font-bold text-green-300 mb-6">{score}</div>
          <p className="text-white/70 mb-8">You mastered all defense levels!</p>
          <div className="flex gap-4">
            <Button onClick={handleRestart} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-6">
              Play Again
            </Button>
            <Button onClick={onBack} variant="outline" className="flex-1 py-6 bg-transparent">
              Back to Games
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const threat = shuffledThreats[currentThreat]
  const difficultyLabel = difficulty === 1 ? "BASIC" : difficulty === 2 ? "ADVANCED" : "EXPERT"

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-white font-bold text-xl">Score: {score}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Data Defender</h2>
            </div>
            <div className="text-white/70">
              Level {difficulty}: {difficultyLabel}
            </div>
          </div>

          <div className="text-center text-white/70 mb-6">Question {currentThreat + 1} / 5</div>

          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 mb-8">
            <div className="text-red-300 font-bold text-lg mb-2">{threat.type}</div>
            <div className="text-white/80">{threat.description}</div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-bold mb-4 text-center">Select the best privacy protocol:</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {shuffledProtocols.map((protocol) => (
              <button
                key={protocol}
                onClick={() => handleProtocolSelect(protocol)}
                disabled={feedback !== null}
                className={`p-6 rounded-2xl font-bold text-lg transition-all ${
                  feedback === "correct" && protocol === threat.correctProtocol
                    ? "bg-green-500 text-white scale-105"
                    : feedback === "wrong" && protocol !== threat.correctProtocol
                      ? "bg-white/5 text-white/30"
                      : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                }`}
              >
                {protocol}
                {feedback === "correct" && protocol === threat.correctProtocol && (
                  <Check className="w-6 h-6 inline-block ml-2" />
                )}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-bold ${
                feedback === "correct" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
              }`}
            >
              {feedback === "correct"
                ? `Correct! +${difficulty === 1 ? 100 : difficulty === 2 ? 150 : 200} points`
                : `Wrong! Correct answer: ${threat.correctProtocol}`}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
