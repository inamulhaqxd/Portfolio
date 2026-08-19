import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/shared/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)
