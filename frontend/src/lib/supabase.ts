import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined) || (import.meta as any).env?.VITE_SUPABASE_URL || "https://gelmugbsyhgcluqigrad.supabase.co";
const supabaseKey = (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_PUBLISHABLE_KEY : undefined) || (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const supabase = createClient(supabaseUrl, supabaseKey);
