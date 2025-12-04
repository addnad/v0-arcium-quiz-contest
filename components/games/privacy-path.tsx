"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addScore, unlockAchievement } from "@/lib/game-storage"

interface PrivacyPathProps {
  onBack: () => void
}

type Cell = "empty" | "path" | "node" | "obstacle" | "end"

export default function PrivacyPath({ onBack }: PrivacyPathProps) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [grid, setGrid] = useState<Cell[][]>([])
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    initializeLevel(level)
  }, [level])

  const initializeLevel = (lvl: number) => {
    const size = 5
    const newGrid: Cell[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill("empty"))

    // Set path
    newGrid[0][0] = "path"
    newGrid[size - 1][size - 1] = "end"

    // Add some nodes and obstacles
    for (let i = 0; i < lvl + 2; i++) {
      const x = Math.floor(Math.random() * size)
      const y = Math.floor(Math.random() * size)
      if ((x !== 0 || y !== 0) && (x !== size - 1 || y !== size - 1)) {
        newGrid[y][x] = Math.random() > 0.5 ? "node" : "obstacle"
      }
    }

    setGrid(newGrid)
    setPlayerPos({ x: 0, y: 0 })
    setMoves(0)
  }

  const handleMove = (dx: number, dy: number) => {
    const newX = playerPos.x + dx
    const newY = playerPos.y + dy

    if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) return

    const cell = grid[newY][newX]
    if (cell === "obstacle") return

    setPlayerPos({ x: newX, y: newY })
    setMoves(moves + 1)

    if (cell === "node") {
      setScore(score + 50)
    }

    if (cell === "end") {
      const levelScore = 300 - moves * 10
      setScore(score + Math.max(levelScore, 100))

      if (level < 3) {
        setTimeout(() => setLevel(level + 1), 1000)
      } else {
        setGameOver(true)
        addScore(score + Math.max(levelScore, 100), "privacypath")
        unlockAchievement("first_game")
      }
    }
  }

  const handleRestart = () => {
    setLevel(1)
    setScore(0)
    setMoves(0)
    setGameOver(false)
    initializeLevel(1)
  }

  if (gameOver) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-6xl">
            🗺️
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Path Complete!</h2>
          <div className="text-6xl font-bold text-blue-300 mb-6">{score}</div>
          <p className="text-white/70 mb-8">You secured the data path!</p>
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

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-white font-bold">
            Level {level} | Score: {score}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Privacy Path</h2>
          <p className="text-white/70 text-center mb-6">
            Guide the data to the endpoint. Collect nodes, avoid obstacles.
          </p>

          <div className="grid gap-2 mb-6" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 5}, 1fr)` }}>
            {grid.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                    playerPos.x === x && playerPos.y === y
                      ? "bg-cyan-500 scale-110"
                      : cell === "end"
                        ? "bg-green-500"
                        : cell === "node"
                          ? "bg-purple-500/50"
                          : cell === "obstacle"
                            ? "bg-red-500/50"
                            : "bg-white/10"
                  }`}
                >
                  {playerPos.x === x && playerPos.y === y ? (
                    "📦"
                  ) : cell === "end" ? (
                    <Flag className="w-6 h-6" />
                  ) : cell === "node" ? (
                    "🔷"
                  ) : cell === "obstacle" ? (
                    "❌"
                  ) : (
                    ""
                  )}
                </div>
              )),
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            <div></div>
            <Button onClick={() => handleMove(0, -1)} className="bg-white/20 hover:bg-white/30 text-white">
              ↑
            </Button>
            <div></div>
            <Button onClick={() => handleMove(-1, 0)} className="bg-white/20 hover:bg-white/30 text-white">
              ←
            </Button>
            <div></div>
            <Button onClick={() => handleMove(1, 0)} className="bg-white/20 hover:bg-white/30 text-white">
              →
            </Button>
            <div></div>
            <Button onClick={() => handleMove(0, 1)} className="bg-white/20 hover:bg-white/30 text-white">
              ↓
            </Button>
            <div></div>
          </div>

          <div className="mt-6 text-center text-white/70 text-sm">Moves: {moves}</div>
        </div>
      </div>
    </div>
  )
}
