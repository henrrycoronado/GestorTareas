import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey);
export function supabaseAuthClient(){
  return supabase;
}

const supabaseSchemaClients = {}

export function getSupaBaseClient(schema = 'public') {
  if (!supabaseSchemaClients[schema]) {
    supabaseSchemaClients[schema] = createClient(supabaseUrl, supabaseKey, { db: { schema } })
  }
  return supabaseSchemaClients[schema]
}
