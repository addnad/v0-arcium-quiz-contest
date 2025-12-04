"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLeaderboard } from "@/lib/game-storage"

interface LeaderboardProps {
  onBack: () => void
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [selectedGame, setSelectedGame] = useState<string>("all")

  const gameTypes = [
    { id: "all", name: "All Games", icon: "🎮" },
    { id: "quickfire", name: "Quick Fire MPC", icon: "⚡" },
    { id: "fortress", name: "Fortress Vault", icon: "🎯" },
    { id: "datadefender", name: "Data Defender", icon: "🛡️" },
    { id: "privacypath", name: "Privacy Path", icon: "🗺️" },
    { id: "keycatcher", name: "Key Catcher", icon: "🔑" },
    { id: "spelling", name: "Privacy Spelling Bee", icon: "🐝" },
    { id: "threat", name: "Threat Detector", icon: "🔍" },
  ]

  const leaderboard = getLeaderboard(selectedGame === "all" ? undefined : selectedGame)

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-400" />
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />
    if (index === 2) return <Award className="w-6 h-6 text-orange-400" />
    return <span className="text-white/50 font-bold">#{index + 1}</span>
  }

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center text-5xl shadow-2xl">
            🏆
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-white/70 text-lg">Top players across all games</p>
        </div>

        {/* Game Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {gameTypes.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedGame === game.id
                  ? "bg-cyan-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {game.icon} {game.name}
            </button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12 text-white/50">No scores yet. Be the first to play!</div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={`${entry.username}-${entry.timestamp}`}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex justify-center">{getRankIcon(index)}</div>
                    <div>
                      <div className="font-bold text-white text-lg">{entry.username}</div>
                      <div className="text-xs text-white/50">{new Date(entry.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-cyan-300">{entry.score}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
