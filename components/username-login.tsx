"use client"

import type React from "react"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowRight, Loader2, User } from "lucide-react"
import Image from "next/image"

interface UsernameLoginProps {
  onLoginSuccess: (username: string) => void
}

export default function UsernameLogin({ onLoginSuccess }: UsernameLoginProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    if (!usernameRegex.test(username.trim())) {
      setError("Username must be 3-20 characters (letters, numbers, underscore only)")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const supabase = createBrowserClient()

      const currentUsername = localStorage.getItem("arcium-username")
      const isNewUsername = currentUsername !== username.trim()

      // Check if username already exists
      const { data: existingPlayers } = await supabase
        .from("players")
        .select("username")
        .eq("username", username.trim())
        .limit(1)

      if (existingPlayers && existingPlayers.length > 0) {
        // Username exists, log them in
        const { data: player } = await supabase.from("players").select("*").eq("username", username.trim()).single()

        if (player) {
          if (isNewUsername) {
            const keysToRemove: string[] = []
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i)
              if (key && key.startsWith("arcium")) {
                keysToRemove.push(key)
              }
            }
            keysToRemove.forEach((key) => localStorage.removeItem(key))
          }

          // Store in localStorage
          localStorage.setItem("arcium-username", username.trim())
          localStorage.setItem("arcium-player-id", player.id)
          onLoginSuccess(username.trim())
        }
      } else {
        if (isNewUsername) {
          const keysToRemove: string[] = []
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key && key.startsWith("arcium")) {
              keysToRemove.push(key)
            }
          }
          keysToRemove.forEach((key) => localStorage.removeItem(key))
        }

        // Create new player
        const { data: newPlayer, error: insertError } = await supabase
          .from("players")
          .insert([{ username: username.trim() }])
          .select()
          .single()

        if (insertError) {
          setError("Username already taken. Please try another.")
          setIsLoading(false)
          return
        }

        if (newPlayer) {
          // Store in localStorage
          localStorage.setItem("arcium-username", username.trim())
          localStorage.setItem("arcium-player-id", newPlayer.id)
          onLoginSuccess(username.trim())
        }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="flex items-center gap-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-5 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center p-3 shadow-lg">
              <Image
                src="/images/arcium-logo.png"
                alt="Arcium Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-white tracking-tight">ARCIUM</h2>
              <p className="text-sm text-cyan-300 font-medium tracking-wider">Encrypted Supercomputer</p>
            </div>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-white">Welcome!</h1>
            <p className="text-white/70 text-sm">Enter your username to get started</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-cyan-300" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-all"
                  disabled={isLoading}
                  maxLength={20}
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-white/50 text-center">Your username will be visible on the leaderboard</p>
        </form>
      </div>
    </div>
  )
}
