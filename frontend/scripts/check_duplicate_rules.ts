import { ALL_ASANAS_CATALOG } from "../src/features/ai-coach/data/allAsanasCatalog.ts";
import { generateRulesForAsana } from "./generate_pose_rules.ts";

const seenRuleIds = new Set<string>();
const duplicates: string[] = [];

for (const asana of ALL_ASANAS_CATALOG) {
  const rules = generateRulesForAsana(asana);
  for (const r of rules) {
    if (seenRuleIds.has(r.id)) {
      duplicates.push(r.id);
    }
    seenRuleIds.add(r.id);
  }
}

console.log(`Unique Rule IDs: ${seenRuleIds.size}`);
console.log(`Duplicates: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log("Duplicate samples:", duplicates.slice(0, 10));
}
