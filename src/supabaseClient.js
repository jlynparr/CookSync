import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmtqepxggkcfaknmzamx.supabase.co'; // from Supabase project dashboard
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdHFlcHhnZ2tjZmFrbm16YW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjY4NTMsImV4cCI6MjA2NDk0Mjg1M30.pzK1KmwKGgX7Tk43smY3Ed1_f7_R5MNNFVfUXdaTEWA'; // from Supabase API settings → Project API keys → anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
