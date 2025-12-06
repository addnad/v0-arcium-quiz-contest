"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addScore } from "@/lib/game-storage"

interface Word {
  word: string
  definition: string
}

const easyWords: Word[] = [
  { word: "ENCRYPTION", definition: "The process of converting information into code to prevent unauthorized access" },
  { word: "CONFIDENTIAL", definition: "Intended to be kept secret" },
  { word: "BLOCKCHAIN", definition: "Distributed ledger technology with cryptographic security" },
  { word: "PROTOCOL", definition: "A set of rules governing communication between systems" },
  { word: "HASH", definition: "A fixed-size output derived from variable-size input data" },
]

const mediumWords: Word[] = [
  { word: "CRYPTOGRAPHY", definition: "The practice of secure communication in the presence of adversaries" },
  { word: "MULTIPARTY", definition: "Involving multiple independent parties" },
  { word: "VERIFIABLE", definition: "Able to be checked or demonstrated to be true or accurate" },
  { word: "DECENTRALIZED", definition: "Distributed away from a central authority" },
  { word: "AUTHENTICATION", definition: "The process of verifying the identity of a user or system" },
  { word: "OBFUSCATION", definition: "Making something obscure or unclear to protect it" },
  { word: "TRUSTLESS", definition: "Not requiring trust in a third party to operate securely" },
  { word: "IMMUTABLE", definition: "Unable to be changed or altered once recorded" },
  { word: "CIPHERTEXT", definition: "Encrypted data that appears as random nonsense without the decryption key" },
  { word: "CONSENSUS", definition: "General agreement among participants in a network" },
]

const hardWords: Word[] = [
  { word: "HOMOMORPHIC", definition: "Type of encryption allowing computation on encrypted data" },
  { word: "STEGANOGRAPHY", definition: "The practice of concealing messages within other non-secret data" },
  { word: "ZERO KNOWLEDGE", definition: "Proving knowledge of information without revealing the information itself" },
  { word: "CRYPTANALYSIS", definition: "The study of analyzing information systems to break cryptographic security" },
  { word: "ORCHESTRATION", definition: "The coordination and management of complex computer systems" },
  { word: "PSEUDONYMOUS", definition: "Using a false name while maintaining a consistent identity" },
  { word: "ATTESTATION", definition: "Proof or evidence that something is true or genuine" },
  { word: "BYZANTINE", definition: "Relating to fault tolerance in distributed systems with malicious actors" },
  { word: "PARALLELIZATION", definition: "Executing multiple processes simultaneously for efficiency" },
  { word: "ADVERSARY", definition: "An opponent or attacker attempting to compromise security" },
  { word: "ENTROPY", definition: "A measure of randomness or unpredictability" },
  { word: "DETERMINISTIC", definition: "Producing the same output for the same input every time" },
  { word: "FRAGMENTATION", definition: "Breaking data into smaller pieces for distribution" },
  { word: "COMPARTMENTALIZED", definition: "Divided into separate sections to limit access" },
  { word: "RESILIENCE", definition: "The ability to recover quickly from difficulties or attacks" },
]

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

interface PrivacySpellingBeeProps {
  onBack: () => void
}

export default function PrivacySpellingBee({ onBack }: PrivacySpellingBeeProps) {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null)
  const [shuffleKey, setShuffleKey] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)

  const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2

  const shuffledWords = useMemo(() => {
    if (!difficulty) return []
    const wordPool = difficulty === "easy" ? easyWords : difficulty === "medium" ? mediumWords : hardWords
    return shuffleArray(wordPool)
  }, [shuffleKey, difficulty])

  const currentWord = shuffledWords[currentIndex]

  const checkSpelling = () => {
    const correct = userInput.toUpperCase().trim() === currentWord.word
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setScore(score + 100 * difficultyMultiplier)
    }
  }

  const nextWord = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserInput("")
      setShowResult(false)
    } else {
      const finalScore = score + (isCorrect ? 100 * difficultyMultiplier : 0)
      setCompleted(true)
      addScore(finalScore, "spelling")
    }
  }

  const resetGame = () => {
    setShuffleKey((prev) => prev + 1)
    setCurrentIndex(0)
    setUserInput("")
    setScore(0)
    setShowResult(false)
    setIsCorrect(false)
    setCompleted(false)
  }

  const nextLevel = () => {
    if (difficulty === "easy") {
      setDifficulty("medium")
    } else if (difficulty === "medium") {
      setDifficulty("hard")
    }
    resetGame()
  }

  const backToMenu = () => {
    setDifficulty(null)
    resetGame()
  }

  if (!difficulty) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-2xl w-full">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center text-5xl">
              🐝
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Spelling Bee</h1>
            <p className="text-white/70">Choose your difficulty level</p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => setDifficulty("easy")}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-teal-400 hover:bg-white/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Easy</h3>
                <span className="text-teal-400 text-xl">5 Words</span>
              </div>
              <p className="text-white/70">Basic privacy and cryptography terms</p>
            </button>

            <button
              onClick={() => setDifficulty("medium")}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-cyan-400 hover:bg-white/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Medium</h3>
                <span className="text-cyan-400 text-xl">10 Words</span>
              </div>
              <p className="text-white/70">Intermediate confidential computing concepts</p>
            </button>

            <button
              onClick={() => setDifficulty("hard")}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-purple-400 hover:bg-white/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Hard</h3>
                <span className="text-purple-400 text-xl">15 Words</span>
              </div>
              <p className="text-white/70">Advanced technical terminology</p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (completed) {
    const isLastLevel = difficulty === "hard"
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center text-5xl">
            🐝
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Level Complete!</h2>
          <p className="text-white/70 mb-4 capitalize">{difficulty} Mode</p>
          <p className="text-5xl font-bold text-teal-400 mb-6">{score}</p>
          <div className="space-y-3">
            {!isLastLevel ? (
              <Button
                onClick={nextLevel}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
              >
                Next Level: {difficulty === "easy" ? "MEDIUM" : "HARD"}
              </Button>
            ) : (
              <Button
                onClick={backToMenu}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
              >
                Play Again
              </Button>
            )}
            <Button onClick={backToMenu} variant="outline" className="w-full bg-transparent">
              {isLastLevel ? "Back to Level Select" : "Change Difficulty"}
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
      <div className="max-w-2xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Games
        </Button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center text-4xl">
            🐝
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Spelling Bee</h1>
          <p className="text-white/70">
            Word {currentIndex + 1} of {shuffledWords.length}
          </p>
          <div className="text-white/80 text-xl mt-2">Score: {score}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 mb-6">
          <div className="mb-8">
            <h3 className="text-white/70 text-sm mb-2">Definition:</h3>
            <p className="text-white text-xl leading-relaxed">{currentWord.definition}</p>
          </div>

          {!showResult ? (
            <div className="space-y-4">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer..."
                className="bg-white/5 border-white/20 text-white text-2xl text-center placeholder:text-white/40 h-16"
                onKeyPress={(e) => e.key === "Enter" && checkSpelling()}
              />
              <Button
                onClick={checkSpelling}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-lg py-6"
              >
                Check Spelling
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl ${isCorrect ? "bg-green-500/20" : "bg-red-500/20"}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400" />
                  )}
                  <span className={`text-2xl font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                <p className="text-white text-3xl font-mono text-center">{currentWord.word}</p>
              </div>
              <Button
                onClick={nextWord}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-lg py-6"
              >
                {currentIndex < shuffledWords.length - 1 ? "Next Word" : "View Results"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
