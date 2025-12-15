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
  FORTRESS_STORIES_READ: "arcium_fortress_stories_read",
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

  // Check for first game achievement
  const achievements = getAchievements()
  const hasAnyGameScore = achievements.some((a) => a.unlockedAt && a.id.includes("_pro"))
  if (!hasAnyGameScore) {
    unlockAchievement("first_game")
  }

  // Check game-specific achievements
  checkGameAchievements(gameType, score)
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
    { id: "key_catcher_pro", name: "Key Catcher Pro", description: "Score 1000+ in Key Catcher", icon: "🔑" },
    {
      id: "threat_detector_ace",
      name: "Threat Detector Ace",
      description: "Detect all threats in Threat Detector",
      icon: "🔍",
    },
    {
      id: "privacy_path_master",
      name: "Privacy Path Master",
      description: "Complete Privacy Path perfectly",
      icon: "🗺️",
    },
    {
      id: "data_defender_hero",
      name: "Data Defender Hero",
      description: "Achieve perfect score in Data Defender",
      icon: "🛡️",
    },
    {
      id: "spelling_bee_expert",
      name: "Spelling Bee Expert",
      description: "Perfect score in Privacy Spelling Bee",
      icon: "🐝",
    },
    {
      id: "quick_fire_champion",
      name: "Quick Fire Champion",
      description: "Score 15/15 in Quick Fire MPC",
      icon: "⚡",
    },
    {
      id: "fortress_vault_master",
      name: "Fortress Vault Master",
      description: "Complete Fortress Vault perfectly",
      icon: "🏰",
    },
    {
      id: "data_flow_genius",
      name: "Data Flow Genius",
      description: "Complete Data Flow with perfect sequence",
      icon: "🌊",
    },
    {
      id: "daily_dedication",
      name: "Daily Dedication",
      description: "Complete 7 day GMPC check-in streak",
      icon: "📅",
    },
    { id: "fortress_explorer", name: "Fortress Explorer", description: "Read all 5 Fortress Stories", icon: "📖" },
    { id: "community_contributor", name: "Community Contributor", description: "Submit a fortress story", icon: "✍️" },
    { id: "privacy_pioneer", name: "Privacy Pioneer", description: "Unlock all achievements", icon: "🌟" },
  ]

  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(defaultAchievements))
}

// Fortress Story Tracking
export function markStoryAsRead(storyId: string): void {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem(STORAGE_KEYS.FORTRESS_STORIES_READ)
  const readStories: string[] = stored ? JSON.parse(stored) : []

  if (!readStories.includes(storyId)) {
    readStories.push(storyId)
    localStorage.setItem(STORAGE_KEYS.FORTRESS_STORIES_READ, JSON.stringify(readStories))

    // Check if all 5 fortress stories have been read
    if (readStories.length >= 5) {
      unlockAchievement("fortress_explorer")
    }
  }
}

export function getReadStories(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.FORTRESS_STORIES_READ)
  return stored ? JSON.parse(stored) : []
}

export function hasReadStory(storyId: string): boolean {
  return getReadStories().includes(storyId)
}

// Game-Specific Achievement Checking
function checkGameAchievements(gameType: string, score: number): void {
  const achievementMap: Record<string, { threshold: number; achievementId: string }> = {
    keycatcher: { threshold: 1000, achievementId: "key_catcher_pro" },
    threatdetector: { threshold: 100, achievementId: "threat_detector_ace" },
    privacypath: { threshold: 100, achievementId: "privacy_path_master" },
    datadefender: { threshold: 100, achievementId: "data_defender_hero" },
    spellingbee: { threshold: 100, achievementId: "spelling_bee_expert" },
    quickfirempc: { threshold: 15, achievementId: "quick_fire_champion" },
    fortressvault: { threshold: 100, achievementId: "fortress_vault_master" },
    dataflow: { threshold: 100, achievementId: "data_flow_genius" },
  }

  const achievementConfig = achievementMap[gameType.toLowerCase().replace(/[^a-z]/g, "")]
  if (achievementConfig && score >= achievementConfig.threshold) {
    unlockAchievement(achievementConfig.achievementId)
  }

  // Check if all game achievements are unlocked
  checkAllAchievementsUnlocked()
}

// Quiz Completion Checking
export function checkQuizCompletion(score: number, totalQuestions: number): void {
  if (score === totalQuestions) {
    unlockAchievement("quiz_master")
  }
  checkAllAchievementsUnlocked()
}

// Daily Streak Checking
export function checkDailyStreak(streakCount: number): void {
  if (streakCount >= 7) {
    unlockAchievement("daily_dedication")
  }
  checkAllAchievementsUnlocked()
}

// Story Submission Tracking
export function markStorySubmitted(): void {
  unlockAchievement("community_contributor")
  checkAllAchievementsUnlocked()
}

// All Achievements Unlocked Checking
function checkAllAchievementsUnlocked(): void {
  const achievements = getAchievements()
  const allUnlocked = achievements.filter((a) => a.id !== "privacy_pioneer").every((a) => a.unlockedAt)

  if (allUnlocked) {
    unlockAchievement("privacy_pioneer")
  }
}
