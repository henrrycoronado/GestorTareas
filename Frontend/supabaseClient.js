import { createClient } from "@supabase/supabase-js";

let supabase;

export const supabaseClient = () => {
  if (!supabase) {
    supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  }
  return supabase;
};

