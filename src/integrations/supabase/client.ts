
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ordomvdrqjthpzfyrrzp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZG9tdmRycWp0aHB6ZnlycnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzM3NDgsImV4cCI6MjA1NjgwOTc0OH0.fQqjrsQC--wNITiVq15SIwuY2sp3t5hxpbg0DVVeoLw';

export const supabase = createClient(supabaseUrl, supabaseKey);
