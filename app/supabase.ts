import { createClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    supabase: typeof supabase;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);


if (typeof window !== "undefined") {
  window.supabase = supabase;
}
