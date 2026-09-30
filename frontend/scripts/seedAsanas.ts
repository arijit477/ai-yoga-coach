import { createClient } from "@supabase/supabase-js";
import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog";
import { ASANA_RULES_CATALOG } from "../src/features/ai-coach/analysis/rules/poseRulesRegistry";
import path from "path";
import dotenv from "dotenv";

// Load env vars from frontend/.env and backend/.env
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../backend/.env") });

const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://gelmugbsyhgcluqigrad.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

if (!supabaseKey) {
  console.error(
    "Error: No Supabase key found!\nPlease provide SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY in frontend/.env or backend/.env."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);


async function seed() {
  console.log("Seeding asanas into Supabase...");

  for (const asana of ALL_ASANAS_CATALOG) {
    const { data, error } = await supabase.from("asanas").upsert({
      id: asana.id,
      slug: asana.slug,
      name: asana.name,
      sanskrit_name: asana.sanskritName,
      category: asana.category,
      difficulty: asana.difficulty,
      storage_path: asana.storagePath,
      image_url: asana.imageUrl,
      video_url: asana.videoUrl,
      description: asana.description,
      benefits: asana.benefits,
      instructions: asana.instructions,
      cues: asana.cues,
      rules: (asana as any).rules || ASANA_RULES_CATALOG[asana.id] || ASANA_RULES_CATALOG[asana.slug] || [],
      target_hold_seconds: asana.targetHoldSeconds,
      rule_ids: asana.ruleIds,
      is_premium: asana.isPremium,
      order_index: asana.orderIndex
    });

    if (error) {
      console.error(`Failed to insert ${asana.name}:`, error);
    } else {
      console.log(`Successfully inserted ${asana.name}`);
    }
  }

  console.log("Seeding complete!");
}

seed();
