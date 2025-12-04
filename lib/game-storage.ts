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
  LEADERBOARD: "arcium_leaderboard",
  ACHIEVEMENTS: "arcium_achievements",
  ALL_USERNAMES: "arcium_all_usernames",
}

// User Profile Management
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
  return stored ? JSON.parse(stored) : null
}

export function setUserProfile(username: string): boolean {
  if (typeof window === "undefined") return false

  // Check if username already exists
  const allUsernames = getAllUsernames()
  if (allUsernames.includes(username.toLowerCase())) {
    return false
  }

  const profile: UserProfile = {
    username,
    createdAt: Date.now(),
  }

  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))

  // Add to all usernames list
  allUsernames.push(username.toLowerCase())
  localStorage.setItem(STORAGE_KEYS.ALL_USERNAMES, JSON.stringify(allUsernames))

  return true
}

function getAllUsernames(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.ALL_USERNAMES)
  return stored ? JSON.parse(stored) : []
}

// Leaderboard Management
export function getLeaderboard(gameType?: string): GameScore[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
  const allScores: GameScore[] = stored ? JSON.parse(stored) : []

  if (gameType) {
    return allScores
      .filter((score) => score.gameType === gameType)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }

  return allScores.sort((a, b) => b.score - a.score).slice(0, 10)
}

export function addScore(score: number, gameType: string): void {
  if (typeof window === "undefined") return
  const profile = getUserProfile()
  if (!profile) return

  const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
  const scores: GameScore[] = stored ? JSON.parse(stored) : []

  const newScore: GameScore = {
    username: profile.username,
    score,
    timestamp: Date.now(),
    gameType,
  }

  scores.push(newScore)
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(scores))
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
