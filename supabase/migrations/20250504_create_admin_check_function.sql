
-- Create a secure function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin_user BOOLEAN;
BEGIN
  -- Direct query against admin_users table with extra logging
  SELECT EXISTS(
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email
  ) INTO is_admin_user;
  
  -- Add logging to help debug
  RAISE LOG 'Checking admin status for %: result=%', user_email, is_admin_user;
  
  RETURN is_admin_user;
END;
$$;
