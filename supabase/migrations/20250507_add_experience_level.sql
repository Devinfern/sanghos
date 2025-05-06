
-- Add experience_level column to user_profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'user_profiles' 
    AND column_name = 'experience_level'
  ) THEN
    ALTER TABLE public.user_profiles 
    ADD COLUMN experience_level text;
  END IF;
END $$;
