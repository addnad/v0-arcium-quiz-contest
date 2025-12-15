"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, ArrowLeft } from "lucide-react"
import LogoScatter from "@/components/logo-scatter"
import { createBrowserClient } from "@/lib/supabase/client"
import { checkDailyStreak } from "@/lib/game-storage"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface DailyCheckinProps {
  onBack: () => void
  username?: string
}

export default function DailyCheckin({ onBack, username: propUsername }: DailyCheckinProps) {
  const [checkedDays, setCheckedDays] = useState<boolean[]>(new Array(7).fill(false))
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const [hasCheckedToday, setHasCheckedToday] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const user = propUsername || localStorage.getItem("arcium-username")
    setUsername(user)
    console.log("[v0] Username for check-in:", user)

    const loadCheckinStatus = async () => {
      const today = new Date().getDay()
      const dayIndex = today === 0 ? 6 : today - 1
      setCurrentDayIndex(dayIndex)

      if (!user) {
        console.log("[v0] No username found, skipping database check")
        setLoading(false)
        return
      }

      const supabase = createBrowserClient()

      // Get current week's start (Monday)
      const now = new Date()
      const dayOfWeek = now.getDay()
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
      const monday = new Date(now)
      monday.setDate(now.getDate() + diff)
      monday.setHours(0, 0, 0, 0)

      const { data, error } = await supabase
        .from("checkins")
        .select("check_in_date")
        .eq("username", user)
        .gte("check_in_date", monday.toISOString().split("T")[0])

      console.log("[v0] Checkins query result - data:", data, "error:", error)

      if (!error && data) {
        const newCheckedDays = new Array(7).fill(false)
        data.forEach((checkin) => {
          const checkinDate = new Date(checkin.check_in_date)
          const checkinDay = checkinDate.getDay()
          const checkinDayIndex = checkinDay === 0 ? 6 : checkinDay - 1
          newCheckedDays[checkinDayIndex] = true
        })
        setCheckedDays(newCheckedDays)
        setHasCheckedToday(newCheckedDays[dayIndex])
        console.log("[v0] Loaded check-in status. Today checked:", newCheckedDays[dayIndex])
      }

      setLoading(false)
    }

    loadCheckinStatus()
  }, [propUsername])

  const handleCheckIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (hasCheckedToday || !username) {
      console.log("[v0] Check-in blocked - hasCheckedToday:", hasCheckedToday, "username:", username)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    setAnimationPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })

    const supabase = createBrowserClient()
    const today = new Date().toISOString().split("T")[0]

    console.log("[v0] Attempting check-in insert for username:", username, "date:", today)

    const { data, error } = await supabase.rpc("record_checkin", {
      p_username: username,
      p_check_in_date: today,
    })

    if (error) {
      console.error("Check-in error:", error.message)
      return
    }

    if (data && data.success) {
      const newCheckedDays = [...checkedDays]
      newCheckedDays[currentDayIndex] = true
      setCheckedDays(newCheckedDays)
      setHasCheckedToday(true)

      const streakCount = newCheckedDays.filter((day) => day).length
      checkDailyStreak(streakCount)

      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
      }, 3000)
    } else {
      console.log("Check-in response:", data?.message)
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
        }}
      >
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      {showAnimation && (
        <LogoScatter isVisible={showAnimation} triggerX={animationPosition.x} triggerY={animationPosition.y} />
      )}

      <div className="w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-8 group relative overflow-hidden px-6 py-3 rounded-2xl transition-all hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>
              Back to <span className="text-cyan-300 font-semibold">{"<encrypted>"}</span> World
            </span>
          </div>
        </button>

        <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-800/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-500/30">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Daily Check-in</h1>

          {/* Days grid */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {DAYS.slice(0, 4).map((day, index) => {
              const isToday = index === currentDayIndex
              const isChecked = checkedDays[index]

              return (
                <div key={day} className="flex flex-col items-center gap-3">
                  <p className={`text-base font-semibold ${isChecked ? "text-green-400" : "text-white/80"}`}>
                    {isChecked ? "Claimed" : day}
                  </p>
                  <div
                    className="w-full aspect-square rounded-2xl relative overflow-hidden shadow-lg"
                    style={{
                      backgroundImage: "url('/images/img-7855.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {isChecked && (
                      <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                        <Check className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={3} />
                      </div>
                    )}
                    {isToday && !isChecked && (
                      <div className="absolute inset-0 bg-yellow-400/30 flex items-center justify-center">
                        <span className="text-5xl md:text-6xl">☀️</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
            {DAYS.slice(4).map((day, index) => {
              const actualIndex = index + 4
              const isToday = actualIndex === currentDayIndex
              const isChecked = checkedDays[actualIndex]

              return (
                <div key={day} className="flex flex-col items-center gap-3">
                  <p className={`text-base font-semibold ${isChecked ? "text-green-400" : "text-white/80"}`}>
                    {isChecked ? "Claimed" : day}
                  </p>
                  <div
                    className="w-full aspect-square rounded-2xl relative overflow-hidden shadow-lg"
                    style={{
                      backgroundImage: "url('/images/img-7855.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {isChecked && (
                      <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                        <Check className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={3} />
                      </div>
                    )}
                    {isToday && !isChecked && (
                      <div className="absolute inset-0 bg-yellow-400/30 flex items-center justify-center">
                        <span className="text-5xl md:text-6xl">☀️</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Check-in button */}
          <button
            onClick={handleCheckIn}
            disabled={hasCheckedToday}
            className={`
              w-full py-5 rounded-2xl text-xl font-semibold transition-all
              ${
                hasCheckedToday
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 active:scale-95 shadow-lg"
              }
            `}
          >
            {hasCheckedToday ? "Checked" : "Check In"}
          </button>
        </div>
      </div>
    </div>
  )
}
