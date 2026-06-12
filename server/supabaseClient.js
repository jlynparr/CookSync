import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jymlznkfhefdkyjigoar.supabase.co'; // from Supabase project dashboard
const supabaseKey = 'sb_publishable_IBUBeU52R-mr9hv_cke8ZQ_Zthzx39k'; // from Supabase API settings → Project API keys → anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
