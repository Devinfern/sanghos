
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

serve(async (req) => {
  const { email } = await req.json();
  
  try {
    // Create a Supabase client with the project API key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if the email is in the admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Error checking admin status:', error);
      return new Response(JSON.stringify({ isAdmin: false, error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const isAdmin = !!data;
    return new Response(JSON.stringify({ isAdmin }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Exception checking admin status:', error);
    return new Response(JSON.stringify({ isAdmin: false, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
