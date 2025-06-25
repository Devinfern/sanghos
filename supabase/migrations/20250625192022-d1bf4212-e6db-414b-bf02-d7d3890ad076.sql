
-- Create subscription tiers enum
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'enterprise');

-- Create host status enum
CREATE TYPE host_status AS ENUM ('pending', 'approved', 'suspended', 'rejected');

-- Create commission status enum
CREATE TYPE commission_status AS ENUM ('pending', 'paid', 'cancelled');

-- Create subscribers table for premium memberships
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier subscription_tier NOT NULL DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create hosts table for marketplace partners
CREATE TABLE public.hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  phone TEXT,
  bio TEXT,
  specialties TEXT[],
  years_experience INTEGER DEFAULT 0,
  verification_documents TEXT[],
  status host_status NOT NULL DEFAULT 'pending',
  commission_rate DECIMAL(5,2) DEFAULT 20.00,
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create host earnings table for tracking commissions
CREATE TABLE public.host_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES public.hosts(id) ON DELETE CASCADE,
  booking_id UUID, -- Reference to booking when implemented
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status commission_status NOT NULL DEFAULT 'pending',
  payout_date TIMESTAMPTZ,
  stripe_transfer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create wellness courses table for education platform
CREATE TABLE public.wellness_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES auth.users(id),
  price DECIMAL(10,2) DEFAULT 0,
  duration_hours INTEGER DEFAULT 0,
  difficulty_level TEXT DEFAULT 'beginner',
  tags TEXT[],
  video_url TEXT,
  materials_url TEXT,
  certificate_template TEXT,
  is_premium BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.wellness_courses(id) ON DELETE CASCADE,
  progress DECIMAL(5,2) DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  certificate_issued BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create premium content table
CREATE TABLE public.premium_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'article', 'video', 'retreat', 'course'
  content_id UUID, -- Reference to the actual content
  required_tier subscription_tier NOT NULL DEFAULT 'basic',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscribers
CREATE POLICY "Users can view their own subscription" ON public.subscribers
  FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Users can update their own subscription" ON public.subscribers
  FOR UPDATE USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Service can manage subscriptions" ON public.subscribers
  FOR ALL USING (true);

-- RLS Policies for hosts
CREATE POLICY "Users can view their own host profile" ON public.hosts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own host profile" ON public.hosts
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can create host profile" ON public.hosts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Public can view approved hosts" ON public.hosts
  FOR SELECT USING (status = 'approved');

-- RLS Policies for host earnings
CREATE POLICY "Hosts can view their own earnings" ON public.host_earnings
  FOR SELECT USING (
    host_id IN (SELECT id FROM public.hosts WHERE user_id = auth.uid())
  );

-- RLS Policies for wellness courses
CREATE POLICY "Anyone can view published courses" ON public.wellness_courses
  FOR SELECT USING (published = true);

CREATE POLICY "Instructors can manage their courses" ON public.wellness_courses
  FOR ALL USING (instructor_id = auth.uid());

-- RLS Policies for course enrollments
CREATE POLICY "Users can view their own enrollments" ON public.course_enrollments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own enrollments" ON public.course_enrollments
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for premium content
CREATE POLICY "Anyone can view premium content info" ON public.premium_content
  FOR SELECT USING (true);

-- Create function to check subscription tier
CREATE OR REPLACE FUNCTION public.user_has_subscription_tier(required_tier subscription_tier)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_tier subscription_tier;
BEGIN
  SELECT subscription_tier INTO user_tier
  FROM public.subscribers
  WHERE user_id = auth.uid() AND subscribed = true;
  
  IF user_tier IS NULL THEN
    RETURN required_tier = 'free';
  END IF;
  
  -- Check if user's tier meets or exceeds required tier
  CASE required_tier
    WHEN 'free' THEN RETURN true;
    WHEN 'basic' THEN RETURN user_tier IN ('basic', 'premium', 'enterprise');
    WHEN 'premium' THEN RETURN user_tier IN ('premium', 'enterprise');
    WHEN 'enterprise' THEN RETURN user_tier = 'enterprise';
  END CASE;
  
  RETURN false;
END;
$$;

-- Create indexes for performance
CREATE INDEX idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX idx_subscribers_email ON public.subscribers(email);
CREATE INDEX idx_hosts_user_id ON public.hosts(user_id);
CREATE INDEX idx_hosts_status ON public.hosts(status);
CREATE INDEX idx_host_earnings_host_id ON public.host_earnings(host_id);
CREATE INDEX idx_course_enrollments_user_id ON public.course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX idx_wellness_courses_instructor_id ON public.wellness_courses(instructor_id);
CREATE INDEX idx_premium_content_content_type ON public.premium_content(content_type);
