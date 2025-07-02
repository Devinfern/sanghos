
-- Create forum_events table for community events
CREATE TABLE public.forum_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date_day INTEGER NOT NULL,
  date_month TEXT NOT NULL,
  time TEXT NOT NULL,
  retreat_id UUID,
  location TEXT,
  description TEXT,
  instructor_name TEXT,
  price DECIMAL(10,2),
  capacity INTEGER,
  remaining INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create forum_spaces table for community spaces
CREATE TABLE public.forum_spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create trending_posts table for community trending posts
CREATE TABLE public.trending_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.forum_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trending_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forum_events
CREATE POLICY "Anyone can view forum events" ON public.forum_events
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage forum events" ON public.forum_events
  FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS Policies for forum_spaces
CREATE POLICY "Anyone can view forum spaces" ON public.forum_spaces
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage forum spaces" ON public.forum_spaces
  FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS Policies for trending_posts
CREATE POLICY "Anyone can view trending posts" ON public.trending_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage trending posts" ON public.trending_posts
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create indexes for performance
CREATE INDEX idx_forum_events_date ON public.forum_events(date_day, date_month);
CREATE INDEX idx_forum_spaces_category ON public.forum_spaces(category);
CREATE INDEX idx_trending_posts_created_at ON public.trending_posts(created_at);
