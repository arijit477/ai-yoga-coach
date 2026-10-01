import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { generateRulesForAsana } from "./generate_pose_rules.ts";
import { resolveCanonicalAsanaId } from "../src/features/ai-coach/analysis/AsanaCanonicalIdResolver.ts";

console.log("Auditing rule generation across 170 asanas...");

let totalRules = 0;
let totalCriticalRules = 0;
const canonicalCriticalMap: Record<string, string[]> = {};

for (const asana of ALL_ASANAS_CATALOG) {
  const rules = generateRulesForAsana(asana);
  totalRules += rules.length;
  
  const critical = rules.filter(r => r.severity === "high" || r.isSafety || (r.weight ?? 1) >= 3);
  totalCriticalRules += critical.length;

  const canonicalId = resolveCanonicalAsanaId(asana.id);
  if (!canonicalCriticalMap[canonicalId]) {
    canonicalCriticalMap[canonicalId] = critical.map(r => r.id);
  }
}

console.log(`Total Asanas: ${ALL_ASANAS_CATALOG.length}`);
console.log(`Generated Total Rules: ${totalRules}`);
console.log(`Generated Critical Rules: ${totalCriticalRules}`);
console.log(`Average Rules per Asana: ${(totalRules / ALL_ASANAS_CATALOG.length).toFixed(1)}`);
console.log(`Canonical Critical Map Size: ${Object.keys(canonicalCriticalMap).length}`);
