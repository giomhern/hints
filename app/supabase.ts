import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

declare global {
  interface Window {
    supabase: typeof supabase;
  }
}
// Attach the client to the `window` object for debugging in the browser console
if (typeof window !== "undefined") {
  window.supabase = supabase;
}
