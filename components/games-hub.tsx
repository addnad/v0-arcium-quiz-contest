"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuickFireMPC from "./games/quick-fire-mpc"
import FortressVault from "./games/fortress-vault"
import DataDefender from "./games/data-defender"
import PrivacyPath from "./games/privacy-path"
import KeyCatcher from "./games/key-catcher"
import PrivacySpellingBee from "./games/privacy-spelling-bee"
import ThreatDetector from "./games/threat-detector"
import UsernamePrompt from "./username-prompt"
import Leaderboard from "./leaderboard"
import Achievements from "./achievements"
import { getUserProfile, setUserProfile, initializeAchievements } from "@/lib/game-storage"

type GameView =
  | "menu"
  | "quickfire"
  | "fortress"
  | "datadefender"
  | "privacypath"
  | "keycatcher"
  | "spelling"
  | "threat"
  | "leaderboard"
  | "achievements"

interface GamesHubProps {
  onBack: () => void
}

export default function GamesHub({ onBack }: GamesHubProps) {
  const [currentGame, setCurrentGame] = useState<GameView>("menu")
  const [userProfile, setUserProfileState] = useState(getUserProfile())

  useEffect(() => {
    initializeAchievements()
  }, [])

  const handleUsernameSubmit = (username: string) => {
    const success = setUserProfile(username)
    if (success) {
      setUserProfileState(getUserProfile())
    } else {
      alert("Username already taken. Please choose another.")
    }
  }

  if (!userProfile) {
    return <UsernamePrompt onSubmit={handleUsernameSubmit} />
  }

  const handleBackToMenu = () => setCurrentGame("menu")

  if (currentGame === "quickfire") {
    return <QuickFireMPC onBack={handleBackToMenu} />
  }

  if (currentGame === "fortress") {
    return <FortressVault onBack={handleBackToMenu} />
  }

  if (currentGame === "datadefender") {
    return <DataDefender onBack={handleBackToMenu} />
  }

  if (currentGame === "privacypath") {
    return <PrivacyPath onBack={handleBackToMenu} />
  }

  if (currentGame === "keycatcher") {
    return <KeyCatcher onBack={handleBackToMenu} />
  }

  if (currentGame === "spelling") {
    return <PrivacySpellingBee onBack={handleBackToMenu} />
  }

  if (currentGame === "threat") {
    return <ThreatDetector onBack={handleBackToMenu} />
  }

  if (currentGame === "leaderboard") {
    return <Leaderboard onBack={handleBackToMenu} />
  }

  if (currentGame === "achievements") {
    return <Achievements onBack={handleBackToMenu} />
  }

  return (
    <div
      className="min-h-screen px-4 py-8 relative"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="group relative overflow-hidden px-6 py-3 rounded-2xl transition-all hover:scale-105"
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
          <div className="text-white/80 text-sm">
            Welcome, <span className="font-bold text-cyan-300">{userProfile.username}</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl flex items-center justify-center text-4xl shadow-2xl">
              🎮
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Privacy Games</h1>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Master encryption concepts through interactive challenges and mini-games
          </p>
        </div>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button
            onClick={() => setCurrentGame("leaderboard")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-cyan-400/50 transition-all"
          >
            🏆 Leaderboard
          </Button>
          <Button
            onClick={() => setCurrentGame("achievements")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-purple-400/50 transition-all"
          >
            🌟 Achievements
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Quick Fire MPC */}
          <button
            onClick={() => setCurrentGame("quickfire")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-purple-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-purple-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                ⚡
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Quick Fire MPC</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Fast-paced trivia about confidential computing with 10-second timers
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-purple-400/20 text-purple-300 rounded-full">Trivia</span>
              </div>
            </div>
          </button>

          {/* Fortress Vault */}
          <button
            onClick={() => setCurrentGame("fortress")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-orange-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-orange-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Fortress Vault</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Match pairs of encrypted Arcium concepts in this memory challenge
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-orange-400/20 text-orange-300 rounded-full">Memory</span>
              </div>
            </div>
          </button>

          {/* Data Defender */}
          <button
            onClick={() => setCurrentGame("datadefender")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-green-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-green-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🛡️
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Data Defender</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Choose the right privacy protocols to protect sensitive data from threats
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-green-400/20 text-green-300 rounded-full">Strategy</span>
              </div>
            </div>
          </button>

          {/* Privacy Path */}
          <button
            onClick={() => setCurrentGame("privacypath")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-blue-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-blue-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🗺️
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy Path</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Guide encrypted data through Arcium's network components in correct order
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-blue-400/20 text-blue-300 rounded-full">Pathfinding</span>
              </div>
            </div>
          </button>

          {/* Key Catcher */}
          <button
            onClick={() => setCurrentGame("keycatcher")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-pink-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-pink-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🔑
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Key Catcher</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Catch falling cryptographic keys while avoiding bombs. Speed increases after 30 seconds!
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-pink-400/20 text-pink-300 rounded-full">Arcade</span>
              </div>
            </div>
          </button>

          {/* Privacy Spelling Bee */}
          <button
            onClick={() => setCurrentGame("spelling")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-teal-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-teal-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🐝
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy Spelling Bee</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Spell complex cryptography and privacy terms correctly with definitions as clues
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-teal-400/20 text-teal-300 rounded-full">Educational</span>
              </div>
            </div>
          </button>

          {/* Threat Detector */}
          <button
            onClick={() => setCurrentGame("threat")}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-red-400/60 rounded-3xl p-6 shadow-2xl hover:shadow-red-400/20 transition-all hover:scale-105 hover:-translate-y-2 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🔍
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Threat Detector</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Spot security vulnerabilities by comparing secure and insecure code implementations
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 text-xs bg-red-400/20 text-red-300 rounded-full">Visual</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
