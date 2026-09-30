import { createClient } from "@supabase/supabase-js";

const getEnv = (key: string): string | undefined => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && (import.meta as any).env?.[key]) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

const supabaseUrl =
  getEnv("VITE_SUPABASE_URL") || "https://gelmugbsyhgcluqigrad.supabase.co";

const supabaseKey =
  getEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ||
  getEnv("VITE_SUPABASE_ANON_KEY") ||
  "";

if (!supabaseKey && typeof window !== "undefined") {
  console.warn(
    "[Supabase] Missing VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY in frontend/.env. Database queries may fail until configured."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey || "dummy-anon-key");

