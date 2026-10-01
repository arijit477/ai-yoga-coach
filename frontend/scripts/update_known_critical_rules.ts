import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver.ts";
import * as fs from "fs";

// Existing foundational mappings
const existingKnown: Record<string, string[]> = {
  // Cobra Pose
  "bhujangasana": ["bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],
  "cobra": ["bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],
  "cobra-pose": ["bhujangasana.chest.lift", "bhujangasana.elbows.tuck"],

  // Bridge Pose
  "setu-bandhasana": ["bridge.hips.lift", "bridge.left_knee.angle"],
  "bridge": ["bridge.hips.lift", "bridge.left_knee.angle"],
  "bridge-pose": ["bridge.hips.lift", "bridge.left_knee.angle"],

  // Lotus Pose
  "padmasana": ["padmasana.spine.vertical", "padmasana.hips.level"],
  "lotus": ["padmasana.spine.vertical", "padmasana.hips.level"],
  "lotus-pose": ["padmasana.spine.vertical", "padmasana.hips.level"],

  // Warrior II
  "warrior-ii": ["warrior-ii-left-knee-angle"],
  "warrior_ii": ["warrior_ii.front_knee.angle"],

  // Mountain Pose
  "mountain-pose": ["mountain.spine.vertical", "mountain.shoulders.level"],
  "tadasana": ["mountain.spine.vertical", "mountain.shoulders.level"],

  // Tree Pose
  "tree-pose": ["tree.bent_knee.abduction", "tree.standing_leg.straight"],
  "vrksasana": ["tree.bent_knee.abduction", "tree.standing_leg.straight"],

  // Downward Dog
  "downward-dog": ["downward-dog.spine.extension", "downward-dog.hips.elevation"],
  "adho-mukha-svanasana": ["downward-dog.spine.extension", "downward-dog.hips.elevation"],

  // Child's Pose
  "balasana": ["balasana.hips.heels", "balasana.torso.fold"],
  "childs-pose": ["balasana.hips.heels", "balasana.torso.fold"],

  // Chaturanga
  "chaturanga-dandasana": ["chaturanga.elbows.90", "chaturanga.body.line"],
  "chaturanga": ["chaturanga.elbows.90", "chaturanga.body.line"],

  // Cow Pose / Bitilasana
  "bitilasana": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cow-bitilasana": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cow": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cow-pose": ["cow-bitilasana.body.symmetry", "cat-cow-shoulder-wrist"],

  // Cat Pose / Marjaryasana
  "marjaryasana": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cat-marjaryasana": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cat": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],
  "cat-pose": ["cat-marjaryasana.body.symmetry", "cat-cow-shoulder-wrist"],

  // Corpse Pose / Savasana
  "savasana": ["savasana-relaxation"],
  "corpse-savasana": ["savasana-relaxation"],
  "corpse-pose": ["savasana-relaxation"],

  // Plank / Phalakasana
  "plank": ["plank.body.line"],
  "phalakasana": ["plank.body.line"],
  "plank-phalakasana": ["plank.body.line"],

  // Triangle / Trikonasana
  "trikonasana": ["trikonasana.knee.straight"],
  "triangle-trikonasana": ["trikonasana.knee.straight"],
  "triangle": ["trikonasana.knee.straight"],

  // Warrior I
  "warrior-i": ["warrior-i-front-knee-angle"],
  "warrior-i-virabhadrasana-i": ["warrior-i-front-knee-angle"],

  // Seated Forward Bend / Paschimottanasana
  "paschimottanasana": ["paschimottanasana.spine.extension"],
  "seated-forward-bend-paschimottanasana": ["paschimottanasana.spine.extension"],

  // Boat Pose / Navasana
  "navasana": ["navasana.torso.vshape"],
  "boat-navasana": ["navasana.torso.vshape"],

  // Camel Pose / Ustrasana
  "ustrasana": ["ustrasana.chest.lift"],
  "camel-ustrasana": ["ustrasana.chest.lift"],

  // Locust Pose / Salabhasana
  "salabhasana": ["salabhasana.leg.lift"],
  "locust-salabhasana": ["salabhasana.leg.lift"],

  // Bow Pose / Dhanurasana
  "dhanurasana": ["dhanurasana.bow.arc"],
  "bow-dhanurasana": ["dhanurasana.bow.arc"],
};

const mergedMap: Record<string, string[]> = { ...existingKnown };

for (const asana of ALL_ASANAS_CATALOG) {
  const critical = asana.rules.filter(r => r.severity === "high" || r.isSafety || (r.weight ?? 1) >= 3);
  if (critical.length > 0) {
    const ids = critical.map(r => r.id);
    if (!mergedMap[asana.id]) {
      mergedMap[asana.id] = ids;
    }
    const canonicalId = resolveCanonicalAsanaId(asana.id);
    if (!mergedMap[canonicalId]) {
      mergedMap[canonicalId] = ids;
    }
  }
}

console.log(`Total merged critical rule entries: ${Object.keys(mergedMap).length}`);

const lines: string[] = [];
lines.push("export const KNOWN_CRITICAL_RULES: Record<string, string[]> = {");
for (const [key, rules] of Object.entries(mergedMap).sort((a, b) => a[0].localeCompare(b[0]))) {
  lines.push(`  "${key}": ${JSON.stringify(rules)},`);
}
lines.push("};");

const gatePath = "d:/Client-Projects/ClientProject/ArunReddy/Ai-Coach/ai-yoga-coach/frontend/src/features/ai-coach/analysis/AsanaCompletionGate.ts";
const gateContent = fs.readFileSync(gatePath, "utf-8");

const updatedGateContent = gateContent.replace(
  /export const KNOWN_CRITICAL_RULES: Record<string, string\[\]> = \{[\s\S]*?\};/,
  lines.join("\n")
);

fs.writeFileSync(gatePath, updatedGateContent, "utf-8");
console.log("Updated AsanaCompletionGate.ts with complete KNOWN_CRITICAL_RULES mapping.");
