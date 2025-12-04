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

  // Try to get existing player
  const { data: existingPlayer } = await supabase.from("players").select("id").eq("username", username).maybeSingle()

  if (existingPlayer) {
    return existingPlayer.id
  }

  // Create new player
  const newPlayer = await createPlayer(username)
  return newPlayer?.id || null
}

// Submit a score
export async function submitScore(username: string, gameName: string, score: number): Promise<boolean> {
  const playerId = await getOrCreatePlayer(username)

  if (!playerId) {
    console.error("[v0] Failed to get or create player")
    return false
  }

  const supabase = createClient()

  const { error } = await supabase.from("game_scores").insert({
    player_id: playerId,
    username,
    game_name: gameName,
    score,
  })

  if (error) {
    console.error("[v0] Error submitting score:", error)
    return false
  }

  return true
}

// Get leaderboard for a specific game
export async function getGameLeaderboard(gameName: string, limit = 10): Promise<LeaderboardEntry[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("game_scores")
    .select("id, username, score, played_at")
    .eq("game_name", gameName)
    .order("score", { ascending: false })
    .order("played_at", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("[v0] Error fetching game leaderboard:", error)
    return []
  }

  return data || []
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
