"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Upload, Twitter } from "lucide-react"
import { getOverallLeaderboard } from "@/lib/global-leaderboard"

function SocialCardGenerator({ username, onBack }: { username: string; onBack: () => void }) {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [rank, setRank] = useState<number | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<"gradient" | "minimal" | "bold">("gradient")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadUserStats = async () => {
      if (username) {
        // Get overall leaderboard to find rank
        const leaderboard = await getOverallLeaderboard(100)
        const userEntry = leaderboard.find((entry) => entry.username === username)

        if (userEntry) {
          const userRank = leaderboard.findIndex((entry) => entry.username === username) + 1
          setRank(userRank)
          setTotalScore(userEntry.total_score)
          setGamesPlayed(userEntry.games_played)
        }
      }
    }

    loadUserStats()
  }, [username])

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
      alert("Please upload a profile picture first!")
      return
    }

    try {
      const size = 800
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        alert("Failed to create canvas. Please try again.")
        return
      }

      const profileImg = new Image()
      profileImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        profileImg.onload = resolve
        profileImg.onerror = reject
        profileImg.src = profileImage
      })

      const logoImg = new Image()
      logoImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        logoImg.onload = resolve
        logoImg.onerror = reject
        logoImg.src = "/images/arcium-logo.png"
      })

      if (selectedTemplate === "geometric") {
        // Dark background with geometric grid
        ctx.fillStyle = "#0f172a"
        ctx.fillRect(0, 0, size, size)

        // Draw geometric grid pattern
        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)"
        ctx.lineWidth = 1
        const gridSize = 50
        for (let x = 0; x <= size; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, size)
          ctx.stroke()
        }
        for (let y = 0; y <= size; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(size, y)
          ctx.stroke()
        }

        // Animated diagonal lines
        ctx.strokeStyle = "rgba(168, 85, 247, 0.2)"
        ctx.lineWidth = 2
        for (let i = -size; i < size * 2; i += 80) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i + size, size)
          ctx.stroke()
        }

        // Gradient overlay from bottom
        const bottomGradient = ctx.createLinearGradient(0, size * 0.6, 0, size)
        bottomGradient.addColorStop(0, "transparent")
        bottomGradient.addColorStop(1, "rgba(168, 85, 247, 0.3)")
        ctx.fillStyle = bottomGradient
        ctx.fillRect(0, 0, size, size)

        // Top accent gradient
        const topGradient = ctx.createLinearGradient(0, 0, 0, size * 0.3)
        topGradient.addColorStop(0, "rgba(6, 182, 212, 0.2)")
        topGradient.addColorStop(1, "transparent")
        ctx.fillStyle = topGradient
        ctx.fillRect(0, 0, size, size)

        // Glowing circles in background
        const circles = [
          { x: 100, y: 150, r: 120, color: "rgba(6, 182, 212, 0.1)" },
          { x: 700, y: 200, r: 100, color: "rgba(168, 85, 247, 0.1)" },
          { x: 600, y: 650, r: 150, color: "rgba(6, 182, 212, 0.08)" },
        ]
        circles.forEach((circle) => {
          const circleGradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.r)
          circleGradient.addColorStop(0, circle.color)
          circleGradient.addColorStop(1, "transparent")
          ctx.fillStyle = circleGradient
          ctx.beginPath()
          ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2)
          ctx.fill()
        })

        // Profile image with glow effect
        const profileSize = 140
        const profileX = size / 2
        const profileY = 240

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          profileX,
          profileY,
          profileSize / 2,
          profileX,
          profileY,
          profileSize / 2 + 20,
        )
        glowGradient.addColorStop(0, "rgba(6, 182, 212, 0.5)")
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2 + 20, 0, Math.PI * 2)
        ctx.fill()

        // Profile image (circular)
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // Cyan-purple gradient border
        const borderGradient = ctx.createLinearGradient(
          profileX - profileSize / 2,
          profileY,
          profileX + profileSize / 2,
          profileY,
        )
        borderGradient.addColorStop(0, "#06b6d4")
        borderGradient.addColorStop(1, "#a855f7")
        ctx.strokeStyle = borderGradient
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username with gradient
        const textGradient = ctx.createLinearGradient(size / 2 - 200, 420, size / 2 + 200, 420)
        textGradient.addColorStop(0, "#06b6d4")
        textGradient.addColorStop(0.5, "#ffffff")
        textGradient.addColorStop(1, "#a855f7")
        ctx.fillStyle = textGradient
        ctx.font = "bold 52px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        // Subtitle
        ctx.font = "16px sans-serif"
        ctx.fillStyle = "rgba(6, 182, 212, 0.9)"
        ctx.fillText("Privacy Pioneer", size / 2, 455)

        // Stats container with glass effect
        const boxY = 510
        const boxHeight = 130
        const boxPadding = 60

        // Glass background
        ctx.fillStyle = "rgba(15, 23, 42, 0.6)"
        ctx.fillRect(boxPadding, boxY, size - boxPadding * 2, boxHeight)

        // Border with gradient
        const boxBorderGradient = ctx.createLinearGradient(boxPadding, boxY, size - boxPadding, boxY)
        boxBorderGradient.addColorStop(0, "rgba(6, 182, 212, 0.5)")
        boxBorderGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.5)")
        boxBorderGradient.addColorStop(1, "rgba(6, 182, 212, 0.5)")
        ctx.strokeStyle = boxBorderGradient
        ctx.lineWidth = 2
        ctx.strokeRect(boxPadding, boxY, size - boxPadding * 2, boxHeight)

        // Stats
        const statY = boxY + 60
        const spacing = (size - boxPadding * 2) / 3

        // Rank
        ctx.font = "bold 36px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText(`#${rank || "--"}`, boxPadding + spacing / 2, statY)
        ctx.font = "14px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Rank", boxPadding + spacing / 2, statY + 30)

        // Score
        ctx.font = "bold 36px sans-serif"
        ctx.fillStyle = "#a855f7"
        ctx.fillText(totalScore.toLocaleString(), boxPadding + spacing * 1.5, statY)
        ctx.font = "14px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Score", boxPadding + spacing * 1.5, statY + 30)

        // Games
        ctx.font = "bold 36px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText(gamesPlayed.toString(), boxPadding + spacing * 2.5, statY)
        ctx.font = "14px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Games", boxPadding + spacing * 2.5, statY + 30)

        // Footer branding
        ctx.font = "bold 20px sans-serif"
        const footerTextGradient = ctx.createLinearGradient(size / 2 - 150, size - 50, size / 2 + 150, size - 50)
        footerTextGradient.addColorStop(0, "#06b6d4")
        footerTextGradient.addColorStop(1, "#a855f7")
        ctx.fillStyle = footerTextGradient
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        // Arcium logo at bottom
        ctx.drawImage(logoImg, size / 2 - 25, size - 40, 50, 50)
      } else if (selectedTemplate === "gradient") {
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size)
        gradient.addColorStop(0, "#06b6d4") // cyan-500
        gradient.addColorStop(0.5, "#a855f7") // purple-500
        gradient.addColorStop(1, "#ec4899") // pink-500
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)

        // Pattern overlay
        ctx.globalAlpha = 0.1
        ctx.fillStyle = "#ffffff"
        for (let x = 0; x < size; x += 20) {
          for (let y = 0; y < size; y += 20) {
            ctx.beginPath()
            ctx.arc(x, y, 1, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1

        // Profile image (circular)
        const profileSize = 128
        const profileX = size / 2
        const profileY = 280
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // White border around profile
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        // Subtitle
        ctx.font = "16px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
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

        // Footer branding
        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        // Arcium logo at bottom
        ctx.drawImage(logoImg, size / 2 - 20, size - 35, 40, 40)
      } else if (selectedTemplate === "minimal") {
        // White background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, size, size)

        // Profile image (circular)
        const profileSize = 128
        const profileX = size / 2
        const profileY = 280
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // Gray border around profile
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username
        ctx.fillStyle = "#111827"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        // Subtitle
        ctx.font = "16px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Privacy Pioneer", size / 2, 450)

        // Stats box background
        const boxY = 500
        const boxHeight = 120
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 2
        ctx.strokeRect(64, boxY, size - 128, boxHeight)

        // Stats
        const statY = boxY + 50
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#111827"

        // Rank
        ctx.fillText(`#${rank || "--"}`, 200, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Rank", 200, statY + 25)

        // Score
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#111827"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Score", size / 2, statY + 25)

        // Games
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#111827"
        ctx.fillText(gamesPlayed.toString(), 600, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Games", 600, statY + 25)

        // Footer branding
        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#374151"
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        // Arcium logo at bottom
        ctx.drawImage(logoImg, size / 2 - 20, size - 35, 40, 40)
      } else if (selectedTemplate === "bold") {
        // Dark background
        ctx.fillStyle = "#111827"
        ctx.fillRect(0, 0, size, size)

        // Electric effect lines
        const gradient1 = ctx.createLinearGradient(0, 0, size, 0)
        gradient1.addColorStop(0, "transparent")
        gradient1.addColorStop(0.5, "#06b6d4")
        gradient1.addColorStop(1, "transparent")
        ctx.fillStyle = gradient1
        ctx.globalAlpha = 0.5
        ctx.fillRect(0, 0, size, 4)
        ctx.fillRect(0, size - 4, size, 4)
        ctx.globalAlpha = 1

        // Profile image (circular)
        const profileSize = 128
        const profileX = size / 2
        const profileY = 280
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        // Cyan border around profile
        ctx.strokeStyle = "#06b6d4"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        // Username
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        // Subtitle
        ctx.font = "16px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText("Privacy Pioneer", size / 2, 450)

        // Stats box background (gradient)
        const boxY = 500
        const boxHeight = 120
        const boxGradient = ctx.createLinearGradient(64, boxY, size - 64, boxY)
        boxGradient.addColorStop(0, "rgba(6, 182, 212, 0.2)")
        boxGradient.addColorStop(1, "rgba(168, 85, 247, 0.2)")
        ctx.fillStyle = boxGradient
        ctx.fillRect(64, boxY, size - 128, boxHeight)
        ctx.strokeStyle = "rgba(6, 182, 212, 0.5)"
        ctx.lineWidth = 2
        ctx.strokeRect(64, boxY, size - 128, boxHeight)

        // Stats
        const statY = boxY + 50
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#06b6d4"

        // Rank
        ctx.fillText(`#${rank || "--"}`, 200, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Rank", 200, statY + 25)

        // Score
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Score", size / 2, statY + 25)

        // Games
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText(gamesPlayed.toString(), 600, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Games", 600, statY + 25)

        // Footer branding
        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        // Arcium logo at bottom
        ctx.drawImage(logoImg, size / 2 - 20, size - 35, 40, 40)
      }

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Failed to create image. Please try again.")
          return
        }

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = `arcium-${username}-${selectedTemplate}-card.png`
        link.href = url
        link.click()

        setTimeout(() => URL.revokeObjectURL(url), 100)
      }, "image/png")
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download card. Please try again.")
    }
  }

  const handleTwitterShare = async () => {
    if (!profileImage) {
      alert("Please upload a profile picture to share with image!")
      return
    }

    try {
      const size = 800
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        const tweetText = `Just generated my Arcium social card! 🔐✨\n\nRank: #${rank || "--"}\nScore: ${totalScore.toLocaleString()}\n\nJoin me in the encrypted world: https://stayencrypted.vercel.app/`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
        window.open(twitterUrl, "_blank")
        return
      }

      const profileImg = new Image()
      profileImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        profileImg.onload = resolve
        profileImg.onerror = reject
        profileImg.src = profileImage
      })

      const logoImg = new Image()
      logoImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        logoImg.onload = resolve
        logoImg.onerror = reject
        logoImg.src = "/images/arcium-logo.png"
      })

      if (selectedTemplate === "gradient") {
        const gradient = ctx.createLinearGradient(0, 0, size, size)
        gradient.addColorStop(0, "#06b6d4")
        gradient.addColorStop(0.5, "#a855f7")
        gradient.addColorStop(1, "#ec4899")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)

        ctx.globalAlpha = 0.1
        ctx.fillStyle = "#ffffff"
        for (let x = 0; x < size; x += 20) {
          for (let y = 0; y < size; y += 20) {
            ctx.beginPath()
            ctx.arc(x, y, 1, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1

        const profileSize = 128
        const profileX = size / 2
        const profileY = 280
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        ctx.font = "16px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fillText("Privacy Pioneer", size / 2, 450)

        const boxY = 500
        const boxHeight = 120
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
        ctx.fillRect(64, boxY, size - 128, boxHeight)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1
        ctx.strokeRect(64, boxY, size - 128, boxHeight)

        const statY = boxY + 50
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#ffffff"

        ctx.fillText(`#${rank || "--"}`, 200, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Rank", 200, statY + 25)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Score", size / 2, statY + 25)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.fillText(gamesPlayed.toString(), 600, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Games", 600, statY + 25)

        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        ctx.drawImage(logoImg, size / 2 - 20, size - 35, 40, 40)
      } else if (selectedTemplate === "minimal") {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, size, size)

        const profileSize = 128
        const profileX = size / 2
        const profileY = 280
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = "#111827"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        ctx.font = "16px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Privacy Pioneer", size / 2, 450)

        const boxY = 500
        const boxHeight = 120
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 2
        ctx.strokeRect(64, boxY, size - 128, boxHeight)

        const statY = boxY + 50
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#111827"

        ctx.fillText(`#${rank || "--"}`, 200, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Rank", 200, statY + 25)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#111827"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Score", size / 2, statY + 25)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#111827"
        ctx.fillText(gamesPlayed.toString(), 600, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#6b7280"
        ctx.fillText("Games", 600, statY + 25)

        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#374151"
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        ctx.drawImage(logoImg, size / 2 - 20, size - 35, 40, 40)
      } else if (selectedTemplate === "bold") {
        ctx.fillStyle = "#111827"
        ctx.fillRect(0, 0, size, size)

        const gradient1 = ctx.createLinearGradient(0, 0, size, 0)
        gradient1.addColorStop(0, "transparent")
        gradient1.addColorStop(0.5, "#06b6d4")
        gradient1.addColorStop(1, "transparent")
        ctx.fillStyle = gradient1
        ctx.globalAlpha = 0.5
        ctx.fillRect(0, 0, size, 4)
        ctx.fillRect(0, size - 4, size, 4)
        ctx.globalAlpha = 1

        const profileSize = 128
        const profileX = size / 2
        const profileY = 280
        ctx.save()
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(profileImg, profileX - profileSize / 2, profileY - profileSize / 2, profileSize, profileSize)
        ctx.restore()

        ctx.strokeStyle = "#06b6d4"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 48px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(username || "Your Name", size / 2, 420)

        ctx.font = "16px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText("Privacy Pioneer", size / 2, 450)

        const boxY = 500
        const boxHeight = 120
        const boxGradient = ctx.createLinearGradient(64, boxY, size - 64, boxY)
        boxGradient.addColorStop(0, "rgba(6, 182, 212, 0.2)")
        boxGradient.addColorStop(1, "rgba(168, 85, 247, 0.2)")
        ctx.fillStyle = boxGradient
        ctx.fillRect(64, boxY, size - 128, boxHeight)
        ctx.strokeStyle = "rgba(6, 182, 212, 0.5)"
        ctx.lineWidth = 2
        ctx.strokeRect(64, boxY, size - 128, boxHeight)

        const statY = boxY + 50
        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#06b6d4"

        ctx.fillText(`#${rank || "--"}`, 200, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Rank", 200, statY + 25)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText(totalScore.toLocaleString(), size / 2, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Score", size / 2, statY + 25)

        ctx.font = "bold 32px sans-serif"
        ctx.fillStyle = "#06b6d4"
        ctx.fillText(gamesPlayed.toString(), 600, statY)
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText("Games", 600, statY + 25)

        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.fillText("My Arcium Social Card", size / 2, size - 50)

        ctx.drawImage(logoImg, size / 2 - 20, size - 35, 40, 40)
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          const tweetText = `Just generated my Arcium social card! 🔐✨\n\nRank: #${rank || "--"}\nScore: ${totalScore.toLocaleString()}\n\nJoin me: https://stayencrypted.vercel.app/`
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
          window.open(twitterUrl, "_blank")
          return
        }

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = `arcium-${username}-card.png`
        link.href = url
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        const tweetText = `Just generated my Arcium social card! 🔐✨\n\nRank: #${rank || "--"}\nScore: ${totalScore.toLocaleString()}\n\nJoin me: https://stayencrypted.vercel.app/`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

        setTimeout(() => {
          window.open(twitterUrl, "_blank")
          URL.revokeObjectURL(url)
        }, 500)
      }, "image/png")
    } catch (error) {
      console.error("Twitter share error:", error)
      const tweetText = `Just generated my Arcium social card! 🔐✨\n\nRank: #${rank || "--"}\nScore: ${totalScore.toLocaleString()}\n\nJoin me in the encrypted world: https://stayencrypted.vercel.app/`
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
      window.open(twitterUrl, "_blank")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
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
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Template Selection */}
            <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-4">Card Style</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button
                  variant={selectedTemplate === "geometric" ? "default" : "outline"}
                  onClick={() => setSelectedTemplate("geometric")}
                  className="h-20 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-cyan-500 opacity-20 group-hover:opacity-30 transition-opacity" />
                  <span className="relative z-10">Geometric</span>
                </Button>
                <Button
                  variant={selectedTemplate === "gradient" ? "default" : "outline"}
                  onClick={() => setSelectedTemplate("gradient")}
                  className="h-20"
                >
                  Gradient
                </Button>
                <Button
                  variant={selectedTemplate === "minimal" ? "default" : "outline"}
                  onClick={() => setSelectedTemplate("minimal")}
                  className="h-20"
                >
                  Minimal
                </Button>
                <Button
                  variant={selectedTemplate === "bold" ? "default" : "outline"}
                  onClick={() => setSelectedTemplate("bold")}
                  className="h-20"
                >
                  Bold
                </Button>
              </div>
            </Card>
          </div>

          {/* Right side - Preview */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Preview</h3>

              {/* Gradient Template */}
              {selectedTemplate === "gradient" && (
                <div
                  ref={cardRef}
                  data-card="true"
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
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400/50">
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
                      <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" crossOrigin="anonymous" />
                      <span className="text-white font-semibold">My Arcium Social Card</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Minimal Template */}
              {selectedTemplate === "minimal" && (
                <div
                  ref={cardRef}
                  data-card="true"
                  className="aspect-square bg-white rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="relative h-full flex flex-col">
                    {/* Profile Section */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100">
                        {profileImage ? (
                          <img
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
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
                    <div className="border-2 border-gray-200 rounded-2xl p-6">
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
                      <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" crossOrigin="anonymous" />
                      <span className="text-gray-900 font-semibold">My Arcium Social Card</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bold Template */}
              {selectedTemplate === "bold" && (
                <div
                  ref={cardRef}
                  data-card="true"
                  className="aspect-square bg-gray-900 rounded-3xl p-8 relative overflow-hidden"
                >
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
                            crossOrigin="anonymous"
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
                      <span className="text-white font-semibold">My Arcium Social Card</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Geometric Template */}
              {selectedTemplate === "geometric" && (
                <div
                  ref={cardRef}
                  data-card="true"
                  className="aspect-square bg-black rounded-3xl p-8 relative overflow-hidden"
                >
                  {/* Profile Section */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-32 h-32 rounded-full border-4 border-yellow-500 overflow-hidden bg-yellow-500/20">
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
                      <h2 className="text-3xl font-bold text-white mb-1">{username || "Your Name"}</h2>
                      <p className="text-yellow-500 text-sm font-semibold">Privacy Pioneer</p>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="bg-black/80 rounded-2xl p-6 border-2 border-yellow-500/50">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-yellow-500">#{rank || "--"}</div>
                        <div className="text-white/70 text-xs">Rank</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-500">{totalScore.toLocaleString()}</div>
                        <div className="text-white/70 text-xs">Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-500">{gamesPlayed}</div>
                        <div className="text-white/70 text-xs">Games</div>
                      </div>
                    </div>
                  </div>

                  {/* Branding */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <img src="/images/arcium-logo.png" alt="Arcium" className="w-6 h-6" />
                    <span className="text-white font-semibold">My Arcium Social Card</span>
                  </div>
                </div>
              )}
            </div>

            {/* Download and Share buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                disabled={!profileImage}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100"
              >
                <Download className="w-5 h-5" />
                <span>Download Card</span>
              </button>

              <button
                onClick={handleTwitterShare}
                disabled={!profileImage}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100"
              >
                <Twitter className="w-5 h-5" />
                <span>Share on X</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialCardGenerator
