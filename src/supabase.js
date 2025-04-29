import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wetlrreeyjlfaoypswvf.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldGxycmVleWpsZmFveXBzd3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjU3NjAsImV4cCI6MjA2MTA0MTc2MH0.CtOk9WEomza5Z3VJb57g7E96-CGz9LSY2rlU_fUMDVI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
