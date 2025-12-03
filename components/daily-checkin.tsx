"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, ArrowLeft } from "lucide-react"
import Image from "next/image"
import LogoScatter from "@/components/logo-scatter"

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

  useEffect(() => {
    localStorage.removeItem("gmpc-checkins")
    localStorage.removeItem("gmpc-last-check-date")

    const today = new Date().getDay()
    const dayIndex = today === 0 ? 6 : today - 1
    setCurrentDayIndex(dayIndex)

    setCheckedDays(new Array(7).fill(false))
  }, [])

  const handleCheckIn = (dayIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (dayIndex !== currentDayIndex || checkedDays[dayIndex]) return

    const rect = event.currentTarget.getBoundingClientRect()
    setAnimationPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })

    setFlippingDay(dayIndex)

    const newCheckedDays = [...checkedDays]
    newCheckedDays[dayIndex] = true
    setCheckedDays(newCheckedDays)

    localStorage.setItem("gmpc-checkins", JSON.stringify(newCheckedDays))
    localStorage.setItem("gmpc-last-check-date", new Date().toDateString())

    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
      setFlippingDay(null)
    }, 3000)
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

      <div className="w-full max-w-4xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Features
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-10 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-10 py-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center p-2">
                  <Image
                    src="/images/arcium-logo.png"
                    alt="Arcium Logo"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-white">GMPC Daily</h2>
                  <p className="text-sm text-cyan-300 font-medium tracking-wider">Good MPC Practice</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1
              className="text-3xl md:text-4xl font-bold text-white"
              style={{
                letterSpacing: "-0.003rem",
                textShadow: "0 0 20px rgba(93, 226, 218, 0.2)",
              }}
            >
              Daily Check-in Tracker
            </h1>
            <p className="text-base text-white/70 max-w-xl mx-auto leading-relaxed">
              Build consistency in your confidential computing learning journey. Check in daily to track your progress!
            </p>
          </div>
        </div>

        {/* Weekly Checklist */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="grid gap-4">
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
                    relative group flex items-center justify-between p-6 rounded-2xl transition-all
                    ${isToday ? "bg-cyan-400/20 border-2 border-cyan-400" : "bg-white/5 border border-white/10"}
                    ${isClickable ? "hover:bg-cyan-400/30 cursor-pointer hover:scale-105" : ""}
                    ${isChecked ? "bg-green-500/20 border-green-400" : ""}
                    ${!isToday && !isChecked ? "opacity-50 cursor-not-allowed" : ""}
                    ${isFlipping ? "animate-flip-card" : ""}
                  `}
                  style={{
                    transform: isFlipping ? "rotateY(360deg)" : "rotateY(0deg)",
                    transition: "transform 0.8s ease-in-out",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${isChecked ? "bg-green-500" : isToday ? "bg-cyan-400" : "bg-white/10"}
                    `}
                    >
                      {isChecked ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-white">{day}</h3>
                      {isToday && !isChecked && <p className="text-sm text-cyan-300">Click to check-in today</p>}
                      {isChecked && <p className="text-sm text-green-300">Checked in</p>}
                      {!isToday && !isChecked && <p className="text-sm text-white/50">Not available yet</p>}
                    </div>
                  </div>

                  {isToday && !isChecked && (
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 animate-pulse pointer-events-none"></div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Week Progress */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80">This Week's Progress</span>
              <span className="text-cyan-300 font-bold">
                {checkedDays.filter(Boolean).length} / {DAYS.length}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500 rounded-full"
                style={{ width: `${(checkedDays.filter(Boolean).length / DAYS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
