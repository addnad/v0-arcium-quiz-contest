"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Flame, Trophy, Zap } from "lucide-react"

interface StreakDisplayProps {
  username: string
}

interface StreakData {
  current_streak: number
  longest_streak: number
  last_visit_date: string
  streak_recovery_available: boolean
}

export default function StreakDisplay({ username }: StreakDisplayProps) {
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (username) {
      updateStreak()
    }
  }, [username])

  const updateStreak = async () => {
    const supabase = createBrowserClient()
    const today = new Date().toISOString().split("T")[0]

    try {
      // Get existing streak data
      const { data: existingStreak } = await supabase
        .from("player_streaks")
        .select("*")
        .eq("username", username)
        .single()

      if (existingStreak) {
        const lastVisit = new Date(existingStreak.last_visit_date)
        const todayDate = new Date(today)
        const daysDiff = Math.floor((todayDate.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24))

        let newStreak = existingStreak.current_streak
        const recoveryAvailable = existingStreak.streak_recovery_available

        if (daysDiff === 0) {
          // Same day, no change
          setStreakData(existingStreak)
        } else if (daysDiff === 1) {
          // Consecutive day, increase streak
          newStreak += 1
          const { data: updated } = await supabase
            .from("player_streaks")
            .update({
              current_streak: newStreak,
              longest_streak: Math.max(newStreak, existingStreak.longest_streak),
              last_visit_date: today,
              updated_at: new Date().toISOString(),
            })
            .eq("username", username)
            .select()
            .single()

          setStreakData(updated)
        } else if (daysDiff === 2 && recoveryAvailable) {
          // Missed 1 day but recovery available
          await supabase
            .from("player_streaks")
            .update({
              last_visit_date: today,
              streak_recovery_available: false,
              updated_at: new Date().toISOString(),
            })
            .eq("username", username)

          setStreakData({ ...existingStreak, streak_recovery_available: false })
        } else {
          // Streak broken, reset
          newStreak = 1
          const { data: updated } = await supabase
            .from("player_streaks")
            .update({
              current_streak: newStreak,
              last_visit_date: today,
              updated_at: new Date().toISOString(),
            })
            .eq("username", username)
            .select()
            .single()

          setStreakData(updated)
        }
      } else {
        // Create new streak
        const { data: newStreak } = await supabase
          .from("player_streaks")
          .insert({
            username,
            current_streak: 1,
            longest_streak: 1,
            last_visit_date: today,
          })
          .select()
          .single()

        setStreakData(newStreak)
      }
    } catch (error) {
      console.error("[v0] Error updating streak:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !streakData) {
    return null
  }

  const getMilestoneReward = (streak: number) => {
    if (streak >= 100) return { icon: Trophy, color: "text-yellow-400", text: "100 Day Legend!" }
    if (streak >= 30) return { icon: Zap, color: "text-purple-400", text: "30 Day Master!" }
    if (streak >= 7) return { icon: Flame, color: "text-orange-400", text: "7 Day Warrior!" }
    return null
  }

  const milestone = getMilestoneReward(streakData.current_streak)

  return (
    <div className="fixed top-4 right-4 z-50 bg-gradient-to-br from-purple-900/90 to-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <div>
            <div className="text-xs text-gray-400">Current Streak</div>
            <div className="text-2xl font-bold text-white">{streakData.current_streak} days</div>
          </div>
        </div>

        {streakData.longest_streak > streakData.current_streak && (
          <div className="border-l border-purple-500/30 pl-4">
            <div className="text-xs text-gray-400">Best Streak</div>
            <div className="text-lg font-bold text-purple-400">{streakData.longest_streak} days</div>
          </div>
        )}

        {milestone && (
          <div className="border-l border-purple-500/30 pl-4">
            <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
            <div className={`text-xs font-semibold ${milestone.color}`}>{milestone.text}</div>
          </div>
        )}
      </div>

      {!streakData.streak_recovery_available && (
        <div className="mt-2 text-xs text-yellow-500">Streak recovery used</div>
      )}
    </div>
  )
}
