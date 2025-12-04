"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addScore } from "@/lib/game-storage"

interface FortressVaultProps {
  onBack: () => void
}

interface Card {
  id: number
  concept: string
  match: string
  flipped: boolean
  matched: boolean
}

const EASY_PAIRS = [
  { concept: "MPC", match: "Multi-Party Computation" },
  { concept: "MXE", match: "Multiparty eXecution Environment" },
  { concept: "Arx Node", match: "Decentralized Computation Node" },
  { concept: "Umbra", match: "Private Transaction Protocol" },
]

const MEDIUM_PAIRS = [
  ...EASY_PAIRS,
  { concept: "Dark Pool", match: "Private Trading Venue" },
  { concept: "arxOS", match: "Distributed Execution Engine" },
  { concept: "TEE", match: "Trusted Execution Environment" },
  { concept: "ZKP", match: "Zero-Knowledge Proof" },
]

const HARD_PAIRS = [
  ...MEDIUM_PAIRS,
  { concept: "PoS", match: "Proof of Stake" },
  { concept: "Solana", match: "Blockchain Consensus Layer" },
  { concept: "DePIN", match: "Decentralized Physical Infrastructure" },
  { concept: "Arcis", match: "Rust Developer Framework" },
]

type Difficulty = "easy" | "medium" | "hard"

export default function FortressVault({ onBack }: FortressVaultProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [totalPairs, setTotalPairs] = useState(0)

  useEffect(() => {
    if (!difficulty) {
      return
    }
    initializeGame(difficulty)
  }, [difficulty])

  const initializeGame = (diff: Difficulty) => {
    const pairs = diff === "easy" ? EASY_PAIRS : diff === "medium" ? MEDIUM_PAIRS : HARD_PAIRS
    setTotalPairs(pairs.length)

    const shuffledCards: Card[] = []
    pairs.forEach((pair, index) => {
      shuffledCards.push({
        id: index * 2,
        concept: pair.concept,
        match: pair.concept,
        flipped: false,
        matched: false,
      })
      shuffledCards.push({
        id: index * 2 + 1,
        concept: pair.match,
        match: pair.concept,
        flipped: false,
        matched: false,
      })
    })

    // Shuffle
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]
    }

    setCards(shuffledCards)
    setFlippedIndices([])
    setMoves(0)
    setMatches(0)
    setGameComplete(false)
    setDifficulty(diff)
  }

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched || flippedIndices.includes(index)) {
      return
    }

    const newFlipped = [...flippedIndices, index]
    setFlippedIndices(newFlipped)

    setCards((prev) => prev.map((card, i) => (i === index ? { ...card, flipped: true } : card)))

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1)
      const [first, second] = newFlipped
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.match === secondCard.match && firstCard.id !== secondCard.id) {
        // Match found
        setTimeout(() => {
          setCards((prev) => prev.map((card, i) => (i === first || i === second ? { ...card, matched: true } : card)))
          setFlippedIndices([])
          setMatches((prev) => {
            const newMatches = prev + 1
            if (newMatches === totalPairs) {
              setGameComplete(true)
              const multiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2
              addScore(Math.floor((100 * multiplier) / moves), "fortressvault")
            }
            return newMatches
          })
        }, 600)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) => prev.map((card, i) => (i === first || i === second ? { ...card, flipped: false } : card)))
          setFlippedIndices([])
        }, 1000)
      }
    }
  }

  if (!difficulty) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
        }}
      >
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border-2 border-orange-400/50 rounded-3xl p-12 text-center shadow-2xl">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-4xl font-bold text-white mb-4">Fortress Vault</h1>
          <p className="text-white/70 mb-8">Match pairs of Arcium concepts and their meanings</p>

          <div className="space-y-4">
            <Button
              onClick={() => initializeGame("easy")}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-6 text-lg"
            >
              Easy - 4 Pairs
            </Button>
            <Button
              onClick={() => initializeGame("medium")}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-6 text-lg"
            >
              Medium - 8 Pairs
            </Button>
            <Button
              onClick={() => initializeGame("hard")}
              className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-6 text-lg"
            >
              Hard - 12 Pairs
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent py-6 text-lg"
            >
              Back to Games
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const nextDifficulty = difficulty === "easy" ? "medium" : difficulty === "medium" ? "hard" : null

    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
        }}
      >
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border-2 border-orange-400/50 rounded-3xl p-12 text-center shadow-2xl">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-4xl font-bold text-white mb-4">Vault Unlocked!</h2>
          <p className="text-2xl text-orange-300 mb-2">
            {difficulty?.toUpperCase()} - Completed in {moves} moves
          </p>
          <p className="text-white/70 mb-8">All pairs matched successfully!</p>
          <div className="flex gap-4 justify-center">
            {nextDifficulty ? (
              <Button
                onClick={() => initializeGame(nextDifficulty)}
                className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold px-8 py-6 text-lg"
              >
                Next Level: {nextDifficulty.toUpperCase()}
              </Button>
            ) : (
              <Button
                onClick={() => setDifficulty(null)}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-6 text-lg"
              >
                Play Again
              </Button>
            )}
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={() => setDifficulty(null)} variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex gap-6 text-white font-bold text-xl">
            <div className="capitalize">{difficulty}</div>
            <div>Moves: {moves}</div>
            <div>
              Matches: {matches}/{totalPairs}
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center text-3xl">
              🎯
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Fortress Vault</h1>
          </div>
          <p className="text-white/70">Match pairs of Arcium concepts and their meanings</p>
        </div>

        <div
          className={`grid gap-4 ${difficulty === "easy" ? "grid-cols-2 md:grid-cols-4" : difficulty === "medium" ? "grid-cols-4" : "grid-cols-4 md:grid-cols-6"}`}
        >
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-xl border-2 font-semibold text-sm md:text-base transition-all duration-300 transform ${
                card.matched
                  ? "bg-green-400/20 border-green-400 text-green-300 scale-95"
                  : card.flipped
                    ? "bg-white/10 border-orange-400 text-white scale-105"
                    : "bg-gradient-to-br from-purple-600 to-blue-600 border-white/20 text-transparent hover:scale-105"
              }`}
              disabled={card.matched || flippedIndices.length === 2}
            >
              <div className="h-full flex items-center justify-center p-4">
                {card.flipped || card.matched ? (
                  <span className="text-center break-words">{card.concept}</span>
                ) : (
                  <span className="text-4xl">🔒</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
