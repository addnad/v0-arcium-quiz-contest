"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addScore, unlockAchievement } from "@/lib/game-storage"

interface DataDefenderProps {
  onBack: () => void
}

interface Threat {
  id: number
  type: string
  description: string
  correctProtocol: string
}

const threats: Threat[] = [
  { id: 1, type: "Data Breach", description: "Unauthorized access to sensitive data", correctProtocol: "MPC" },
  { id: 2, type: "Man-in-the-Middle", description: "Intercepting communication", correctProtocol: "TEE" },
  { id: 3, type: "Side-Channel Attack", description: "Extracting secrets via timing", correctProtocol: "ZKP" },
  { id: 4, type: "Data Leak", description: "Sensitive info exposure", correctProtocol: "Encryption" },
  { id: 5, type: "Privacy Violation", description: "Personal data misuse", correctProtocol: "MPC" },
]

const protocols = ["MPC", "TEE", "ZKP", "Encryption"]

export default function DataDefender({ onBack }: DataDefenderProps) {
  const [currentThreat, setCurrentThreat] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [shuffledThreats, setShuffledThreats] = useState<Threat[]>([])

  useEffect(() => {
    setShuffledThreats([...threats].sort(() => Math.random() - 0.5))
  }, [])

  const handleProtocolSelect = (protocol: string) => {
    const threat = shuffledThreats[currentThreat]
    const correct = protocol === threat.correctProtocol

    if (correct) {
      setScore(score + 200)
      setFeedback("correct")
    } else {
      setFeedback("wrong")
    }

    setTimeout(() => {
      setFeedback(null)
      if (currentThreat < shuffledThreats.length - 1) {
        setCurrentThreat(currentThreat + 1)
      } else {
        setGameOver(true)
        addScore(score + (correct ? 200 : 0), "datadefender")
        if (score >= 800) unlockAchievement("first_game")
      }
    }, 1500)
  }

  const handleRestart = () => {
    setCurrentThreat(0)
    setScore(0)
    setGameOver(false)
    setFeedback(null)
    setShuffledThreats([...threats].sort(() => Math.random() - 0.5))
  }

  if (shuffledThreats.length === 0) return null

  if (gameOver) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center text-6xl">
            🛡️
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Mission Complete!</h2>
          <div className="text-6xl font-bold text-green-300 mb-6">{score}</div>
          <p className="text-white/70 mb-8">You defended the data successfully!</p>
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
              Threat {currentThreat + 1} / {shuffledThreats.length}
            </div>
          </div>

          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 mb-8">
            <div className="text-red-300 font-bold text-lg mb-2">{threat.type}</div>
            <div className="text-white/80">{threat.description}</div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-bold mb-4 text-center">Select the best privacy protocol:</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {protocols.map((protocol) => (
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
              {feedback === "correct" ? "Correct! +200 points" : `Wrong! Correct answer: ${threat.correctProtocol}`}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
