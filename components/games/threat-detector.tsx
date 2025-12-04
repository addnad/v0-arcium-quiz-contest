"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addScore } from "@/lib/game-storage"

interface ThreatScenario {
  secure: string
  insecure: string
  vulnerability: string
}

const scenarios: ThreatScenario[] = [
  {
    secure: "const hashedPassword = await bcrypt.hash(password, 10)",
    insecure: "const password = req.body.password // stored as plain text",
    vulnerability: "Plain text password storage",
  },
  {
    secure: "if (user.id === resource.ownerId) { // access granted }",
    insecure: "// No ownership check, anyone can access",
    vulnerability: "Missing access control",
  },
  {
    secure: "const encrypted = await encrypt(data, publicKey)",
    insecure: "const data = sensitiveInfo // sent unencrypted",
    vulnerability: "Unencrypted sensitive data transmission",
  },
  {
    secure: "sql.query('SELECT * FROM users WHERE id = ?', [userId])",
    insecure: "sql.query('SELECT * FROM users WHERE id = ' + userId)",
    vulnerability: "SQL Injection vulnerability",
  },
  {
    secure: "res.setHeader('X-Frame-Options', 'DENY')",
    insecure: "// No security headers set",
    vulnerability: "Missing security headers",
  },
]

interface ThreatDetectorProps {
  onBack: () => void
}

export default function ThreatDetector({ onBack }: ThreatDetectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedCode, setSelectedCode] = useState<"secure" | "insecure" | null>(null)
  const [completed, setCompleted] = useState(false)

  const currentScenario = scenarios[currentIndex]

  const handleSelection = (choice: "secure" | "insecure") => {
    setSelectedCode(choice)
    setShowResult(true)
    if (choice === "insecure") {
      setScore(score + 100)
    }
  }

  const nextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowResult(false)
      setSelectedCode(null)
    } else {
      setCompleted(true)
      addScore(score, "threat")
    }
  }

  if (completed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-5xl">
            🔍
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Detection Complete!</h2>
          <p className="text-5xl font-bold text-red-400 mb-6">{score}</p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setCurrentIndex(0)
                setScore(0)
                setShowResult(false)
                setSelectedCode(null)
                setCompleted(false)
              }}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            >
              Play Again
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
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
      style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Games
        </Button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-4xl">
            🔍
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Threat Detector</h1>
          <p className="text-white/70 mb-4">
            Scenario {currentIndex + 1} of {scenarios.length}
          </p>
          <div className="text-white/80 text-xl">Score: {score}</div>
        </div>

        <div className="mb-8">
          <p className="text-center text-white/70 text-lg mb-6">Which code has the security vulnerability?</p>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => !showResult && handleSelection("secure")}
              disabled={showResult}
              className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all ${
                showResult
                  ? selectedCode === "secure"
                    ? "border-red-500/60"
                    : "border-green-500/60"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <div className="text-white/70 text-sm mb-3">Code Sample A</div>
              <code className="text-white text-sm font-mono block whitespace-pre-wrap">{currentScenario.secure}</code>
            </button>

            <button
              onClick={() => !showResult && handleSelection("insecure")}
              disabled={showResult}
              className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all ${
                showResult
                  ? selectedCode === "insecure"
                    ? "border-green-500/60"
                    : "border-red-500/60"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <div className="text-white/70 text-sm mb-3">Code Sample B</div>
              <code className="text-white text-sm font-mono block whitespace-pre-wrap">{currentScenario.insecure}</code>
            </button>
          </div>
        </div>

        {showResult && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {selectedCode === "insecure" ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400" />
              )}
              <span className={`text-xl font-bold ${selectedCode === "insecure" ? "text-green-400" : "text-red-400"}`}>
                {selectedCode === "insecure" ? "Correct!" : "Incorrect"}
              </span>
            </div>
            <div className="text-white/70">
              <span className="font-bold text-red-400">Vulnerability:</span> {currentScenario.vulnerability}
            </div>
            <div className="text-white/70 mt-2">Code Sample B contains the security issue.</div>
            <Button
              onClick={nextScenario}
              className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            >
              {currentIndex < scenarios.length - 1 ? "Next Scenario" : "View Results"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
