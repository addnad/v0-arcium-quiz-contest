import { submitScore as submitScoreToSupabase } from "@/lib/global-leaderboard"

export interface UserProfile {
  username: string
  createdAt: number
}

export interface GameScore {
  username: string
  score: number
  timestamp: number
  gameType: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: number
}

const STORAGE_KEYS = {
  USER_PROFILE: "arcium_user_profile",
  ACHIEVEMENTS: "arcium_achievements",
}

// User Profile Management
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
  return stored ? JSON.parse(stored) : null
}

export function setUserProfile(username: string): boolean {
  if (typeof window === "undefined") return false

  const profile: UserProfile = {
    username,
    createdAt: Date.now(),
  }

  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
  return true
}

// Leaderboard Management
export async function addScore(score: number, gameType: string): Promise<void> {
  if (typeof window === "undefined") return
  const profile = getUserProfile()
  if (!profile) return

  // Submit to Supabase global leaderboard
  await submitScoreToSupabase(profile.username, gameType, score)
}

// Achievement Management
export function getAchievements(): Achievement[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
  return stored ? JSON.parse(stored) : []
}

export function unlockAchievement(achievementId: string): void {
  if (typeof window === "undefined") return
  const achievements = getAchievements()
  const achievement = achievements.find((a) => a.id === achievementId)

  if (achievement && !achievement.unlockedAt) {
    achievement.unlockedAt = Date.now()
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
  }
}

export function initializeAchievements(): void {
  if (typeof window === "undefined") return
  const existing = getAchievements()
  if (existing.length > 0) return

  const defaultAchievements: Achievement[] = [
    { id: "first_game", name: "First Steps", description: "Complete your first game", icon: "🎮" },
    { id: "quiz_master", name: "Quiz Master", description: "Score 100% on the Knowledge Quiz", icon: "🏆" },
    { id: "cipher_expert", name: "Cipher Expert", description: "Complete 5 Cipher Challenges", icon: "🔐" },
    { id: "speed_demon", name: "Speed Demon", description: "Score 800+ in Quick Fire MPC", icon: "⚡" },
    {
      id: "memory_champion",
      name: "Memory Champion",
      description: "Complete Fortress Vault in under 30 seconds",
      icon: "🎯",
    },
    {
      id: "daily_dedication",
      name: "Daily Dedication",
      description: "Complete 7 day GMPC check-in streak",
      icon: "📅",
    },
    { id: "fortress_explorer", name: "Fortress Explorer", description: "Read all 5 Fortress Stories", icon: "🏰" },
    { id: "privacy_pioneer", name: "Privacy Pioneer", description: "Unlock all achievements", icon: "🌟" },
  ]

  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(defaultAchievements))
}
