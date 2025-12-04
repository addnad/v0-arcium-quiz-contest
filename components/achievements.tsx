"use client"

import { ArrowLeft, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAchievements } from "@/lib/game-storage"

interface AchievementsProps {
  onBack: () => void
}

export default function Achievements({ onBack }: AchievementsProps) {
  const achievements = getAchievements()
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length
  const progress = Math.round((unlockedCount / achievements.length) * 100)

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
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-5xl shadow-2xl">
            🌟
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Achievements</h1>
          <p className="text-white/70 text-lg mb-6">
            {unlockedCount} of {achievements.length} unlocked
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto bg-white/10 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/50 text-sm mt-2">{progress}% Complete</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                achievement.unlockedAt
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                    achievement.unlockedAt ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-white/10"
                  }`}
                >
                  {achievement.unlockedAt ? achievement.icon : <Lock className="w-6 h-6 text-white/30" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold text-lg ${achievement.unlockedAt ? "text-white" : "text-white/50"}`}>
                      {achievement.name}
                    </h3>
                    {achievement.unlockedAt && <CheckCircle className="w-5 h-5 text-green-400" />}
                  </div>
                  <p className={`text-sm ${achievement.unlockedAt ? "text-white/70" : "text-white/40"}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlockedAt && (
                    <div className="text-xs text-white/50 mt-2">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
