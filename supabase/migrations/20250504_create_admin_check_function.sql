
-- Create a secure function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_user_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  -- Direct query against admin_users table
  SELECT EXISTS(SELECT 1 FROM public.admin_users WHERE email = user_email) INTO is_admin;
  RETURN is_admin;
END;
$$;
