-- Phase 1: Database Foundation - Fix Schema & Relationships (Corrected)

-- Create messages table for real-time chat
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id TEXT NOT NULL DEFAULT 'general',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reactions JSONB DEFAULT '{}',
  reply_to UUID REFERENCES public.messages(id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  data JSONB DEFAULT '{}'
);

-- Enable RLS on new tables
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for messages
CREATE POLICY "Users can view messages in their channels" 
ON public.messages FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create messages" 
ON public.messages FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" 
ON public.messages FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages" 
ON public.messages FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

-- Enable real-time for all community tables
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.community_posts REPLICA IDENTITY FULL;
ALTER TABLE public.community_comments REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_comments;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_channel_id ON public.messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_comments_post_id ON public.community_comments(post_id);

-- Insert sample data
INSERT INTO public.community_posts (title, content, user_id, category, likes) 
VALUES 
  ('Welcome to the Community!', 'This is our new community platform where we can connect, share ideas, and support each other on our wellness journey.', (SELECT id FROM auth.users LIMIT 1), 'general', 12),
  ('Morning Meditation Tips', 'I wanted to share some techniques that have helped me start my day with more mindfulness and peace.', (SELECT id FROM auth.users LIMIT 1), 'wellness', 8),
  ('Upcoming Retreat Discussion', 'Who''s excited about the upcoming mountain retreat? Let''s discuss what to bring and what to expect!', (SELECT id FROM auth.users LIMIT 1), 'retreats', 15),
  ('Healthy Recipe Exchange', 'Share your favorite healthy recipes here! I''ll start with my go-to smoothie recipe.', (SELECT id FROM auth.users LIMIT 1), 'nutrition', 6),
  ('Mindfulness Challenge', 'Anyone interested in joining a 30-day mindfulness challenge? We can support each other!', (SELECT id FROM auth.users LIMIT 1), 'challenges', 22)
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO public.messages (channel_id, user_id, content) 
VALUES 
  ('general', (SELECT id FROM auth.users LIMIT 1), 'Welcome everyone! So excited to have this space to connect.'),
  ('general', (SELECT id FROM auth.users LIMIT 1), 'This is amazing! Love the real-time chat feature.'),
  ('wellness', (SELECT id FROM auth.users LIMIT 1), 'Has anyone tried the new meditation techniques from yesterday''s session?'),
  ('retreats', (SELECT id FROM auth.users LIMIT 1), 'Can''t wait for the upcoming retreat! The location looks incredible.'),
  ('general', (SELECT id FROM auth.users LIMIT 1), 'Thanks for building this community platform. It feels so much more connected now!')
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO public.notifications (user_id, type, title, message, data) 
VALUES 
  ((SELECT id FROM auth.users LIMIT 1), 'welcome', 'Welcome to the Community!', 'Thanks for joining our wellness community. Start by introducing yourself!', '{"action": "visit_profile"}'),
  ((SELECT id FROM auth.users LIMIT 1), 'new_post', 'New Post in Wellness', 'Someone shared new meditation tips in the wellness category.', '{"post_id": "123"}'),
  ((SELECT id FROM auth.users LIMIT 1), 'event_reminder', 'Retreat Reminder', 'Your mountain retreat is coming up in 3 days. Don''t forget to pack!', '{"event_id": "456"}')
ON CONFLICT DO NOTHING;

-- Create function to automatically create notifications
CREATE OR REPLACE FUNCTION public.create_notification_for_new_post()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  SELECT 
    up.user_id,
    'new_post',
    'New Post: ' || NEW.title,
    'A new post has been shared in the ' || NEW.category || ' category.',
    jsonb_build_object('post_id', NEW.id, 'category', NEW.category)
  FROM public.user_profiles up
  WHERE up.user_id != NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new post notifications
CREATE TRIGGER trigger_new_post_notification
  AFTER INSERT ON public.community_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.create_notification_for_new_post();

-- Update timestamps trigger for messages
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();