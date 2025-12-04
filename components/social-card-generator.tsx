"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Upload } from "lucide-react"
import { getUserProfile } from "@/lib/game-storage"
import { getOverallLeaderboard } from "@/lib/global-leaderboard"
import html2canvas from "html2canvas"

function SocialCardGenerator({ onBack }: { onBack: () => void }) {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [rank, setRank] = useState<number | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<"gradient" | "minimal" | "bold">("gradient")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadUserStats = async () => {
      const profile = getUserProfile()
      if (profile) {
        setUsername(profile.username)

        // Get overall leaderboard to find rank
        const leaderboard = await getOverallLeaderboard(100)
        const userEntry = leaderboard.find((entry) => entry.username === profile.username)

        if (userEntry) {
          const userRank = leaderboard.findIndex((entry) => entry.username === profile.username) + 1
          setRank(userRank)
          setTotalScore(userEntry.total_score)
          setGamesPlayed(userEntry.games_played)
        }
      }
    }

    loadUserStats()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = async () => {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      })

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png")
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `arcium-card-${username}.png`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Error generating card:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="group text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to <span className="text-cyan-400 mx-1">{"<encrypted>"}</span> World
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Share Your Privacy Journey
          </h1>
          <p className="text-white/60 text-lg">
            Create a shareable card showcasing your achievements on the Arcium platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Controls */}
          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4">Profile Picture</h3>
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Profile Picture
                </Button>
                {profileImage && (
                  <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-400/50">
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Template Selection */}
            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4">Card Style</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedTemplate("gradient")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate === "gradient"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="text-white text-sm font-medium">Gradient</div>
                </button>
                <button
                  onClick={() => setSelectedTemplate("minimal")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate === "minimal"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="text-white text-sm font-medium">Minimal</div>
                </button>
                <button
                  onClick={() => setSelectedTemplate("bold")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate === "bold"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="text-white text-sm font-medium">Bold</div>
                </button>
              </div>
            </Card>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              disabled={!profileImage}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Card
            </Button>
          </div>

          {/* Right side - Preview */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Gradient Template */}
              {selectedTemplate === "gradient" && (
                <div
                  ref={cardRef}
                  className="aspect-square bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-3xl p-8 relative overflow-hidden"
                >
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>

                  <div className="relative h-full flex flex-col">
                    {/* Profile Section */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white/20">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-4xl">👤</div>
                        )}
                      </div>
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-1">{username || "Your Name"}</h2>
                        <p className="text-white/80 text-sm">Privacy Pioneer</p>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-white">#{rank || "--"}</div>
                          <div className="text-white/70 text-xs">Rank</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{totalScore.toLocaleString()}</div>
                          <div className="text-white/70 text-xs">Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{gamesPlayed}</div>
                          <div className="text-white/70 text-xs">Games</div>
                        </div>
                      </div>
                    </div>

                    {/* Branding */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                      <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" />
                      <span className="text-white font-semibold">Arcium Quiz Contest</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Minimal Template */}
              {selectedTemplate === "minimal" && (
                <div ref={cardRef} className="aspect-square bg-white rounded-3xl p-8 relative overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Profile Section */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                            👤
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-1">{username || "Your Name"}</h2>
                        <p className="text-gray-600 text-sm">Privacy Pioneer</p>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">#{rank || "--"}</div>
                          <div className="text-gray-600 text-xs">Rank</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{totalScore.toLocaleString()}</div>
                          <div className="text-gray-600 text-xs">Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{gamesPlayed}</div>
                          <div className="text-gray-600 text-xs">Games</div>
                        </div>
                      </div>
                    </div>

                    {/* Branding */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                      <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" />
                      <span className="text-gray-900 font-semibold">Arcium Quiz Contest</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bold Template */}
              {selectedTemplate === "bold" && (
                <div ref={cardRef} className="aspect-square bg-gray-900 rounded-3xl p-8 relative overflow-hidden">
                  {/* Electric effect */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
                  </div>

                  <div className="relative h-full flex flex-col">
                    {/* Profile Section */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <div className="w-32 h-32 rounded-full border-4 border-cyan-400 overflow-hidden bg-cyan-400/20">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-cyan-400 text-4xl">
                            👤
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-1">{username || "Your Name"}</h2>
                        <p className="text-cyan-400 text-sm font-semibold">Privacy Pioneer</p>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 border-2 border-cyan-400/50">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">#{rank || "--"}</div>
                          <div className="text-white/70 text-xs">Rank</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">{totalScore.toLocaleString()}</div>
                          <div className="text-white/70 text-xs">Score</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">{gamesPlayed}</div>
                          <div className="text-white/70 text-xs">Games</div>
                        </div>
                      </div>
                    </div>

                    {/* Branding */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                      <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" />
                      <span className="text-white font-semibold">Arcium Quiz Contest</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialCardGenerator
