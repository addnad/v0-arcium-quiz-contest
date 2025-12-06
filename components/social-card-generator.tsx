"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Upload, Download, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getUserProfile } from "@/lib/game-storage"
import { getOverallLeaderboard } from "@/lib/global-leaderboard"
import { Input } from "@/components/ui/input"

interface SocialCardGeneratorProps {
  onBack: () => void
}

export default function SocialCardGenerator({ onBack }: SocialCardGeneratorProps) {
  const [profileImage, setProfileImage] = useState<string>("")
  const [cardName, setCardName] = useState("")
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
        setCardName(profile.username)

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
    if (!profileImage) {
      alert("Please upload a profile picture first")
      return
    }

    try {
      // Create a canvas
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas size (800x800 for good quality)
      const size = 800
      canvas.width = size
      canvas.height = size

      // Load profile image
      const profileImg = new Image()
      profileImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        profileImg.onload = resolve
        profileImg.onerror = reject
        profileImg.src = profileImage
      })

      // Draw card based on template
      if (selectedTemplate === "gradient") {
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size)
        gradient.addColorStop(0, "#6c44fc")
        gradient.addColorStop(0.5, "#4a2e8f")
        gradient.addColorStop(1, "#2a1a5f")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)

        // Profile image (circular)
        const profileSize = 180
        const profileX = size / 2
        const profileY = 200

        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // Border around profile
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username - using cardName instead of username
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(cardName || "Your Name", size / 2, 420)

        // Subtitle
        ctx.font = "16px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Privacy Pioneer", size / 2, 450)

        // Stats box background
        const boxY = 500
        const boxHeight = 120
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
        ctx.fillRect(64, boxY, size - 128, boxHeight)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1
        ctx.strokeRect(64, boxY, size - 128, boxHeight)

        // Stats
        const statY = boxY + 50
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#ffffff"

        // Rank
        ctx.fillText(`#${rank || "--"}`, 200, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Rank", 200, statY + 25)

        // Score
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Score", size / 2, statY + 25)

        // Games
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(gamesPlayed.toString(), 600, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Games", 600, statY + 25)

        // Branding - Changed from "Arcium Quiz Contest" to "My Arcium Social Card"
        const logoImg = new Image()
        logoImg.crossOrigin = "anonymous"
        await new Promise((resolve) => {
          logoImg.onload = resolve
          logoImg.src = "/images/arcium-logo.png"
        })

        ctx.drawImage(logoImg, size / 2 - 80, boxY + 160, 32, 32)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 20px sans-serif"
        ctx.fillText("My Arcium Social Card", size / 2 + 20, boxY + 185)
      } else if (selectedTemplate === "minimal") {
        // White background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, size, size)

        // Profile image
        const profileSize = 160
        const profileX = size / 2
        const profileY = 180

        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // Border
        ctx.strokeStyle = "#6c44fc"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username - using cardName
        ctx.fillStyle = "#000000"
        ctx.font = "bold 44px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(cardName || "Your Name", size / 2, 380)

        // Subtitle
        ctx.font = "18px sans-serif"
        ctx.fillStyle = "#666666"
        ctx.fillText("Privacy Pioneer", size / 2, 420)

        // Stats
        const statsY = 500
        ctx.font = "bold 36px sans-serif"
        ctx.fillStyle = "#6c44fc"

        // Rank
        ctx.fillText(`#${rank || "--"}`, size / 2 - 220, statsY)
        ctx.font = "14px sans-serif"
        ctx.fillStyle = "#666666"
        ctx.fillText("RANK", size / 2 - 220, statsY + 30)

        // Score
        ctx.font = "bold 36px sans-serif"
        ctx.fillStyle = "#6c44fc"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statsY)
        ctx.font = "14px sans-serif"
        ctx.fillStyle = "#666666"
        ctx.fillText("SCORE", size / 2, statsY + 30)

        // Games
        ctx.font = "bold 36px sans-serif"
        ctx.fillStyle = "#6c44fc"
        ctx.fillText(gamesPlayed.toString(), size / 2 + 220, statsY)
        ctx.font = "14px sans-serif"
        ctx.fillStyle = "#666666"
        ctx.fillText("GAMES", size / 2 + 220, statsY + 30)

        // Branding - Updated text
        const logoImg = new Image()
        logoImg.crossOrigin = "anonymous"
        await new Promise((resolve) => {
          logoImg.onload = resolve
          logoImg.src = "/images/arcium-logo.png"
        })

        ctx.drawImage(logoImg, size / 2 - 100, 680, 32, 32)
        ctx.fillStyle = "#000000"
        ctx.font = "bold 20px sans-serif"
        ctx.fillText("My Arcium Social Card", size / 2 + 30, 700)
      } else if (selectedTemplate === "bold") {
        // Bold colorful background
        const gradient = ctx.createLinearGradient(0, 0, size, size)
        gradient.addColorStop(0, "#ff006e")
        gradient.addColorStop(0.5, "#8338ec")
        gradient.addColorStop(1, "#3a86ff")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)

        // Add pattern overlay
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
        for (let i = 0; i < size; i += 40) {
          ctx.fillRect(i, 0, 2, size)
        }

        // Profile image
        const profileSize = 200
        const profileX = size / 2
        const profileY = 220

        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // Thick border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username - using cardName
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 52px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(cardName || "Your Name", size / 2, 460)

        // Stats in bold boxes
        const boxY = 530
        const boxWidth = 200
        const boxHeight = 100
        const gap = 20

        // Rank box
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fillRect(size / 2 - boxWidth - gap, boxY, boxWidth, boxHeight)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 40px sans-serif"
        ctx.fillText(`#${rank || "--"}`, size / 2 - boxWidth / 2 - gap, boxY + 55)
        ctx.font = "16px sans-serif"
        ctx.fillText("RANK", size / 2 - boxWidth / 2 - gap, boxY + 85)

        // Score box
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fillRect(size / 2 + gap, boxY, boxWidth, boxHeight)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 32px sans-serif"
        ctx.fillText(totalScore.toLocaleString(), size / 2 + boxWidth / 2 + gap, boxY + 50)
        ctx.font = "16px sans-serif"
        ctx.fillText("SCORE", size / 2 + boxWidth / 2 + gap, boxY + 80)

        // Branding - Updated text
        const logoImg = new Image()
        logoImg.crossOrigin = "anonymous"
        await new Promise((resolve) => {
          logoImg.onload = resolve
          logoImg.src = "/images/arcium-logo.png"
        })

        ctx.drawImage(logoImg, size / 2 - 100, 700, 32, 32)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 20px sans-serif"
        ctx.fillText("My Arcium Social Card", size / 2 + 30, 720)
      }

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Failed to create image. Please try again.")
          return
        }

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = `arcium-${cardName || username}-${selectedTemplate}-card.png`
        link.href = url
        link.click()

        setTimeout(() => URL.revokeObjectURL(url), 100)
      }, "image/png")
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download card. Please try again.")
    }
  }

  const handleShareToTwitter = async () => {
    if (!profileImage) {
      alert("Please upload a profile picture first")
      return
    }

    const tweetText = `Check out my Arcium social card! 🔐✨\n\n🏆 Rank: #${rank || "--"}\n📊 Score: ${totalScore.toLocaleString()}\n🎮 Games Played: ${gamesPlayed}\n\nJoin the privacy revolution at https://stayencrypted.vercel.app/`

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, "_blank")
  }

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="group relative overflow-hidden px-6 py-3 rounded-2xl transition-all hover:scale-105 mb-8"
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
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                {profileImage && (
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20">
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4">Display Name</h3>
              <Input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Your name on the card"
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
                maxLength={30}
              />
              <p className="text-white/50 text-xs mt-2">This name will appear on your social card</p>
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
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="h-16 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 mb-2"></div>
                  <p className="text-white text-sm font-medium">Gradient</p>
                </button>
                <button
                  onClick={() => setSelectedTemplate("minimal")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate === "minimal"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="h-16 rounded-lg bg-white mb-2"></div>
                  <p className="text-white text-sm font-medium">Minimal</p>
                </button>
                <button
                  onClick={() => setSelectedTemplate("bold")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate === "bold"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="h-16 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 mb-2"></div>
                  <p className="text-white text-sm font-medium">Bold</p>
                </button>
              </div>
            </Card>
          </div>

          {/* Right side - Preview */}
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
              <div ref={cardRef} className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {selectedTemplate === "gradient" && (
                  <div
                    className="w-full h-full relative"
                    style={{
                      background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
                    }}
                  >
                    <div className="relative h-full flex flex-col">
                      {/* Profile Section */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white/20">
                          {profileImage ? (
                            <img
                              src={profileImage || "/placeholder.svg"}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-4xl">👤</div>
                          )}
                        </div>
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-white mb-1">{cardName || "Your Name"}</h2>
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

                      {/* Branding - Updated text */}
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" crossOrigin="anonymous" />
                        <span className="text-white font-semibold">My Arcium Social Card</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTemplate === "minimal" && (
                  <div className="w-full h-full bg-white p-8">
                    <div className="relative h-full flex flex-col items-center">
                      {/* Profile */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <div className="w-28 h-28 rounded-full border-4 border-purple-500 overflow-hidden bg-gray-100">
                          {profileImage ? (
                            <img
                              src={profileImage || "/placeholder.svg"}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                              👤
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardName || "Your Name"}</h2>
                          <p className="text-gray-600 text-sm">Privacy Pioneer</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="w-full grid grid-cols-3 gap-4 text-center mb-6">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">#{rank || "--"}</div>
                          <div className="text-gray-500 text-xs">RANK</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-600">{totalScore.toLocaleString()}</div>
                          <div className="text-gray-500 text-xs">SCORE</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{gamesPlayed}</div>
                          <div className="text-gray-500 text-xs">GAMES</div>
                        </div>
                      </div>

                      {/* Branding - Updated text */}
                      <div className="flex items-center justify-center gap-2">
                        <img src="/images/arcium-logo.png" alt="Arcium" className="w-5 h-5" crossOrigin="anonymous" />
                        <span className="text-gray-900 font-semibold text-sm">My Arcium Social Card</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTemplate === "bold" && (
                  <div
                    className="w-full h-full relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)",
                    }}
                  >
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-white"
                          style={{ left: `${i * 5}%`, width: "2px", height: "100%" }}
                        />
                      ))}
                    </div>

                    <div className="relative h-full flex flex-col p-8">
                      {/* Profile */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-white/20">
                          {profileImage ? (
                            <img
                              src={profileImage || "/placeholder.svg"}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-4xl">👤</div>
                          )}
                        </div>
                        <h2 className="text-3xl font-bold text-white text-center">{cardName || "Your Name"}</h2>
                      </div>

                      {/* Stats boxes */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="text-3xl font-bold text-white">#{rank || "--"}</div>
                          <div className="text-white/90 text-xs font-semibold">RANK</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-white">{totalScore.toLocaleString()}</div>
                          <div className="text-white/90 text-xs font-semibold">SCORE</div>
                        </div>
                      </div>

                      {/* Branding - Updated text */}
                      <div className="flex items-center justify-center gap-2">
                        <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" crossOrigin="anonymous" />
                        <span className="text-white font-bold">My Arcium Social Card</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleDownload}
                disabled={!profileImage}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Card
              </Button>
              <Button
                onClick={handleShareToTwitter}
                disabled={!profileImage}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share on X
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
