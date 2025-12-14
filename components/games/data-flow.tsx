"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addScore } from "@/lib/game-storage"
import { SubmitScoreModal } from "@/components/submit-score-modal"

interface FlowStep {
  id: string
  name: string
  icon: string
  description: string
}

interface DataFlowProps {
  onBack: () => void
}

export default function DataFlow({ onBack }: DataFlowProps) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [gameState, setGameState] = useState<"playing" | "complete" | "failed">("playing")
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const allSteps: FlowStep[] = [
    { id: "input", name: "Data Input", icon: "📊", description: "Raw encrypted data" },
    { id: "arx", name: "Arx Node", icon: "🖥️", description: "Computation node" },
    { id: "mxe", name: "MXE", icon: "⚙️", description: "Execution environment" },
    { id: "mpc", name: "MPC Protocol", icon: "🔐", description: "Multi-party computation" },
    { id: "verify", name: "Verify", icon: "✓", description: "Result verification" },
    { id: "solana", name: "Solana Chain", icon: "⛓️", description: "On-chain settlement" },
    { id: "output", name: "Output", icon: "✨", description: "Final result" },
  ]

  const correctPaths: Record<number, string[]> = {
    1: ["input", "arx", "mxe", "output"],
    2: ["input", "arx", "mpc", "verify", "output"],
    3: ["input", "mxe", "mpc", "verify", "solana", "output"],
    4: ["input", "arx", "mxe", "mpc", "verify", "output"],
    5: ["input", "arx", "mxe", "mpc", "verify", "solana", "output"],
  }

  const [availableSteps, setAvailableSteps] = useState<FlowStep[]>([])

  useEffect(() => {
    initializeLevel(level)
  }, [level])

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("failed")
      setFeedback("Time's up! The data flow was not completed in time.")
      addScore(score, "data_flow")
    }
  }, [timeLeft, gameState])

  const initializeLevel = (lvl: number) => {
    const correctPath = correctPaths[lvl]
    const shuffled = [...allSteps].sort(() => Math.random() - 0.5)
    setAvailableSteps(shuffled)
    setCurrentPath([])
    setFeedback("")
    setGameState("playing")
    setTimeLeft(30 - lvl * 2)
  }

  const handleStepClick = (stepId: string) => {
    if (gameState !== "playing") return

    const correctPath = correctPaths[level]
    const nextCorrectStep = correctPath[currentPath.length]

    if (stepId === nextCorrectStep) {
      const newPath = [...currentPath, stepId]
      setCurrentPath(newPath)

      if (newPath.length === correctPath.length) {
        const pointsEarned = level * 120 + timeLeft * 5
        setScore(score + pointsEarned)
        setFeedback(`Perfect! Data routed successfully. +${pointsEarned} points (${timeLeft}s bonus)`)

        if (level >= 5) {
          setGameState("complete")
          addScore(score + pointsEarned, "data_flow")
        } else {
          setTimeout(() => {
            setLevel(level + 1)
          }, 2000)
        }
      }
    } else {
      setGameState("failed")
      setFeedback("Incorrect route! The data failed to reach its destination securely.")
      addScore(score, "data_flow")
    }
  }

  const resetGame = () => {
    setLevel(1)
    setScore(0)
    initializeLevel(1)
  }

  if ((gameState === "complete" || gameState === "failed") && !showSubmitModal) {
    return (
      <SubmitScoreModal
        score={score}
        gameName="Data Flow"
        onSubmitted={() => setShowSubmitModal(true)}
        onSkip={() => setShowSubmitModal(true)}
      />
    )
  }

  if (showSubmitModal) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
        }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center">
          <div className="text-6xl mb-4">{gameState === "complete" ? "🎉" : "⚠️"}</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {gameState === "complete" ? "Data Flow Master!" : "Connection Failed"}
          </h2>
          <p className="text-white/70 mb-6">
            {gameState === "complete"
              ? "You've mastered routing encrypted data through Arcium's network!"
              : "The data couldn't be routed correctly. Study the flow patterns and try again!"}
          </p>
          <div className="text-5xl font-bold text-cyan-300 mb-8">Score: {score}</div>
          <div className="space-y-3">
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Play Again
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full text-white border-white/30 hover:bg-white/10 bg-transparent"
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
          <div className="text-white">
            <span className="font-bold">Level {level}</span> | Score: {score} | Time: {timeLeft}s
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Encrypted Data Flow</h2>
          <p className="text-white/80 text-center mb-6">
            Route encrypted data through the correct Arcium network components in the right order!
          </p>

          {/* Current Path Display */}
          <div className="bg-black/20 rounded-2xl p-6 mb-6 min-h-[100px]">
            <div className="text-white/70 text-sm mb-3 text-center">Current Path:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {currentPath.map((stepId, idx) => {
                const step = allSteps.find((s) => s.id === stepId)
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl px-4 py-2 text-white font-semibold flex items-center gap-2">
                      <span className="text-2xl">{step?.icon}</span>
                      <span>{step?.name}</span>
                    </div>
                    {idx < currentPath.length - 1 && <ArrowRight className="text-cyan-300" />}
                  </div>
                )
              })}
              {currentPath.length === 0 && (
                <div className="text-white/50 italic">Select the first component to start...</div>
              )}
            </div>
          </div>

          {/* Available Steps */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {availableSteps.map((step) => {
              const isUsed = currentPath.includes(step.id)
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  disabled={isUsed}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isUsed
                      ? "bg-green-500/20 border-green-400/50 opacity-50 cursor-not-allowed"
                      : "bg-white/5 border-white/20 hover:border-cyan-400/60 hover:bg-white/10 hover:scale-105"
                  }`}
                >
                  <div className="text-4xl mb-2">{step.icon}</div>
                  <div className="text-white font-semibold mb-1">{step.name}</div>
                  <div className="text-white/60 text-xs">{step.description}</div>
                </button>
              )
            })}
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-xl text-center ${
                feedback.includes("Perfect") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
              }`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
