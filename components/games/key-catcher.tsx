"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { addScore } from "@/lib/game-storage"

interface FallingItem {
  id: number
  x: number
  y: number
  type: "key" | "vulnerability"
  emoji: string
}

interface KeyCatcherProps {
  onBack: () => void
}

export default function KeyCatcher({ onBack }: KeyCatcherProps) {
  const [playerX, setPlayerX] = useState(50)
  const [items, setItems] = useState<FallingItem[]>([])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const nextIdRef = useRef(0)
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const keyEmojis = ["🔑", "🗝️", "🔐", "🔓", "🔒", "🗿", "💎", "🪙"]
  const vulnEmojis = ["💣", "🧨", "💥", "☠️"]

  const getFallSpeed = () => (elapsedTime > 30 ? 4.5 : 2.5)
  const getSpawnInterval = () => (elapsedTime > 30 ? 500 : 900)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const spawnItem = useCallback(() => {
    const isKey = Math.random() > 0.25
    const newItem: FallingItem = {
      id: nextIdRef.current++,
      x: Math.random() * 85,
      y: 0,
      type: isKey ? "key" : "vulnerability",
      emoji: isKey
        ? keyEmojis[Math.floor(Math.random() * keyEmojis.length)]
        : vulnEmojis[Math.floor(Math.random() * vulnEmojis.length)],
    }
    setItems((prev) => [...prev, newItem])
  }, [])

  useEffect(() => {
    if (!gameActive) return

    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current)
    }

    const interval = getSpawnInterval()
    spawnIntervalRef.current = setInterval(spawnItem, interval)

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
      }
    }
  }, [gameActive, spawnItem, elapsedTime])

  useEffect(() => {
    if (!gameActive) return

    const gameLoop = setInterval(() => {
      const currentFallSpeed = getFallSpeed()

      setItems((prevItems) => {
        const updated = prevItems
          .map((item) => ({ ...item, y: item.y + currentFallSpeed }))
          .filter((item) => {
            if (item.y > 80 && item.y < 95) {
              if (Math.abs(item.x - playerX) < 8) {
                if (item.type === "key") {
                  setScore((s) => s + 10)
                } else {
                  setGameActive(false)
                  setGameOver(true)
                  addScore(score, "keycatcher")
                }
                return false
              }
            }
            return item.y < 100
          })
        return updated
      })
    }, 50)

    return () => clearInterval(gameLoop)
  }, [gameActive, playerX, score, elapsedTime])

  useEffect(() => {
    if (!gameActive) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((x) => Math.max(0, x - 5))
      } else if (e.key === "ArrowRight") {
        setPlayerX((x) => Math.min(90, x + 5))
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameActive])

  const moveLeft = () => {
    setPlayerX((x) => Math.max(0, x - 8))
  }

  const moveRight = () => {
    setPlayerX((x) => Math.min(90, x + 8))
  }

  const startGame = () => {
    setScore(0)
    setPlayerX(50)
    setItems([])
    nextIdRef.current = 0
    setGameActive(true)
    setGameOver(false)
    setElapsedTime(0)
  }

  const endGame = () => {
    setGameActive(false)
    setGameOver(true)
    addScore(score, "keycatcher")
  }

  if (gameOver) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center text-5xl">
            🔑
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-5xl font-bold text-pink-400 mb-6">{score}</p>
          <div className="space-y-3">
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
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

  if (!gameActive) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center text-5xl">
            🔑
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Key Catcher</h1>
          <p className="text-white/70 mb-8">Catch cryptographic keys, avoid vulnerabilities!</p>
          <Button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg py-6"
          >
            Start Game
          </Button>
          <Button onClick={onBack} variant="outline" className="w-full mt-3 bg-transparent">
            Back to Games
          </Button>
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
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-2xl font-bold">Score: {score}</div>
          <div className="text-white/70 text-lg">
            Time: {elapsedTime}s {elapsedTime > 30 && <span className="text-red-400 font-bold ml-2">FAST MODE!</span>}
          </div>
          <Button onClick={endGame} variant="ghost" className="text-white hover:bg-white/10">
            End Game
          </Button>
        </div>

        <div
          id="game-area"
          className="relative bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-white/20 overflow-hidden touch-none"
          style={{ height: isMobile ? "500px" : "600px" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute text-4xl transition-all"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.emoji}
            </div>
          ))}

          <div
            className={`absolute bottom-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center transition-all ${
              isMobile ? "w-16 h-16 text-2xl" : "w-20 h-20 text-3xl"
            }`}
            style={{ left: `${playerX}%` }}
          >
            🪣
          </div>
        </div>

        {isMobile ? (
          <div className="flex gap-4 justify-center mt-4">
            <Button
              onTouchStart={moveLeft}
              onClick={moveLeft}
              className="w-20 h-20 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-3xl"
            >
              ←
            </Button>
            <Button
              onTouchStart={moveRight}
              onClick={moveRight}
              className="w-20 h-20 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-xl border-2 border-white/30 rounded-2xl text-3xl"
            >
              →
            </Button>
          </div>
        ) : (
          <p className="text-center text-white/70 mt-4">Use ← → arrow keys to move</p>
        )}
      </div>
    </div>
  )
}
