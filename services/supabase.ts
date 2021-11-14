import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl,
  process.env.ANON_KEY
)