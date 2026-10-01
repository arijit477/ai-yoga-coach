import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog";
import { KNOWN_CRITICAL_RULES } from "../src/features/ai-coach/analysis/AsanaCompletionGate";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver";

interface DiscriminationPair {
  selectedAsana: string;
  similarAsana: string;
  stanceDiff: boolean;
  distinguishingRules: string[];
  isDiscriminative: boolean;
}

const pairsToTest = [
  { selected: "cobra-bhujangasana", similar: "crocodile-makarasana", desc: "Cobra vs Flat Prone" },
  { selected: "cobra-bhujangasana", similar: "locust-salabhasana", desc: "Cobra vs Locust" },
  { selected: "tree-vrksasana", similar: "mountain-tadasana", desc: "Tree vs Tadasana" },
  { selected: "warrior-ii-virabhadrasana-ii", similar: "triangle-trikonasana", desc: "Warrior II vs Triangle" },
  { selected: "warrior-ii-virabhadrasana-ii", similar: "mountain-tadasana", desc: "Warrior II vs Tadasana" },
  { selected: "downward-facing-dog-adho-mukha-svanasana", similar: "plank-phalakasana", desc: "Downward Dog vs Plank" },
  { selected: "downward-facing-dog-adho-mukha-svanasana", similar: "cat-marjaryasana", desc: "Downward Dog vs Tabletop" },
  { selected: "boat-navasana", similar: "staff-dandasana", desc: "Boat vs Staff" },
  { selected: "bridge-setu-bandha-sarvangasana", similar: "corpse-savasana", desc: "Bridge vs Savasana" },
  { selected: "chair-utkatasana", similar: "mountain-tadasana", desc: "Chair vs Tadasana" },
  { selected: "crow-bakasana", similar: "plank-phalakasana", desc: "Crow vs Plank" },
  { selected: "standing-forward-bend-uttanasana", similar: "mountain-tadasana", desc: "Forward Fold vs Tadasana" },
];

const results: DiscriminationPair[] = [];

for (const pair of pairsToTest) {
  const sel = ALL_ASANAS_CATALOG.find((a) => a.id === pair.selected);
  const sim = ALL_ASANAS_CATALOG.find((a) => a.id === pair.similar);

  if (!sel || !sim) {
    console.error(`Could not find ${pair.selected} or ${pair.similar}`);
    continue;
  }

  const stanceDiff = sel.primaryStance !== sim.primaryStance;
  const selRules = sel.rules;
  const simRules = sim.rules;

  // Distinguishing features
  const distinguishing: string[] = [];
  if (stanceDiff) {
    distinguishing.push(`Stance differs: ${sel.primaryStance} vs ${sim.primaryStance}`);
  }

  for (const sr of selRules) {
    // Check if sim has a conflicting target for the same metric/points
    const matchingInSim = simRules.find((r) => 
      r.metric === sr.metric && 
      JSON.stringify(r.points) === JSON.stringify(sr.points)
    );
    if (matchingInSim) {
      if (sr.target !== undefined && matchingInSim.target !== undefined && Math.abs(sr.target - matchingInSim.target) > 20) {
        distinguishing.push(`${sr.name} target (${sr.target}°) differs from ${matchingInSim.name} (${matchingInSim.target}°)`);
      }
    } else {
      distinguishing.push(`Pose-specific rule: ${sr.name} (target: ${sr.target ?? 'N/A'})`);
    }
  }

  results.push({
    selectedAsana: sel.name,
    similarAsana: sim.name,
    stanceDiff,
    distinguishingRules: distinguishing,
    isDiscriminative: distinguishing.length > 0,
  });
}

console.log("=== POSE DISCRIMINATION RESULTS ===");
for (const r of results) {
  console.log(`\nPair: ${r.selectedAsana} vs ${r.similarAsana}`);
  console.log(`  Discriminative: ${r.isDiscriminative}`);
  console.log(`  Key Distinctions (${r.distinguishingRules.length}):`);
  for (const d of r.distinguishingRules.slice(0, 3)) {
    console.log(`    - ${d}`);
  }
}
