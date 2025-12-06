"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, ArrowLeft, Calendar, Trophy } from "lucide-react"
import Image from "next/image"
import LogoScatter from "@/components/logo-scatter"
import { createBrowserClient } from "@/lib/supabase/client"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface DailyCheckinProps {
  onBack: () => void
}

export default function DailyCheckin({ onBack }: DailyCheckinProps) {
  const [checkedDays, setCheckedDays] = useState<boolean[]>(new Array(7).fill(false))
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 })
  const [flippingDay, setFlippingDay] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCheckins = async () => {
      const playerId = localStorage.getItem("arcium-player-id")
      const username = localStorage.getItem("arcium-username")

      if (!playerId || !username) {
        setIsLoading(false)
        return
      }

      const today = new Date().getDay()
      const dayIndex = today === 0 ? 6 : today - 1
      setCurrentDayIndex(dayIndex)

      try {
        const supabase = createBrowserClient()

        const now = new Date()
        const dayOfWeek = now.getDay()
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
        const monday = new Date(now)
        monday.setDate(now.getDate() + diff)
        monday.setHours(0, 0, 0, 0)

        const { data: weekCheckins } = await supabase
          .from("checkins")
          .select("check_in_date")
          .eq("player_id", playerId)
          .gte("check_in_date", monday.toISOString().split("T")[0])
          .order("check_in_date", { ascending: true })

        if (weekCheckins) {
          const newCheckedDays = new Array(7).fill(false)
          weekCheckins.forEach((checkin) => {
            const checkinDate = new Date(checkin.check_in_date)
            const checkinDay = checkinDate.getDay()
            const checkinDayIndex = checkinDay === 0 ? 6 : checkinDay - 1
            newCheckedDays[checkinDayIndex] = true
          })
          setCheckedDays(newCheckedDays)
        }
      } catch (error) {
        console.error("Error loading check-ins:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCheckins()
  }, [])

  const handleCheckIn = async (dayIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (dayIndex !== currentDayIndex || checkedDays[dayIndex]) return

    const playerId = localStorage.getItem("arcium-player-id")
    const username = localStorage.getItem("arcium-username")

    if (!playerId || !username) {
      alert("Please log in to check in")
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    setAnimationPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })

    setFlippingDay(dayIndex)

    try {
      const supabase = createBrowserClient()
      const today = new Date().toISOString().split("T")[0]

      const { error } = await supabase.from("checkins").insert([
        {
          player_id: playerId,
          username: username,
          check_in_date: today,
        },
      ])

      if (error) {
        console.error("Check-in error:", error)
        alert("Failed to check in. Please try again.")
        setFlippingDay(null)
        return
      }

      const newCheckedDays = [...checkedDays]
      newCheckedDays[dayIndex] = true
      setCheckedDays(newCheckedDays)

      setShowAnimation(true)
      setTimeout(() => {
        setShowAnimation(false)
        setFlippingDay(null)
      }, 3000)
    } catch (error) {
      console.error("Check-in error:", error)
      alert("Failed to check in. Please try again.")
      setFlippingDay(null)
    }
  }

  const completedCount = checkedDays.filter(Boolean).length
  const progressPercentage = (completedCount / DAYS.length) * 100

  if (isLoading) {
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
      className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      {showAnimation && (
        <LogoScatter isVisible={showAnimation} triggerX={animationPosition.x} triggerY={animationPosition.y} />
      )}

      <div className="w-full max-w-5xl">
        <button
          onClick={onBack}
          className="mb-6 md:mb-8 group relative overflow-hidden px-6 py-3 rounded-2xl transition-all hover:scale-105"
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

        <div className="flex flex-col items-center gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <Image
                src="/images/arcium-logo.png"
                alt="Arcium Logo"
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">GMPC Daily</h1>
              <p className="text-sm md:text-base text-cyan-300 font-medium tracking-wider">Good MPC Practice</p>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto text-center leading-relaxed px-4">
            Build consistency in your confidential computing learning journey
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <p className="text-xs md:text-sm text-white/60 font-medium">This Week</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {completedCount} <span className="text-lg md:text-xl text-white/60">/ {DAYS.length}</span>
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-cyan-400" />
              <p className="text-xs md:text-sm text-white/60 font-medium">Progress</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{Math.round(progressPercentage)}%</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {DAYS.map((day, index) => {
              const isToday = index === currentDayIndex
              const isChecked = checkedDays[index]
              const isClickable = isToday && !isChecked
              const isFlipping = flippingDay === index

              return (
                <button
                  key={day}
                  onClick={(e) => handleCheckIn(index, e)}
                  disabled={!isClickable}
                  className={`
                    relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl transition-all
                    ${isChecked ? "bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-400" : ""}
                    ${isToday && !isChecked ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400 hover:scale-105 cursor-pointer" : ""}
                    ${!isToday && !isChecked ? "bg-white/5 border border-white/10 opacity-40 cursor-not-allowed" : ""}
                    ${isFlipping ? "animate-flip-card" : ""}
                  `}
                  style={{
                    transform: isFlipping ? "rotateY(360deg)" : "rotateY(0deg)",
                    transition: "transform 0.8s ease-in-out, all 0.3s",
                    minHeight: "140px",
                  }}
                >
                  <div
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 transition-all
                      ${isChecked ? "bg-green-500 scale-110" : isToday ? "bg-cyan-400" : "bg-white/10"}
                    `}
                  >
                    {isChecked ? (
                      <Check className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={3} />
                    ) : (
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    )}
                  </div>

                  <h3 className="text-base md:text-lg font-semibold text-white mb-1">{day}</h3>

                  {isToday && !isChecked && <p className="text-xs text-cyan-300 font-medium">Click to check-in</p>}
                  {isChecked && <p className="text-xs text-green-300 font-medium">Completed ✓</p>}
                  {!isToday && !isChecked && <p className="text-xs text-white/40">Locked</p>}

                  {isToday && !isChecked && (
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 animate-pulse pointer-events-none"></div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/70">Weekly Progress</span>
              <span className="text-sm text-cyan-300 font-bold">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all duration-700 ease-out rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
