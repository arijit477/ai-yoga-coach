import { createClient } from "@supabase/supabase-js";
import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog";
import { ASANA_RULES_CATALOG } from "../src/features/ai-coach/analysis/rules/poseRulesRegistry";
import dotenv from "dotenv";

// Load env vars
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://gelmugbsyhgcluqigrad.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || ""; // We might need a service role key for inserting, but if RLS allows anon insert or we disable it for seeding, this works.

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
