import { createClient } from "@/lib/supabase/client"

export interface LeaderboardEntry {
  id: string
  username: string
  score: number
  played_at: string
  game_name?: string
}

export interface OverallLeaderboardEntry {
  username: string
  total_score: number
  games_played: number
}

// Check if username exists
export async function checkUsernameExists(username: string): Promise<boolean> {
  const supabase = createClient()

  const { data, error } = await supabase.from("players").select("id").eq("username", username).maybeSingle()

  if (error) {
    console.error("[v0] Error checking username:", error)
    return false
  }

  return !!data
}

// Create a new player
export async function createPlayer(username: string): Promise<{ id: string } | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("players").insert({ username }).select("id").single()

  if (error) {
    console.error("[v0] Error creating player:", error)
    return null
  }

  return data
}

// Get or create player
export async function getOrCreatePlayer(username: string): Promise<string | null> {
  const supabase = createClient()

  const { data, error } = await supabase.rpc("get_or_create_player", {
    p_username: username,
  })

  if (error) {
    console.error("[v0] Error getting or creating player:", error)
    return null
  }

  return data
}

// Submit a score
export async function submitScore(username: string, gameName: string, score: number): Promise<boolean> {
  const supabase = createClient()

  const { data, error } = await supabase.rpc("submit_game_score", {
    p_username: username,
    p_game_name: gameName,
    p_score: score,
  })

  if (error) {
    console.error("[v0] Error submitting score:", error)
    return false
  }

  if (!data?.success) {
    console.error("[v0] Score submission failed:", data?.error)
    return false
  }

  return true
}

// Get leaderboard for a specific game
export async function getGameLeaderboard(gameName: string, limit = 10): Promise<LeaderboardEntry[]> {
  const supabase = createClient()

  // Get all scores for this game
  const { data, error } = await supabase
    .from("game_scores")
    .select("id, username, score, played_at")
    .eq("game_name", gameName)
    .order("score", { ascending: false })
    .order("played_at", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching game leaderboard:", error)
    return []
  }

  if (!data) return []

  // Group by username and keep only the best score for each player
  const bestScores = new Map<string, LeaderboardEntry>()

  data.forEach((entry) => {
    const existing = bestScores.get(entry.username)
    if (!existing || entry.score > existing.score) {
      bestScores.set(entry.username, entry)
    }
  })

  // Convert to array, sort by score, and limit
  return Array.from(bestScores.values())
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      // If scores are equal, earlier timestamp wins
      return new Date(a.played_at).getTime() - new Date(b.played_at).getTime()
    })
    .slice(0, limit)
}

// Get overall leaderboard (combined scores)
export async function getOverallLeaderboard(limit = 10): Promise<OverallLeaderboardEntry[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("game_scores")
    .select("username, score")
    .order("score", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching overall leaderboard:", error)
    return []
  }

  // Aggregate scores by username
  const userScores = new Map<string, { total: number; count: number }>()

  data?.forEach((entry) => {
    const current = userScores.get(entry.username) || { total: 0, count: 0 }
    userScores.set(entry.username, {
      total: current.total + entry.score,
      count: current.count + 1,
    })
  })

  // Convert to array and sort
  const overall = Array.from(userScores.entries())
    .map(([username, stats]) => ({
      username,
      total_score: stats.total,
      games_played: stats.count,
    }))
    .sort((a, b) => b.total_score - a.total_score)
    .slice(0, limit)

  return overall
}

// Get player's rank in a specific game
export async function getPlayerRank(username: string, gameName: string): Promise<number | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("game_scores")
    .select("username, score")
    .eq("game_name", gameName)
    .order("score", { ascending: false })

  if (error || !data) {
    return null
  }

  const rank = data.findIndex((entry) => entry.username === username)
  return rank === -1 ? null : rank + 1
}
