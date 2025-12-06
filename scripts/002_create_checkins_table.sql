-- Create check-ins table for GMPC Daily
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES public.players(id),
  username TEXT NOT NULL,
  check_in_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(player_id, check_in_date)
);

-- Enable RLS
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert checkins" ON public.checkins
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view checkins" ON public.checkins
  FOR SELECT USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_checkins_player_date ON public.checkins(player_id, check_in_date);
CREATE INDEX IF NOT EXISTS idx_checkins_username ON public.checkins(username);
