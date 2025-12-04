"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Loader2 } from "lucide-react"
import { checkUsernameExists } from "@/lib/global-leaderboard"

interface UsernamePromptProps {
  onSubmit: (username: string) => void
}

export default function UsernamePrompt({ onSubmit }: UsernamePromptProps) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isChecking, setIsChecking] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = username.trim()

    if (trimmed.length < 3) {
      setError("Username must be at least 3 characters")
      return
    }

    if (trimmed.length > 20) {
      setError("Username must be less than 20 characters")
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("Username can only contain letters, numbers, and underscores")
      return
    }

    setIsChecking(true)
    const exists = await checkUsernameExists(trimmed)
    setIsChecking(false)

    if (exists) {
      setError("Username already taken. Please choose another one.")
      return
    }

    onSubmit(trimmed)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
    >
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            👤
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Welcome to Arcium Games!</h2>
          <p className="text-white/70 text-sm">Choose a unique username to compete globally</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              placeholder="Enter your username"
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg px-4 py-6 rounded-xl focus:border-cyan-400 transition-colors"
              maxLength={20}
              disabled={isChecking}
            />
            {error && (
              <div className="flex items-center gap-2 mt-3 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isChecking}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isChecking ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              "Start Playing"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-white/50">Compete globally with players worldwide</div>
      </div>
    </div>
  )
}
