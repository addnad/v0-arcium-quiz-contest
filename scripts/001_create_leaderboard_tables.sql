-- Create players table for unique usernames
CREATE TABLE IF NOT EXISTS public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create game_scores table for individual game scores
CREATE TABLE IF NOT EXISTS public.game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  game_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  played_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_game_scores_game_name ON public.game_scores(game_name);
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON public.game_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_player ON public.game_scores(player_id);

-- Enable Row Level Security
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for players (everyone can read, anyone can create a player)
CREATE POLICY "Anyone can view players"
  ON public.players FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert players"
  ON public.players FOR INSERT
  WITH CHECK (true);

-- RLS Policies for game_scores (everyone can read and insert)
CREATE POLICY "Anyone can view game scores"
  ON public.game_scores FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert game scores"
  ON public.game_scores FOR INSERT
  WITH CHECK (true);
